# 🚀 WebAgency Boilerplate

> **Le boilerplate d'agence web nouvelle génération pour commerces traditionnels (salons de coiffure, instituts de beauté, restauration, artisans).**  
> Déploiement d'un site sur mesure, ultra-rapide et optimisé pour mobile en **moins de 30 minutes** à partir d'un brief client.

---

## 🌟 Points Forts & Architecture

* ⚡ **Frontend Statique (0 € d'hébergement)** : **Astro 5** en sortie statique pure déployé automatiquement sur **GitHub Pages**. Zéro frais de serveur pour la vitrine.
* 🛡️ **Micro-API Sécurisée** : **Hono** (Node / Vercel Serverless) avec Zod, Clerk (authentification JWT) et Cloudinary.
* 🔄 **Fraîcheur des données hybride** :
  - **Runtime API** : Les modifications faites par le commerçant (prix, prestations, stocks) sont visibles instantanément par les visiteurs via l'API.
  - **Rebuild statique automatique** : Un webhook GitHub (`repository_dispatch`) régénère le HTML statique pour l'indexation SEO par Googlebot.
* 🎨 **Design System SCSS BEM LegionUI Strict** :
  - 5 sections SCSS normalisées (*Function, Variables, Placeholder avec Emmet `--template`, Mixin dynamique, Mapping sémantique natif*).
  - Markup 100% sémantique : aucune classe utilitaire ou bootstrap dans le HTML.
  - Arrière-plans gérés via `--bg-image` sur `::before`.
* 🎭 **Simulateur de Rôle Transparent** :
  - Testez les rôles `public` et `admin` en un clic via `PUBLIC_ROLE_SIMULATOR`.
  - En mode simulation, l'API bascule automatiquement sur la base MongoDB isolée `demo_<slug>`. Les données réelles du client restent intactes.
* 💳 **Tunnels de Paiement Locaux & E-commerce** :
  - **Wave Money** : QR code sur desktop, ouverture directe de l'application sur mobile.
  - **PayDunya** : Orange Money, MTN, Moov, Carte bancaire.
  - **Commande WhatsApp** & **Paiement à la livraison**.
  - Validation cryptographique stricte par webhook HMAC.
* 📊 **Analytics Respectueux & Événements Clés** :
  - Instance **Plausible** mutualisée (RGPD / sans cookies).
  - Suivi des conversions : appels, clics WhatsApp, itinéraires, ajouts au panier et commandes.

---

## 📂 Structure du Monorepo

```text
webAgency/
├── .github/
│   └── workflows/
│       └── deploy.yml          # Déploiement automatique Astro -> GitHub Pages
├── site/                       # Frontend Astro 5
│   ├── src/
│   │   ├── components/
│   │   │   └── library/        # Bibliothèque de composants BEM LegionUI
│   │   │       ├── contenu/    # Accordion, ServiceCard (Pattern Lien-Modale)
│   │   │       ├── feedback/   # Spinner (<progress> sémantique), Skeleton
│   │   │       ├── layout/     # Header (sticky blur), Footer (horaires temps réel)
│   │   │       ├── conversion/ # FabContact (speed dial), FabTools (simulateur)
│   │   │       └── commerce/   # CartDrawer (tunnel 3 étapes)
│   │   ├── data/
│   │   │   └── client.json     # Configuration unique du commerce client
│   │   ├── layouts/
│   │   │   └── Layout.astro    # Base SEO, Open Graph, Schema.org LocalBusiness
│   │   ├── lib/
│   │   │   ├── client.ts       # Typage et chargeur client
│   │   │   └── storage.ts      # Gestionnaire clé unique <slug>:app versionné
│   │   ├── pages/
│   │   │   ├── index.astro     # Page d'accueil vitrine & e-commerce
│   │   │   ├── admin.astro     # Dashboard commerçant à tiroir latéral
│   │   │   ├── catalogue.astro # Showcase visuel de tous les composants
│   │   │   ├── commande.astro  # Confirmation & célébration (canvas-confetti)
│   │   │   └── prestations/
│   │   │       └── [slug].astro # Détails SEO prérendus (Lien-Modale)
│   │   └── styles/             # Abstracts SCSS (tokens, mixins, breakpoints)
├── api/                        # Micro-API Hono Serverless
│   ├── scripts/
│   │   └── seed.ts             # Synchronisation MongoDB Atlas (prod & demo)
│   └── src/
│       ├── lib/                # db.ts (MongoDB routing), schemas.ts (Zod)
│       ├── middleware/         # auth.ts (Clerk JWT + simulateur de rôles)
│       └── routes/             # services, contact, orders, webhooks
├── scripts/
│   └── init-client.ts          # CLI d'onboarding nouveau client en 30 secondes
├── client.example.json         # Schéma de référence pour les briefs clients
└── package.json                # Workspaces npm root
```

---

## ⚡ Démarrage Rapide

### 1. Installation des dépendances

```bash
npm install
```

### 2. Initialiser un nouveau client

Exécutez le script CLI avec l'identifiant (slug) du commerce :

```bash
npm run init:client mon-beau-salon
```

Cela génère automatiquement :
- `site/src/data/client.json` configuré avec le nom, la clé localStorage `mon-beau-salon:app` et la base démo `demo_mon-beau-salon`.
- Les variables d'environnement dans `site/.env`.

### 3. Synchroniser la base MongoDB de démonstration

```bash
npm run seed:demo
```

### 4. Lancer l'environnement de développement

```bash
# Démarre le frontend Astro (http://localhost:4321)
npm run dev

# Ou démarre le frontend et l'API Hono en parallèle :
npm run dev:site  # Terminal 1 (Port 4321)
npm run dev:api   # Terminal 2 (Port 3000)
```

### 5. Compiler pour la production

```bash
npm run build
```

---

## 🎨 Les 3 Paliers Commerciaux (Tiers)

Le fichier `client.json` configure le niveau d'abonnement du commerçant :

| Palier | Nom | Fonctionnalités incluses | Coût infrastructure |
|:---:|---|---|:---:|
| **Tier 1** | **Vitrine Pro** | Site statique complet, SEO local, Schema.org, WhatsApp speed dial, horaires temps réel, GitHub Pages | **0 € / mois** |
| **Tier 2** | **Vitrine + Admin** | Tier 1 + Dashboard commerçant (`/admin`), modification runtime des prestations, statistiques Plausible | **< 5 € / mois** |
| **Tier 3** | **E-commerce & Drive** | Tier 2 + Panier interactif (`CartDrawer`), paiements Wave QR & PayDunya, gestion des commandes | **Variable / transac.** |

---

## 🧪 Outils de Recette & Showcase

- **Showcase Composants** : Accédez à `/catalogue` pour tester visuellement tous les composants du design system, les variantes d'accordéons, skeletons et le panier.
- **Simulateur de Rôles** : Cliquez sur la roue crantée en bas à gauche (`FabTools`) pour basculer instantanément entre le profil **Public** et le profil **Admin**.
- **Admin Commerçant** : Rendez-vous sur `/admin` pour gérer les prestations, visualiser les commandes et consulter les statistiques.

---

## 📜 Licences et Standards

- Développé selon la méthodologie **LegionUI BEM SCSS**.
- Conforme aux standards d'accessibilité **WCAG 2.2 AA**.
- Score de performance **Lighthouse Mobile ≥ 90**.
