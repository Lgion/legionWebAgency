# Accordion (LegionUI Component)

Composant d'accordéon sémantique HTML5 (`<details>` / `<summary>`), sans JavaScript obligatoire, entièrement stylé via la méthodologie BEM LegionUI.

## Modificateurs supportés
* `--default` : Accordéon encadré avec coins arrondis et ombrage au déploiement.
* `--chrome` : Accordéon épuré type Google / Material avec bordure basse fine et rotation d'icône plus fluide.

## Emmet / Squelette attendu
```
ul.b5_accordion[.--chrome|.--default] > li.b5_accordion__item > details > summary.b5_accordion__header + div.b5_accordion__panel
```

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | `[]` | Tableau des éléments (`title`, `content`, `defaultOpen`) |
| `modifier` | `'default' \| 'chrome'` | `'default'` | Variante visuelle du composant |
| `id` | `string` | `'accordionExample'` | Identifiant unique |
| `className` | `string` | `''` | Classes CSS complémentaires |

## Exemple d'utilisation
```astro
---
import Accordion from '@/components/library/contenu/Accordion/Accordion.astro';

const faqs = [
  { title: "Faut-il prendre rendez-vous ?", content: "Nous accueillons avec et sans rendez-vous." },
  { title: "Quels sont vos tarifs ?", content: "Consultez notre grille tarifaire ci-dessous." }
];
---

<Accordion items={faqs} modifier="chrome" />
```
