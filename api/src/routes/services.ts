import { Hono } from 'hono';
import { getDb, ServiceDoc } from '../lib/db.js';
import { ServiceSchema } from '../lib/schemas.js';
import { requireAdmin, AuthContextVariables } from '../middleware/auth.js';

const router = new Hono<{ Variables: AuthContextVariables }>();

// Lecture publique des prestations en temps réel
router.get('/', async (c) => {
  const isSimulation = c.get('isSimulation') || false;
  try {
    const db = await getDb(isSimulation);
    const services = await db.collection<ServiceDoc>('services').find({}).toArray();
    return c.json({ data: services });
  } catch (err) {
    console.error('[Services] Erreur de récupération :', err);
    return c.json({ error: 'Impossible de récupérer les prestations' }, 500);
  }
});

// Récupération d'une prestation par son slug
router.get('/:slug', async (c) => {
  const isSimulation = c.get('isSimulation') || false;
  const slug = c.req.param('slug');
  try {
    const db = await getDb(isSimulation);
    const service = await db.collection<ServiceDoc>('services').findOne({ slug });
    if (!service) {
      return c.json({ error: 'Prestation introuvable' }, 404);
    }
    return c.json({ data: service });
  } catch (err) {
    return c.json({ error: 'Erreur lors de la recherche de la prestation' }, 500);
  }
});

// Création / modification d'une prestation (Admin uniquement)
router.post('/', requireAdmin, async (c) => {
  const isSimulation = c.get('isSimulation') || false;
  try {
    const body = await c.req.json();
    const validated = ServiceSchema.parse(body);
    const db = await getDb(isSimulation);

    await db.collection<ServiceDoc>('services').updateOne(
      { slug: validated.slug },
      {
        $set: {
          ...validated,
          updatedAt: new Date()
        }
      },
      { upsert: true }
    );

    return c.json({
      success: true,
      message: 'Prestation sauvegardée avec succès',
      data: validated
    });
  } catch (err: any) {
    if (err.errors) {
      return c.json({ error: 'Données invalides', details: err.errors }, 400);
    }
    return c.json({ error: 'Erreur interne de sauvegarde' }, 500);
  }
});

export default router;
