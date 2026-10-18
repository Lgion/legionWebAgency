import { createMiddleware } from 'hono/factory';
import { verifyToken } from '@clerk/backend';

export interface AuthContextVariables {
  role?: string;
  isSimulation?: boolean;
  userId?: string;
}

/**
 * Middleware vérifiant les permissions administratives.
 * Supporte le simulateur de rôle si ROLE_SIMULATOR=true.
 */
export const requireAdmin = createMiddleware<{ Variables: AuthContextVariables }>(
  async (c, next) => {
    // 1. Détection du simulateur de rôle
    const simulatedRole = c.req.header('X-Simulated-Role');
    const simulatorAllowed = process.env.ROLE_SIMULATOR === 'true';

    if (simulatorAllowed && simulatedRole) {
      if (simulatedRole === 'admin') {
        c.set('role', 'admin');
        c.set('isSimulation', true);
        return await next();
      } else {
        return c.json({ error: 'Accès refusé : rôle simulé non autorisé' }, 403);
      }
    }

    // 2. Vérification du JWT Clerk officiel
    const authHeader = c.req.header('Authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return c.json({ error: 'Non authentifié : jeton Bearer manquant' }, 401);
    }

    const token = authHeader.replace('Bearer ', '');
    const secretKey = process.env.CLERK_SECRET_KEY;

    if (!secretKey) {
      console.error('[Auth] CLERK_SECRET_KEY non configurée sur le serveur');
      return c.json({ error: 'Configuration serveur incomplète' }, 500);
    }

    try {
      const verifiedToken = await verifyToken(token, {
        secretKey,
      });

      const role = (verifiedToken as any)?.metadata?.role || (verifiedToken as any)?.publicMetadata?.role;

      if (role !== 'admin') {
        return c.json({ error: 'Accès interdit : privilèges administrateur requis' }, 403);
      }

      c.set('userId', verifiedToken.sub);
      c.set('role', 'admin');
      c.set('isSimulation', false);

      await next();
    } catch (err) {
      console.warn('[Auth] Jeton Clerk invalide ou expiré :', err);
      return c.json({ error: 'Session invalide ou expirée' }, 401);
    }
  }
);
