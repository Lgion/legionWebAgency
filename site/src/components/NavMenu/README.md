# NavMenu (LegionUI)

Composant de menu de navigation sémantique (Pattern 1 : Multi-Items).
Gère la navigation au clavier (flèches directionnelles), l'indicateur d'état actif et supporte les liens et déclencheurs modaux.

## Emmet attendu
```emmet
nav.navMenu[.--modifier] > ul.navMenu__list > li.navMenu__item > (a.navMenu__link | button.navMenu__btn)
```

## Props
| Nom | Type | Défaut | Description |
|---|---|---|---|
| `items` | `NavMenuItem[]` | `[]` | Liste des éléments `{ label, href?, isButton?, triggerClass?, dataAttrs?, active? }` |
| `ariaLabel` | `string` | `'Navigation principale'` | Description accessible pour lecteurs d'écran |
| `modifier` | `'default' \| 'pills'` | `'default'` | Style visuel (`--pills` pour capsules arrondies) |
| `className` | `string` | `''` | Classes CSS additionnelles |

## Exemple
```astro
---
import NavMenu from '@/components/NavMenu/NavMenu.astro';

const navItems = [
  { label: 'Notre Métier', href: '#metier' },
  { label: 'Services', href: '#services' },
  { label: 'Simulateur Devis', isButton: true, triggerClass: 'openSimulatorTrigger' },
  { label: 'Contact', href: '#contact' },
];
---

<NavMenu items={navItems} modifier="default" />
```
