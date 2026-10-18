---
trigger: model_decision
description: "À appliquer pour la mesure d'audience, les événements de conversion et le tableau de bord statistiques de l'admin"
---

# Analytics : Plausible auto-hébergé

## Infrastructure

- **Une seule instance Plausible Community Edition** (Docker) sur un VPS de l'agence, **mutualisée** : un « site » Plausible par client.
- C'est le seul coût d'infrastructure fixe de l'agence ; il est partagé par tous les clients.
- Sans cookies : pas de bannière de consentement pour la mesure d'audience (argument commercial).

## Intégration au site

- Script Plausible chargé en `defer` depuis `PUBLIC_PLAUSIBLE_HOST`, pour `PUBLIC_PLAUSIBLE_DOMAIN`.
- Désactivé en développement et en mode simulation.

## Événements de conversion (obligatoires)

| Événement | Déclencheur |
|---|---|
| `Appel` | Clic sur un lien `tel:` |
| `WhatsApp` | Clic sur un lien WhatsApp |
| `Itinéraire` | Clic sur le lien d'itinéraire |
| `Ajout panier` | Ajout d'un article |
| `Commande` | Commande créée (propriété : moyen de paiement) |
| `Paiement réussi` | Statut `paid` affiché |

## Dans l'admin

- Section **Statistiques** : tableau de bord partagé Plausible intégré (lien partagé en mode `embed`) **ou** graphiques maison alimentés par la Stats API via un proxy de l'API (`PLAUSIBLE_API_KEY` jamais exposée au navigateur).
- Mettre en avant les conversions (appels, WhatsApp, commandes) plutôt que les simples visites : c'est ce qui parle au commerçant.
