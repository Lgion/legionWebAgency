import { Hono } from 'hono';
import crypto from 'crypto';
import { getDb, OrderDoc, ServiceDoc, ProductDoc } from '../lib/db.js';
import { CreateOrderSchema } from '../lib/schemas.js';
import { requireAdmin, AuthContextVariables } from '../middleware/auth.js';

const router = new Hono<{ Variables: AuthContextVariables }>();

// Création d'une commande et génération de la session de paiement
router.post('/', async (c) => {
  const isSimulation = c.get('isSimulation') || false;

  try {
    const body = await c.req.json();
    const validated = CreateOrderSchema.parse(body);
    const db = await getDb(isSimulation);

    // 1. Recalcul côté serveur des prix réels depuis la base de données
    const orderItems: Array<{
      slug: string;
      name: string;
      price: number;
      quantity: number;
    }> = [];

    let totalAmount = 0;

    for (const item of validated.items) {
      // Recherche dans les produits d'abord, puis dans les prestations
      let product = await db.collection<ProductDoc>('products').findOne({ slug: item.slug });
      let service = !product ? await db.collection<ServiceDoc>('services').findOne({ slug: item.slug }) : null;

      const matched = product || service;
      if (!matched) {
        return c.json({ error: `Article introuvable dans le catalogue : ${item.slug}` }, 400);
      }

      const itemPrice = Math.round(matched.price);
      const subtotal = itemPrice * item.quantity;
      totalAmount += subtotal;

      orderItems.push({
        slug: matched.slug,
        name: matched.name,
        price: itemPrice,
        quantity: item.quantity,
      });
    }

    const orderId = `CMD-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;

    const orderDoc: OrderDoc = {
      orderId,
      items: orderItems,
      totalAmount,
      currency: 'XOF',
      customer: validated.customer,
      delivery: validated.delivery,
      payment: {
        method: validated.paymentMethod,
        status: 'pending',
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // 2. Traitement selon la méthode de paiement
    let paymentPayload: any = {
      orderId,
      totalAmount,
      currency: 'XOF',
      method: validated.paymentMethod,
    };

    if (validated.paymentMethod === 'wave') {
      const waveApiKey = process.env.WAVE_API_KEY;
      if (waveApiKey && !waveApiKey.includes('test_...')) {
        try {
          // Appel API officiel Wave Checkout
          const waveRes = await fetch('https://api.wave.com/v1/checkout/sessions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${waveApiKey}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: totalAmount.toString(),
              currency: 'XOF',
              client_reference: orderId,
              success_url: `${process.env.ALLOWED_ORIGINS?.split(',')[0] || ''}/commande?id=${orderId}&status=success`,
              error_url: `${process.env.ALLOWED_ORIGINS?.split(',')[0] || ''}/commande?id=${orderId}&status=error`,
            }),
          });
          const waveData = await waveRes.json();
          paymentPayload.waveLaunchUrl = waveData.wave_launch_url;
        } catch (err) {
          console.warn('[Wave] Erreur appel API Wave, bascule sur simulation :', err);
          paymentPayload.waveLaunchUrl = `https://wave.com/checkout/mock/${orderId}`;
        }
      } else {
        // Mode développement / test
        paymentPayload.waveLaunchUrl = `https://wave.com/checkout/mock/${orderId}`;
      }
    } else if (validated.paymentMethod === 'whatsapp') {
      const itemsList = orderItems.map(i => `• ${i.name} (x${i.quantity}) : ${i.price * i.quantity} XOF`).join('\n');
      const waText = encodeURIComponent(
        `Bonjour, je valide ma commande #${orderId} :\n\n${itemsList}\n\n*Total : ${totalAmount} XOF*\nClient : ${validated.customer.name} (${validated.customer.phone})`
      );
      paymentPayload.whatsappUrl = `https://wa.me/?text=${waText}`;
    }

    // Sauvegarde en base de données
    await db.collection('orders').insertOne(orderDoc);

    return c.json({
      success: true,
      data: paymentPayload,
    });
  } catch (err: any) {
    if (err.errors) {
      return c.json({ error: 'Commande invalide', details: err.errors }, 400);
    }
    console.error('[Orders] Erreur de création de commande :', err);
    return c.json({ error: 'Impossible d\'enregistrer la commande' }, 500);
  }
});

// Consultation du statut d'une commande (utilisé par le polling du frontend)
router.get('/:orderId/status', async (c) => {
  const isSimulation = c.get('isSimulation') || false;
  const orderId = c.req.param('orderId');

  try {
    const db = await getDb(isSimulation);
    const order = await db.collection<OrderDoc>('orders').findOne({ orderId });

    if (!order) {
      return c.json({ error: 'Commande non trouvée' }, 404);
    }

    return c.json({
      orderId: order.orderId,
      status: order.payment.status,
      totalAmount: order.totalAmount,
      currency: order.currency,
      paidAt: order.payment.paidAt,
    });
  } catch (err) {
    return c.json({ error: 'Erreur lors de la vérification du statut' }, 500);
  }
});

// Liste des commandes (Admin uniquement)
router.get('/', requireAdmin, async (c) => {
  const isSimulation = c.get('isSimulation') || false;

  try {
    const db = await getDb(isSimulation);
    const orders = await db.collection<OrderDoc>('orders').find({}).sort({ createdAt: -1 }).toArray();
    return c.json({ data: orders });
  } catch (err) {
    return c.json({ error: 'Impossible de lister les commandes' }, 500);
  }
});

export default router;
