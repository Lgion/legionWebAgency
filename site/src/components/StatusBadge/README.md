# StatusBadge (LegionUI)

Micro-composant d'indicateur d'état (Pattern 2 : Instance Unique).
Affiche une pastille lumineuse (avec effet de pulsation optionnel) et un libellé d'activité.

## Emmet attendu
```emmet
span.statusBadge[.--online|.--busy|.--offline|.--pulse] > (span.statusBadge__dot + span.statusBadge__label)
```

## Props
| Nom | Type | Défaut | Description |
|---|---|---|---|
| `label` | `string` | *(Requis)* | Texte du badge (ex: "Disponible", "Ouvert") |
| `status` | `'online' \| 'busy' \| 'offline'` | `'online'` | Statut visuel de la pastille |
| `pulse` | `boolean` | `true` | Active l'animation de pulsation lumineuse |
| `id` | `string` | `undefined` | Identifiant DOM pour mises à jour dynamiques |
| `className` | `string` | `''` | Classes CSS additionnelles |

## Événements JS
Le composant écoute l'événement `status:update` :
```js
window.dispatchEvent(new CustomEvent('status:update', {
  detail: { id: 'monBadge', status: 'busy', label: 'Complet aujourd’hui' }
}));
```

## Exemple
```astro
---
import StatusBadge from '@/components/StatusBadge/StatusBadge.astro';
---

<StatusBadge
  label="Disponible pour vos projets"
  status="online"
  pulse={true}
/>
```
