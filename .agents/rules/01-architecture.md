---
trigger: always_on
description: "Architecture mixte GitHub Pages + backend serverless, stack, variables d'environnement et arborescence du boilerplate"
---

# Architecture

## Principe : hébergement mixte

- **Front (`site/`)** : Astro `output: 'static'`, déployé sur **GitHub Pages** via GitHub Actions.
  - Aucune route serveur dans `site/` : tout est prérendu (`getStaticPaths` pour les pages dynamiques).
  - Gérer `site` et `base` dans `astro.config.mjs` (domaine personnalisé via `public/CNAME`).
  - Fournir une `404.html` (GitHub Pages n'a pas de réécriture d'URL).
- **Back (`api/`)** : API **Hono** (légère, portable Node / Vercel / Cloudflare), déployée sur **Vercel (runtime Node)** par défaut.
  - Seul point d'accès à MongoDB, aux clés secrètes, aux webhooks de paiement et à Cloudinary signé.
  - CORS strict : uniquement les origines listées dans `ALLOWED_ORIGINS`.
  - Validation de toutes les entrées avec **Zod**.

## Stack

| Besoin | Choix | Notes |
|---|---|---|
| Framework | Astro (îlots) | JS uniquement là où il y a de l'interaction |
| Styles | SCSS + CSS moderne | Voir `02-conventions-code.md` |
| Auth | Clerk | Côté client dans `site/`, JWT vérifié dans `api/` avec `@clerk/backend` |
| Base de données | MongoDB Atlas (M0 gratuit au départ) | Driver officiel dans `api/` uniquement. La Data API HTTP d'Atlas est arrêtée depuis le 30/09/2025 : ne jamais l'utiliser |
| Images | Cloudinary | URLs avec `f_auto,q_auto,w_…` ; upload admin par signature générée par l'API |
| Paiement | Wave Checkout, PayDunya | Voir `07-ecommerce-paiement.md` |
| Analytics | Plausible CE auto-hébergé | Voir `09-analytics.md` |

Toujours vérifier la documentation **actuelle** d'un service (Clerk, Wave, PayDunya, Astro) avant d'écrire l'intégration : ces APIs évoluent.

## Fraîcheur des données & synchronisation

- **Temps réel au runtime (Recommandé pour l'utilisateur)** :
  - Les données éditées par le commerçant dans l'admin sont stockées dans MongoDB.
  - Le frontend interroge l'API Hono (`/api/services`, `/api/hours`…) avec un cache léger (SWR) et des skeletons/spinners.
  - **Résultat** : la modification d'un prix ou d'un horaire est **immédiatement visible** pour les visiteurs sans attendre le moindre déploiement.
- **Rebuild statique GitHub (Différé / SEO pur)** :
  - Un rebuild GitHub Pages (`repository_dispatch`) n'est déclenché que pour mettre à jour le HTML statique brut indexé par Googlebot (ou manuellement via un bouton « Publier le site » dans l'admin).
  - Cela évite de saturer les minutes de build GitHub à chaque correction de frappe du commerçant tout en garantissant un SEO parfait.

## Variables d'environnement

Fournir `site/.env.example` et `api/.env.example` à jour. Ne jamais committer de `.env`.

**`site/`** (publiques, injectées au build par les *Variables* GitHub Actions) :

| Variable | Rôle |
|---|---|
| `PUBLIC_API_URL` | URL de l'API |
| `PUBLIC_CLERK_PUBLISHABLE_KEY` | Clé publique Clerk |
| `PUBLIC_CLOUDINARY_CLOUD_NAME` | Nom du cloud Cloudinary |
| `PUBLIC_PLAUSIBLE_DOMAIN` / `PUBLIC_PLAUSIBLE_HOST` | Site suivi / instance Plausible |
| `PUBLIC_ROLE_SIMULATOR` | `true` pour afficher le simulateur de rôle (voir `06-roles-securite.md`) |

**`api/`** (secrètes) :

| Variable | Rôle |
|---|---|
| `MONGODB_URI`, `MONGODB_DB` | Connexion base |
| `CLERK_SECRET_KEY` | Vérification des sessions |
| `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` | Upload signé |
| `WAVE_API_KEY`, `WAVE_WEBHOOK_SECRET` | Paiement Wave |
| `PAYDUNYA_MASTER_KEY`, `PAYDUNYA_PRIVATE_KEY`, `PAYDUNYA_TOKEN`, `PAYDUNYA_MODE` | Paiement PayDunya (`test` / `live`) |
| `PLAUSIBLE_API_KEY` | Stats API (proxy pour l'admin) |
| `GITHUB_DISPATCH_TOKEN`, `GITHUB_REPO` | Déclenchement du rebuild |
| `ROLE_SIMULATOR` | `true` pour que l'API accepte les rôles simulés |
| `ALLOWED_ORIGINS` | Liste CORS |

## Arborescence cible (monorepo npm workspaces)

```
webAgency/
├── AGENTS.md
├── client.example.json
├── .agents/{rules,skills}/
├── .github/workflows/deploy-site.yml
├── site/
│   ├── astro.config.mjs
│   ├── public/            # CNAME, sprites, favicons
│   └── src/
│       ├── components/library/<catégorie>/<Composant>/
│       ├── layouts/
│       ├── pages/         # index, prestations/[id], boutique/, panier/, admin/, _catalogue/
│       ├── lib/           # storage.ts, api.ts, roles.ts, client.ts
│       ├── styles/        # abstracts/ (tokens, mixins), base/, sprites/
│       └── data/client.json
└── api/
    ├── src/{routes,middleware,lib}/
    └── scripts/seed.ts
```
