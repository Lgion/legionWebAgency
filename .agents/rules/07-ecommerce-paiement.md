---
trigger: model_decision
description: "À appliquer pour le panier, le tunnel de commande, les paiements Wave / PayDunya, la commande WhatsApp et la livraison"
---

# E-commerce & paiement

Module activé seulement si `client.json` contient `panier` et `checkout`.

## Panier

- Stocké dans `storage.cart` (identifiants + quantités, jamais les prix comme source de vérité).
- Prix, stock et frais de livraison **recalculés par l'API** à la création de la commande.

## Tunnel (3 étapes max)

1. **Panier** : récapitulatif, quantités, code promo éventuel.
2. **Coordonnées** : nom, téléphone (format local), mode de retrait ou zone de livraison (`client.json → delivery.zones`).
3. **Paiement** : moyens activés pour ce client :
   - **Wave** : l'API crée une session Checkout → `wave_launch_url` ; sur mobile, bouton d'ouverture de l'app ; sur desktop, **QR code** de cette URL.
   - **PayDunya** : l'API crée une facture Checkout → redirection ou QR selon l'appareil.
   - **Commande WhatsApp** : message prérempli (articles, total, coordonnées) vers le numéro du commerce.
   - **Paiement à la livraison / au retrait**.

## Règles de paiement

- Une commande passe à `paid` **uniquement** après réception et vérification du webhook (Wave) ou de l'IPN (PayDunya). La page de retour ne fait que **consulter** le statut.
- Statuts : `pending` → `paid` | `failed` | `cancelled` → `fulfilled`.
- Pendant l'attente du paiement : spinner + texte explicite + interrogation de l'API toutes les 3 s (arrêt après 10 min).
- Mode test par défaut (`PAYDUNYA_MODE=test`, clés Wave de test) ; passage en production noté dans la checklist de mise en ligne.
- Montants en entiers dans la devise du client (XOF : pas de décimales).
- Confirmation : écran de succès (confetti), récapitulatif, lien WhatsApp vers le commerce.

## Admin

- Liste des commandes filtrable par statut, détail, changement de statut manuel (`fulfilled`, `cancelled`).
