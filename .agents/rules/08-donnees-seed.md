---
trigger: model_decision
description: "À appliquer pour le modèle de données MongoDB, les données factices, le script de seed et la génération de contenu à partir de client.json"
---

# Données & seeding

## Collections

| Collection | Contenu |
|---|---|
| `settings` | Copie éditable de `client.json` (horaires, contacts, textes) |
| `services` | Prestations : id, nom, catégorie, prix, durée, description, sprite, image |
| `products` | Produits : id, nom, prix, stock, images, catégorie |
| `orders` | Commandes : articles, total, client, statut, moyen de paiement, historique |
| `messages` | Demandes de contact |

- Identifiants lisibles (`slug`) pour les services et produits : ils servent aux URLs et aux sprites.
- Dates en UTC, montants en entiers.

## Seed

- Script **versionné** : `api/scripts/seed.ts`, lancé par `npm run seed` (et `npm run seed:demo` pour la base `demo_<slug>`).
- **Idempotent** : relançable sans doublons (upsert par `slug`).
- Données générées **à partir de `client.json`** : vraies prestations et vrais prix quand ils sont connus, données factices réalistes et cohérentes avec l'activité et la ville sinon (noms locaux, prix dans la devise locale).
- Ne jamais mettre de vraies données personnelles dans le seed.

## Génération depuis le contexte client

À partir de `client.json`, générer automatiquement :

- `storage.key` (`<slug>:app`) ;
- les tokens SCSS (couleurs, polices) ;
- la sprite sheet et ses classes ;
- les données de seed ;
- le JSON-LD `LocalBusiness`.
