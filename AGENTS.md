# webAgency — Boilerplate d'agence web pour commerces de proximité

> Ce dépôt est **le socle commun** de tous les sites clients de l'agence.
> Il s'enrichit à chaque projet : tout composant générique créé chez un client
> doit revenir ici (voir la skill `recolter-composant`).

## Vision

- **Cible** : commerces traditionnels (salons, esthétique, restauration, artisans…),
  souvent sans culture technique, clientèle majoritairement sur mobile.
- **Promesse** : un site rapide, original et qui convertit (appel, WhatsApp, commande),
  livré vite grâce à un socle réutilisable et à l'IA.
- **Modèle** : un seul code à maintenir, des dizaines de clients, paramétrés par `client.json`.

## Les 3 niveaux du système

| Niveau | Où | Rôle |
|---|---|---|
| Règles | `.agents/rules/` | Conventions permanentes (code, design, perf, SEO, sécurité) |
| Boilerplate | `site/`, `api/`, `src/components/library/` | Code et composants réutilisables |
| Brief client | `client.json` (modèle : `client.example.json`) | Données et modules activés pour un client |

## Paliers d'offre (modules activables dans `client.json`)

| Palier | Modules | Backend requis |
|---|---|---|
| **1. Vitrine** | pages, prestations, contact, WhatsApp, appel | Non (GitHub Pages seul) |
| **2. Vitrine + admin** | + `admin`, `catalogue` éditable, `analytics` | Oui (API + Mongo + Clerk) |
| **3. E-commerce** | + `panier`, `checkout` (Wave / PayDunya), `commandes` | Oui |

Ne jamais embarquer un module non activé dans le build d'un client.

## Architecture (résumé — détails dans `01-architecture.md`)

- `site/` : Astro en **sortie statique** → **GitHub Pages**.
- `api/` : API **Hono** serverless (Vercel par défaut) → MongoDB Atlas, Clerk, Cloudinary, paiements.
- Contenu SEO généré **au build** ; données fraîches (stock, commandes) chargées **au runtime**.
- L'admin peut déclencher un **rebuild** du site (GitHub `repository_dispatch`).

## Index des règles

| Fichier | Déclenchement | Sujet |
|---|---|---|
| `01-architecture.md` | toujours | Stack, hébergement mixte, variables d'environnement, arborescence |
| `02-conventions-code.md` | toujours | SCSS, sprites, localStorage, politique des librairies, support navigateurs |
| `03-design-ux.md` | sur décision | Header, footer, boutons fixes, transitions, motifs, compaction |
| `04-performance-chargement.md` | sur décision | Budget chiffré, skeletons et spinners |
| `05-seo-semantique.md` | sur décision | HTML5, données structurées, pattern lien-modale |
| `06-roles-securite.md` | sur décision | Clerk, rôles, simulateur de rôle |
| `07-ecommerce-paiement.md` | sur décision | Panier, Wave, PayDunya, commande WhatsApp |
| `08-donnees-seed.md` | sur décision | Modèle de données, seeding |
| `09-analytics.md` | sur décision | Plausible auto-hébergé |
| `10-bibliotheque-composants.md` | toujours | Collection de composants du boilerplate |
| `99-definition-of-done.md` | toujours | Critères de « terminé » |

## Skills

- `bem-scss-generator` : génère ou modifie des composants SCSS selon le pattern BEM avancé (LegionUI : 5 sections, modificateurs autonomes, variable `--template` Emmet).
- `legionui-component-extractor` : extrait n'importe quel composant HTML/web (ex: `code.snippet`) vers l'architecture modulaire pure BEM de LegionUI.
- `nouveau-client` : de l'interview au site déployé.
- `recolter-composant` : rapatrier un composant d'un projet client vers ce boilerplate.

## Priorité en cas de conflit

1. Sécurité  2. Accessibilité  3. Performance (budget chiffré)  4. Conversion  5. Originalité visuelle
