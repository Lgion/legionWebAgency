---
trigger: always_on
description: "Conventions de code : SCSS, sprites CSS, clé localStorage unique, politique des librairies tierces, support navigateurs"
---

# Conventions de code

## Langages

- TypeScript partout (`site/src/lib`, îlots, `api/`).
- HTML sémantique d'abord, JS en amélioration progressive.

## SCSS & Méthodologie BEM Avancée (LegionUI Pattern)

Tous les composants doivent obligatoirement respecter l'architecture BEM issue de **LegionUI** (https://github.com/Lgion/Legion_UI). Utiliser la skill `bem-scss-generator` pour générer ou modifier tout fichier SCSS.

### Règles d'or BEM :
1. **Nommage en camelCase** : Les blocs (composants) sont nommés en `camelCase` (ex: `chromeCards`, `b5_accordion`, `chromeHero`).
2. **Modificateurs autonomes (`.--mod`)** : Les modificateurs ne répètent JAMAIS le nom du bloc. En SCSS : `&.--modifierName` (ex. `&.--collapsed`, `&.--open`, `&.--chrome`). En HTML/JSX : `class="monComposant --modifierName"`.
3. **Zéro wrapper superficiel & Aplatissement DOM** : Le bloc est son propre wrapper (aucun `__wrapper` de premier niveau). Interdiction absolue des enfants uniques imbriqués (effet oignon proscrit).
4. **Structure type en 5 sections SCSS obligatoires** :
   - **`FUNCTION`** : `@function [Nom]($defaultValues: "") { @return ($defaultValues); }`
   - **`VARIABLES`** : Map SCSS `$index` ou `$[Nom]` paramétrable.
   - **`PLACEHOLDER`** : `%[Nom]` définissant la structure pure, avec obligatoirement la variable CSS `--template` contenant la syntaxe Emmet du squelette attendu (ex. `--template: "details.chromeAccordion > summary.chromeAccordion__header + div.chromeAccordion__panel";`), lisible en direct dans l'inspecteur d'éléments du navigateur.
   - **`MIXIN`** : `@mixin [Nom]($paramMixi_: (), $block: "...")` combinant `@extend %[Nom]`, fusion `map-merge` et le **mappage mixte dynamique sémantique** (`>li, >#{$block}__item`).
   - **`MAPPING SÉMANTIQUE NATIF`** : Câblage direct des balises HTML5 (`section`, `article`, `details`, `summary`, `h2`, `p`, `picture`).
5. **Règle absolue des pseudo-classes** : L'imbrication `&__element` sous un `&:hover` est une **erreur fatale** (génère `:hover__element`). Rallonger obligatoirement le sélecteur : `&:hover &__element, &:hover > balise { ... }`.
6. **Pureté absolue du JSX / HTML (Zéro classe utilitaire dans le template)** :
   - Aucune classe Bootstrap (`row`, `col-*`, `d-flex`) ni classe utilitaire de design (`btn-primary`, `bg_cover`) n'est autorisée dans le JSX/HTML.
   - Le template ne porte que des classes BEM pures ou des balises HTML5 sémantiques.
   - Toute grille ou utilitaire est injecté dans le SCSS via `@extend .col-md-6 !optional`.
7. **Arrière-plans via pseudo-éléments** : Pas de `div` overlay dans le template. Variable CSS `--bg-image` sur la racine sémantique (`<section style="--bg-image: url(...)">`) et application dans le SCSS sur `::before { background-image: var(--bg-image); }`.
8. **Extraction & Rapatriement** : Utiliser la skill `legionui-component-extractor` pour convertir tout snippet web externe (ex: `code.snippet`) ou maquette vers ce standard BEM strict.

### Pas de framework CSS imposé
- Pas de framework CSS complet (Bootstrap, Foundation) qui écraserait l'identité visuelle du commerce. Foundation est en maintenance uniquement.
- Briques autorisées : `modern-normalize` pour le reset, et à la carte `open-props` pour les tokens.
- Les couleurs, polices et rayons proviennent de `client.json` sous forme de custom properties (`--color-primary`…).

## Sprites

- **Images de catalogue** (prestations, produits) : une sprite sheet WebP/PNG par client, cases de taille fixe, classes `.sprite-<id>` générées par script à partir des données.
- **Icônes** : sprite **SVG** (`<symbol>` + `<use>`), jamais de police d'icônes.

## localStorage : une seule clé

- Clé : `<slug-client>:app` (ex. `chezelleetlui:app`), générée depuis `client.json` (`storage.key`).
- Valeur JSON versionnée :
  ```json
  { "v": 1, "cart": [], "prefs": { "theme": "auto" }, "sim": { "role": null }, "consent": {} }
  ```
- Accès **uniquement** via `site/src/lib/storage.ts` : `get()`, `set()`, `update()`, migrations par numéro de version, `try/catch` (navigation privée, quota plein).
- Interdit d'y stocker : jetons d'auth, données personnelles sensibles, données de paiement.

## Librairies tierces : ne pas réinventer la roue

Avant d'écrire un composant ou un comportement, vérifier **dans cet ordre** :

1. **La plateforme** : existe-t-il une solution native HTML/CSS (`<dialog>`, popover, scroll-snap, scroll-driven animations…) ? Utiliser la skill `modern-web-guidance`.
2. **La bibliothèque du boilerplate** (`src/components/library/CATALOGUE.md`).
3. **La liste validée** ci-dessous.
4. **Un nouveau paquet**, s'il est maintenu (commit < 12 mois), sous licence permissive (MIT, Apache, ISC), léger, sans jQuery. Le noter dans la liste validée.

On peut **forker ou envelopper** une librairie pour l'améliorer ; on ne la réécrit pas.

| Besoin | Librairie validée |
|---|---|
| Carrousel | CSS scroll-snap d'abord, sinon **Embla Carousel** |
| Galerie / lightbox | **PhotoSwipe** |
| Carte / géolocalisation | **Leaflet** + OpenStreetMap (sans clé API), chargée au clic (façade) |
| QR code | **qrcode** |
| Recherche statique | **Pagefind** |
| Animations complexes | **GSAP**, seulement si le CSS ne suffit pas |
| Positionnement d'infobulles | Popover + anchor positioning natifs, sinon **Floating UI** |
| Célébration (commande validée) | **canvas-confetti** |
| API | **Hono**, **Zod**, driver **mongodb**, **@clerk/backend** |
| Analytics | **Plausible** |

## Support navigateurs

- Fonctionnalités **Baseline Widely available** : utilisables sans repli.
- **Newly available / Limited** : uniquement avec détection (`@supports`, `CSS.supports`) et dégradation propre. Un effet purement décoratif n'a pas besoin de repli JS.
- Pas de polyfill lourd.
