# ActionHub (`conversion/ActionHub`)

Hub d'actions métier express et simulateur de devis interactif (standard LegionUI BEM 5 sections).

## Squelette Emmet attendu
```text
section.actionHub > div.actionHub__container > header.actionHub__header + ul.actionHub__grid + aside.actionHub__simulator
```

## Fonctionnalités
- Cartes d'actions métier rapides pilotées par `client.actionHub`.
- Simulateur de devis express combinant `client.services`, `client.products` et `client.delivery.zones`.
- Envoi direct du récapitulatif structuré sur WhatsApp ou ouverture de `WaveModal` avec le montant calculé.

