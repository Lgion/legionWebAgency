# ServiceCard (LegionUI Pattern)

Composant de présentation d'une prestation ou d'un service commercial, conforme à l'architecture modulaire stricte de **LegionUI** :
- SCSS pur BEM en 5 sections (Function, Variables, Placeholder avec variable CSS `--template` Emmet, Mixin, Mapping sémantique).
- Séparation stricte : contrôleur `.astro`, routeur SCSS `index.scss`, mixins esthétiques dans `scss/`, et gestionnaire DOM dans `js/`.
- Pattern **Lien-Modale** : vrai lien sémantique `<a href="/prestations/[slug]">` pour le SEO indexable, intercepté en amélioration progressive par `js/default.js`.

## Squelette HTML / Emmet

```text
article.serviceCard[.--featured]
 └── div.serviceCard__body
      ├── div.serviceCard__header
      │    ├── span.serviceCard__category
      │    └── span.serviceCard__duration
      ├── h3.serviceCard__title
      ├── p.serviceCard__description
      ├── ul.serviceCard__highlights
      │    └── li
      │         ├── span.serviceCard__check
      │         └── span
      └── div.serviceCard__footer
           ├── span.serviceCard__price
           │    ├── small
           │    └── strong
           └── div.serviceCard__actions
                ├── a.serviceCard__cta.modalTrigger
                ├── button.serviceCard__cartBtn.addCartTrigger
                └── a.serviceCard__waBtn
```

## Props

| Nom | Type | Défaut | Description |
|---|---|---|---|
| `service` | `ServiceItem` | requis | Objet service (slug, name, price, description, etc.) |
| `modifier` | `'default' \| 'featured'` | `'default'` | Déclinaison esthétique BEM autonome (`.--featured`) |
| `className` | `string` | `''` | Classes CSS complémentaires éventuelles |

## Utilisation

```astro
---
import ServiceCard from '@/components/ServiceCard/ServiceCard.astro';
---

<ServiceCard service={myService} modifier="featured" />
```
