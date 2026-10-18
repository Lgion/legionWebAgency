---
trigger: model_decision
description: "À appliquer pour toute création ou modification d'interface : header sticky, footer original, boutons fixes, transitions entre sections, parallax, motifs, compaction de l'information, admin"
---

# Design & UX

## Identité

- Chaque site doit être **reconnaissable et différent** des autres clients : le socle est commun, l'habillage non.
- Ambiance, couleurs, polices et motifs viennent de `client.json` (`brand`).
- **Motifs de fond** quand ça s'y prête : SVG légers ou dégradés CSS, inspirés de l'identité du client (ex. motifs textiles pour un salon de coiffure afro). Contraste du texte toujours conforme.

## Header

- **Sticky**, hauteur réservée (pas de saut de mise en page), réduction au défilement.
- Contient : logo, navigation, accès rapide au panier si le module est actif.

## Boutons fixes

- **En bas à droite : contact** (appel, WhatsApp), en « speed dial » qui se déplie.
- **En bas à gauche : fonctionnalités** (panier, retour en haut, thème, simulateur de rôle si activé).
- Cible tactile ≥ 48 px, `env(safe-area-inset-bottom)` respecté, ne masquent jamais un CTA ou le contenu du footer.
- Libellé accessible (`aria-label`) sur chaque bouton.

## Transitions entre sections

- Chaque passage entre deux sections est **travaillé** : séparateurs SVG (vagues, angles, déchirures), changements de motif, chevauchements.
- **Parallax** avec les *scroll-driven animations* CSS, dans `@supports ((animation-timeline: view()) and (animation-range: entry))`. Effet décoratif = pas de repli JS.
- N'animer que `transform` et `opacity`.
- `prefers-reduced-motion: reduce` → animations désactivées ou fortement ralenties.

## Micro-interactions

- Toute zone interactive a un retour visuel : survol, focus visible, pression, état désactivé.
- Durées courtes (150–300 ms), easings issus des tokens.

## Compacter l'information

Objectif : éviter un empilement de sections redondantes.

- Outils : onglets, accordéons (`<details name="…">` pour un accordéon exclusif), carrousels (scroll-snap), modales (`<dialog>`).
- **Toujours visibles sans interaction** : nom, activité, prix principaux, horaires, téléphone, WhatsApp, adresse.
- Modales de détail : appliquer le **pattern lien-modale** de `05-seo-semantique.md` (le contenu garde une vraie URL indexable).
- Pas plus d'un carrousel par écran.

## Footer

- Doit être **le plus original possible** (ex. carte de visite, ticket de caisse, devanture illustrée…) et unique pour chaque client.
- Contient la section **Contact** complète :
  - carte (Leaflet, chargée au clic) + lien « Itinéraire » (Google Maps / Waze) ;
  - téléphone cliquable, WhatsApp, email, réseaux sociaux ;
  - horaires avec badge **Ouvert / Fermé** calculé en temps réel ;
  - liens mentions légales et confidentialité.

## Page admin

- Panneau latéral gauche en **menu tiroir** : persistant sur desktop, hors-champ sur mobile.
- Sections selon les modules : tableau de bord, catalogue, commandes, médias, statistiques, paramètres.
- `noindex`, accès réservé au rôle `admin` (voir `06-roles-securite.md`).

## Accessibilité (non négociable)

- Objectif **WCAG 2.2 AA** : contrastes, focus visible, navigation au clavier, ordre de tabulation logique, textes alternatifs.
