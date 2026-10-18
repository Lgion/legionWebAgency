import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';
import servicesRouter from './routes/services.js';
import contactRouter from './routes/contact.js';
import ordersRouter from './routes/orders.js';
import webhooksRouter from './routes/webhooks.js';
import { AuthContextVariables } from './middleware/auth.js';

dotenv.config();

const app = new Hono<{ Variables: AuthContextVariables }>();

// Configuration CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:4321').split(',');

app.use('*', cors({
  origin: (origin) => {
    if (!origin || allowedOrigins.includes(origin) || process.env.NODE_ENV !== 'production') {
      return origin || '*';
    }
    return allowedOrigins[0];
  },
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization', 'X-Simulated-Role'],
}));

// Route de santé (Health Check)
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development',
  });
});

// Middleware global pour le simulateur de rôles
app.use('*', async (c, next) => {
  const simulatedRole = c.req.header('X-Simulated-Role');
  const simulatorEnabled = process.env.ROLE_SIMULATOR === 'true';

  if (simulatedRole && simulatorEnabled) {
    c.set('role', simulatedRole);
    c.set('isSimulation', true);
  }
  await next();
});

// Montage des routeurs modulaires
app.route('/api/services', servicesRouter);
app.route('/api/contact', contactRouter);
app.route('/api/orders', ordersRouter);
app.route('/api/webhooks', webhooksRouter);

// Informations de l'API
app.get('/api/info', (c) => {
  const isSimulation = c.get('isSimulation') || false;
  return c.json({
    message: 'API WebAgency opérationnelle',
    clientDb: isSimulation
      ? `demo_${process.env.MONGODB_DB || 'default'}`
      : (process.env.MONGODB_DB || 'default'),
    simulation: isSimulation,
  });
});

const port = Number(process.env.PORT) || 3000;
console.log(`🚀 API Hono démarrée sur le port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
