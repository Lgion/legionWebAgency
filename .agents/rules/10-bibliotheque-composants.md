---
trigger: always_on
description: "Organisation et enrichissement continu de la bibliothèque de composants du boilerplate"
---

# Bibliothèque de composants

Le boilerplate est d'abord une **collection de composants** qui grandit à chaque projet.

## Emplacement et structure (Standard LegionUI)

Chaque composant s'appuie sur l'architecture modulaire de **LegionUI** (modèle de référence dans `Accordion/` et https://github.com/Lgion/Legion_UI) :

```
site/src/components/library/
├── CATALOGUE.md                  # index : nom, catégorie, statut, modificateurs disponibles
└── <catégorie>/<NomComposant>/
    ├── index.astro (ou .jsx)     # Contrôleur agnostique sans classes utilitaires
    ├── index.scss                # Routeur BEM associant &.--modifier aux mixins
    ├── scss/
    │   ├── _default.scss         # Mixin BEM de base (5 sections strictes)
    │   └── _[modifierName].scss  # Mixin d'une déclinaison esthétique (ex. _chrome.scss)
    ├── js/                       # Liaisons JS vers les helpers sémantiques (default.js, chrome.js)
    └── README.md                 # Documentation, props, Emmet attendu, variantes
```

### Les 2 Patterns de Données LegionUI
1. **Pattern 1 Multi-Items (ex. Accordion, Cards, Timeline)** :
   - Traite une liste répétitive (`items: [ { ... } ]`).
   - Rendu via itération d'items (`.monComposant__item`).
2. **Pattern 2 Instance Unique (ex. Hero, Banner, Footer)** :
   - Traite un objet plat unique (`item: { title: "...", ... }`).
   - Rendu direct sur la balise sémantique (`<section class="monComposant">`), sans wrapper oignon. Arrière-plan géré par `--bg-image` sur `::before`.

### Enrichissement plutôt que duplication (Cas A vs Cas B)
- **Si le concept existe déjà** (ex. `Accordion`, `Cards`) : **NE PAS créer de doublon**. Ajouter un nouveau modificateur `&.--[nouveauStyle]` avec son fichier `scss/_[nouveauStyle].scss` et sa liaison JS.
- **Si le composant est nouveau** : créer le dossier complet avec au moins `--default` et un modificateur spécifique. Utiliser la skill `legionui-component-extractor`.

## Catégories

| Catégorie | Exemples |
|---|---|
| `layout` | Header, Footer, AdminDrawer, Section |
| `navigation` | Menu, Breadcrumb, Tabs |
| `contenu` | ServiceCard, PriceTable, Gallery, Testimonials, Hours |
| `conversion` | FabContact, FabTools, WhatsAppButton, CallButton |
| `commerce` | Cart, CheckoutSteps, WavePayment, PaydunyaPayment |
| `feedback` | Spinner, Skeleton, Toast, ErrorState |
| `transitions` | SectionDivider, Parallax, Pattern |
| `admin` | DataTable, StatsEmbed, MediaUploader, RoleSimulator |

## Règles

- Avant de créer : **chercher dans `CATALOGUE.md`**. Réutiliser ou étendre par props / variantes plutôt que dupliquer.
- Un composant de la bibliothèque est **générique** : aucun texte, couleur ou image propre à un client. Tout passe par props, slots et tokens.
- Variantes visuelles par props (`variant="ticket"`, `variant="carte-visite"`…) : un même footer peut avoir plusieurs habillages.
- Chaque composant a un `README.md` (props, exemple, dépendances, client d'origine, date).
- Statut dans `CATALOGUE.md` : `stable`, `beta` (utilisé chez un seul client), `déprécié`.

## Catalogue visuel

- Page `site/src/pages/_catalogue/` (exclue du sitemap, `noindex`) qui affiche chaque composant et ses variantes.
- Sert au développement **et de démonstration commerciale** devant un prospect.

## Enrichissement continu

- Tout composant créé dans un projet client et réutilisable doit être **rapatrié** ici : skill `recolter-composant`.
- En fin de projet client, lister les composants candidats au rapatriement.
