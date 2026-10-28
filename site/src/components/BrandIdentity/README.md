# BrandIdentity (LegionUI)

Composant d'identité visuelle de marque (Pattern 2 : Instance Unique).
Affiche l'emblème/logo avec un halo or et les textes de marque (nom + sous-titre/tagline).

## Emmet attendu
```emmet
a.brandIdentity[.--modifier] > (span.brandIdentity__emblem + div.brandIdentity__text > (span.brandIdentity__name + span.brandIdentity__tagline))
```

## Props
| Nom | Type | Défaut | Description |
|---|---|---|---|
| `name` | `string` | *(Requis)* | Nom de la marque |
| `tagline` | `string` | `undefined` | Sous-titre ou localisation / métier |
| `href` | `string` | `'/'` | Lien de redirection |
| `logoSrc` | `string` | `undefined` | Image de logo alternative au SVG par défaut |
| `modifier` | `'default' \| 'compact'` | `'default'` | Variante d'affichage (`--compact` pour headers réduits) |
| `className` | `string` | `''` | Classes BEM additionnelles |

## Exemple
```astro
---
import BrandIdentity from '@/components/BrandIdentity/BrandIdentity.astro';
---

<BrandIdentity
  name="WebAgency"
  tagline="Abidjan • Cocody"
  href="/web-agency-abidjan"
/>
```
