# ActionGroup (LegionUI)

Composant de groupe d'actions de conversion et micro-interactions (Pattern 1 : Multi-Items / Slot composable).
Regroupe les micro-boutons de contact rapide (WhatsApp, Appel, Wave QR, Panier avec badge temps réel, Accès portail admin).

## Emmet attendu
```emmet
div.actionGroup[.--modifier] > (button.actionGroup__btn[.--wave|.--cart|.--whatsapp]* + a.actionGroup__btn*)
```

## Props
| Nom | Type | Défaut | Description |
|---|---|---|---|
| `actions` | `ActionItem[]` | `[]` | Liste d'actions `{ id?, type?, label, href?, isButton?, iconSvg?, badgeCount?, triggerClass?, dataAttrs? }` |
| `modifier` | `'default' \| 'compact'` | `'default'` | Style visuel (`--compact` pour sticky header réduit) |
| `className` | `string` | `''` | Classes CSS additionnelles |

## Slot
Supporte également la projection libre via `<slot />` pour composer des boutons ou déclencheurs complexes.

## Exemple
```astro
---
import ActionGroup from '@/components/ActionGroup/ActionGroup.astro';
---

<ActionGroup modifier="default">
  <button type="button" class="actionGroup__btn --wave openWaveModalTrigger" aria-label="Wave">
    <img src="/wave.png" width="30" height="30" alt="" />
  </button>
  <button type="button" id="headerCartBtn" class="actionGroup__btn --cart" aria-label="Panier">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">...</svg>
    <span class="actionGroup__badge" data-type="cart">0</span>
  </button>
</ActionGroup>
```
