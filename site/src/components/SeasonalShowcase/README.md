# SeasonalShowcase (`commerce/SeasonalShowcase`)

Vitrine saisonnière d'offres et d'arrivages thématiques (standard LegionUI BEM 5 sections).

## Squelette Emmet attendu
```text
section.seasonalShowcase > div.seasonalShowcase__container > header.seasonalShowcase__header + div.seasonalShowcase__banner + ul.seasonalShowcase__grid
```

## Fonctionnalités
- Piloté par `client.seasonal` dans `client.json`.
- Affiche la bannière promotionnelle de saison + grille d'articles/forfaits avec badge de saison (`Rentrée`, `Fêtes & Noël`, `Mariages`, `Gaming`).
- Intègre à la fois l'ajout au panier (`CartDrawer`) et la commande directe sur WhatsApp.

