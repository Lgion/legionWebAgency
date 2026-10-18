import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

dotenv.config();

type AppVariables = {
  role?: string;
  isSimulation?: boolean;
};

const app = new Hono<{ Variables: AppVariables }>();

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

// Route de santé
app.get('/health', (c) => {
  return c.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV || 'development'
  });
});

// Middleware simulateur de rôles (vérification d'en-tête X-Simulated-Role)
app.use('*', async (c, next) => {
  const simulatedRole = c.req.header('X-Simulated-Role');
  const simulatorEnabled = process.env.ROLE_SIMULATOR === 'true';

  if (simulatedRole && simulatorEnabled) {
    c.set('role', simulatedRole);
    c.set('isSimulation', true);
  }
  await next();
});

// Routes API de base (stubs fonctionnels pour démarrage)
app.get('/api/info', (c) => {
  return c.json({
    message: 'API WebAgency active',
    clientDb: c.get('isSimulation')
      ? `demo_${process.env.MONGODB_DB || 'default'}`
      : (process.env.MONGODB_DB || 'default'),
    simulation: c.get('isSimulation') || false
  });
});

const port = Number(process.env.PORT) || 3000;
console.log(`🚀 API Hono démarrée sur le port ${port}`);

serve({
  fetch: app.fetch,
  port
});

export default app;
