---
trigger: model_decision
description: "À appliquer pour toute page, composant, image, script ou requête réseau : budget de performance chiffré, skeletons et spinners légers"
---

# Performance & états de chargement

## Budget chiffré

Mesuré avec Lighthouse **mobile** (bridage 4G par défaut) sur la page d'accueil et une page de détail.

| Indicateur | Seuil |
|---|---|
| Lighthouse Performance | ≥ 90 |
| Lighthouse Accessibilité / Bonnes pratiques / SEO | ≥ 95 / ≥ 95 / 100 |
| LCP | < 2,5 s |
| CLS | < 0,1 |
| INP | < 200 ms |
| JS initial par page (gzip) | ≤ 150 Ko, îlots chargés à la demande exclus |
| CSS (gzip) | ≤ 50 Ko |
| Image principale (hero) | ≤ 150 Ko, AVIF/WebP via Cloudinary |

Un dépassement doit être **justifié dans la PR** ou corrigé.

## Bonnes pratiques

- Image LCP : `fetchpriority="high"`, jamais en lazy ; les autres en `loading="lazy"` avec dimensions explicites.
- Polices : 2 familles max, `font-display: swap`, sous-ensembles, préchargement de la principale.
- Îlots Astro : `client:visible` ou `client:idle` par défaut, `client:load` seulement si indispensable.
- Widgets lourds (carte, vidéo, chat) : **façade** cliquable, chargement au clic.

## Skeleton ou spinner ?

Toute requête réseau a un état de chargement **et** un état d'erreur (message + bouton « Réessayer »).

| Situation | Indicateur |
|---|---|
| La forme du contenu est connue (liste, cartes, tableau, image) | **Skeleton** aux dimensions finales (zéro CLS) |
| Action de l'utilisateur (envoi, ajout au panier, upload, attente de paiement) | **Spinner** dans le bouton ou la zone concernée |
| Chargement d'une vue entière de l'admin | Skeleton de la vue |

## Spinners légers

- **CSS uniquement** : pas de GIF, de Lottie ni de SVG animé par JS.
- Base sémantique : `<progress>` sans `value` (indéterminé, lu par les lecteurs d'écran) ou `role="status"` + texte masqué.
- N'animer que `transform` (rotation) ; ralentir fortement sous `prefers-reduced-motion`.
- Afficher le spinner seulement après **300 ms** pour éviter le clignotement sur les réponses rapides.
- Composants de référence : `library/feedback/Spinner` et `library/feedback/Skeleton` (guide `spinner` de la skill `modern-web-guidance`).
