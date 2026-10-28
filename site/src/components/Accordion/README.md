# Accordion (LegionUI Component)

Composant d'accordéon sémantique HTML5 (`<details>` / `<summary>`) conforme à l'architecture modulaire de **LegionUI** :
- **Moteur natif** : le repliement/dépliement est pris en charge **directement par le navigateur** sans nécessiter de bibliothèque JS externe.
- **Amélioration progressive (`js/default.js`)** : gestion du mode exclusif (`isExclusive={true}`), tracking d'événements (`accordion:toggle`) et navigation au clavier accessible (flèches, début/fin).
- **SCSS BEM en 5 sections** : Function, Variables, Placeholder avec variable CSS `--template` Emmet, Mixin, Mapping sémantique.

## Modificateurs supportés
* `--default` : Accordéon encadré avec coins arrondis et ombrage au déploiement.
* `--chrome` : Accordéon épuré type Google / Material avec bordure basse fine et rotation d'icône.

## Emmet / Squelette attendu
```text
ul.b5_accordion[.--chrome|.--default] > li.b5_accordion__item > details > summary.b5_accordion__header + div.b5_accordion__panel
```

## Props
| Prop | Type | Défaut | Description |
|---|---|---|---|
| `items` | `AccordionItem[]` | `[]` | Tableau des éléments (`title`, `content`, `defaultOpen`) |
| `modifier` | `'default' \| 'chrome'` | `'default'` | Variante visuelle du composant |
| `isExclusive` | `boolean` | `false` | Ferme automatiquement les autres volets lorsqu'un volet s'ouvre |
| `id` | `string` | `'accordionExample'` | Identifiant unique |
| `className` | `string` | `''` | Classes CSS complémentaires |

## Exemple d'utilisation
```astro
---
import Accordion from '@/components/Accordion/Accordion.astro';

const faqs = [
  { title: "Faut-il prendre rendez-vous ?", content: "Nous accueillons avec et sans rendez-vous." },
  { title: "Quels sont vos tarifs ?", content: "Consultez notre grille tarifaire ci-dessous." }
];
---

<Accordion items={faqs} modifier="chrome" isExclusive={true} />
```
