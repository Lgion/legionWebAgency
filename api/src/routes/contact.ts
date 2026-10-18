import { Hono } from 'hono';
import { getDb, ContactDoc } from '../lib/db.js';
import { ContactMessageSchema } from '../lib/schemas.js';
import { AuthContextVariables } from '../middleware/auth.js';

const router = new Hono<{ Variables: AuthContextVariables }>();

router.post('/', async (c) => {
  const isSimulation = c.get('isSimulation') || false;
  try {
    const body = await c.req.json();
    const validated = ContactMessageSchema.parse(body);
    const db = await getDb(isSimulation);

    const doc: ContactDoc = {
      ...validated,
      createdAt: new Date(),
    };

    await db.collection('messages').insertOne(doc);

    return c.json({
      success: true,
      message: 'Message transmis avec succès',
    });
  } catch (err: any) {
    if (err.errors) {
      return c.json({ error: 'Données de formulaire invalides', details: err.errors }, 400);
    }
    return c.json({ error: 'Erreur lors de l\'enregistrement du message' }, 500);
  }
});

export default router;
