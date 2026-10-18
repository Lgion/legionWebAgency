---
trigger: model_decision
description: "À appliquer pour l'authentification, les rôles, l'admin, le simulateur de rôle et toute route API protégée"
---

# Rôles & sécurité

## Rôles

- Minimum : `public` (visiteur, non connecté) et `admin`. Optionnel : `editor` (catalogue sans paramètres ni commandes).
- Rôle stocké dans Clerk : `publicMetadata.role`.
- L'**API est la seule autorité** : chaque route protégée vérifie le JWT Clerk (`@clerk/backend`) puis le rôle. Le masquage côté front n'est que du confort.

## Simulateur de rôle

Permet de montrer l'admin à un prospect sans lui créer de compte.

**Activation par deux variables, toutes deux nécessaires :**

| Variable | Où | Effet |
|---|---|---|
| `PUBLIC_ROLE_SIMULATOR=true` | `site/` (au build) | Affiche le sélecteur de rôle (bouton fixe en bas à gauche) |
| `ROLE_SIMULATOR=true` | `api/` | L'API accepte l'en-tête `X-Simulated-Role` |

**Fonctionnement :**

- Le rôle choisi est stocké dans `storage.sim.role` et envoyé dans l'en-tête `X-Simulated-Role`.
- Si `ROLE_SIMULATOR` n'est pas `true`, l'API **ignore** l'en-tête.
- En rôle simulé, l'API sert les données de démonstration (base `MONGODB_DB` préfixée par `demo_`, ex. `demo_<slugClient>`, alimentée par le seed). Les écritures modifient uniquement cette base, jamais les données réelles du client.
- Bandeau permanent « Mode simulation : rôle X » + bouton de sortie.
- Par défaut, les deux variables valent `false` en production client.

## Règles générales

- Aucun secret dans `site/` ni dans le dépôt ; `.env.example` sans valeurs réelles.
- CORS restreint, rate limiting sur les routes publiques d'écriture (commande, contact).
- Webhooks (Wave, PayDunya, Clerk) : **signature vérifiée** avant tout traitement, traitement idempotent.
- Upload Cloudinary : signature générée par l'API, types et tailles limités.
- Entrées validées avec Zod, sorties échappées.
- Pages légales (mentions légales, confidentialité) conformes au pays du client.
