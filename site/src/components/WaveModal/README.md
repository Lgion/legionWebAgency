# WaveModal (`commerce/WaveModal`)

Modale interactive de paiement par QR Code **Wave Côte d'Ivoire** (standard LegionUI BEM 5 sections).

## Squelette Emmet attendu
```text
dialog.waveModal[closedby="any"] > article.waveModal__card > header.waveModal__header + section.waveModal__body
```

## Fonctionnalités
- Saisie libre du montant en FCFA + 6 préréglages rapides (`5 000 F` à `50 000 F`).
- Génération temps réel du QR Code via `qrcode`.
- Bouton deep link mobile `Ouvrir dans Wave (Mobile)` et copie du lien en un clic.
- Ouverture déclarative via toute classe `.openWaveModalTrigger` (avec `data-amount` optionnel) ou événement `window.dispatchEvent(new CustomEvent('wave:open', { detail: { amount: 15000 } }))`.
- Respecte `closedby="any"` + fallback JS et `overscroll-behavior: contain`.

