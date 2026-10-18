import { Hono } from 'hono';
import crypto from 'crypto';
import { getDb, OrderDoc } from '../lib/db.js';

const router = new Hono();

// Webhook Wave Checkout
router.post('/wave', async (c) => {
  const secret = process.env.WAVE_WEBHOOK_SECRET;
  const signature = c.req.header('Wave-Signature');
  const rawBody = await c.req.text();

  // 1. Vérification cryptographique de la signature Wave si configurée
  if (secret && signature && !secret.includes('test_...')) {
    const computed = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
    if (computed !== signature) {
      console.warn('[Wave Webhook] Signature invalide');
      return c.json({ error: 'Signature invalide' }, 401);
    }
  }

  try {
    const event = JSON.parse(rawBody);
    const orderId = event.data?.client_reference;
    const checkoutStatus = event.data?.checkout_status;

    if (orderId && (checkoutStatus === 'complete' || event.type === 'checkout.session.completed')) {
      const db = await getDb(false);
      await db.collection<OrderDoc>('orders').updateOne(
        { orderId },
        {
          $set: {
            'payment.status': 'paid',
            'payment.paidAt': new Date(),
            'payment.reference': event.id || event.data?.id,
            updatedAt: new Date(),
          }
        }
      );
      console.log(`[Wave Webhook] Commande ${orderId} marquée comme PAYÉE`);
    }

    return c.json({ received: true });
  } catch (err) {
    console.error('[Wave Webhook] Erreur de traitement :', err);
    return c.json({ error: 'Erreur webhook interne' }, 500);
  }
});

// Webhook PayDunya IPN
router.post('/paydunya', async (c) => {
  const masterKey = process.env.PAYDUNYA_MASTER_KEY;
  try {
    const body = await c.req.json();
    const token = body.data?.invoice?.token || body['data[invoice][token]'];
    const orderId = body.data?.custom_data?.order_id || body['data[custom_data][order_id]'];
    const status = body.data?.status || body['data[status]'];

    if (orderId && status === 'completed') {
      const db = await getDb(false);
      await db.collection<OrderDoc>('orders').updateOne(
        { orderId },
        {
          $set: {
            'payment.status': 'paid',
            'payment.paidAt': new Date(),
            'payment.reference': token,
            updatedAt: new Date(),
          }
        }
      );
      console.log(`[PayDunya Webhook] Commande ${orderId} marquée comme PAYÉE`);
    }

    return c.text('OK');
  } catch (err) {
    console.error('[PayDunya Webhook] Erreur traitement IPN :', err);
    return c.json({ error: 'Erreur webhook interne' }, 500);
  }
});

export default router;
