---
name: nouveau-client
description: Procédure pour démarrer un site client à partir du boilerplate webAgency, de l'interview (audio ou texte) jusqu'au site déployé. À utiliser quand l'utilisateur fournit une interview, un brief ou demande de créer le site d'un nouveau commerce.
---

# Nouveau client

## 1. Extraire le brief

1. Lire l'interview (transcription audio, notes, messages).
2. Remplir `client.json` à partir de `client.example.json`. Questions de référence :
   - nom, activité, prestations / produits phares et prix ;
   - adresse, horaires, contacts (téléphone, WhatsApp, email, réseaux) ;
   - rendez-vous ou sans rendez-vous, livraison ou service à domicile ;
   - ce qui le distingue, ambiance souhaitée, couleurs, logo, photos ;
   - action principale attendue du visiteur.
3. Lister les **informations manquantes** et les demander à l'utilisateur. Ne pas inventer de prix, d'adresse ou de numéro réels.
4. Proposer un **palier** (1, 2 ou 3) et les `modules` correspondants ; faire valider.

## 2. Créer le projet

1. Créer le dépôt client à partir du dépôt modèle webAgency (« Use this template » sur GitHub, ou copie).
2. Garder le boilerplate comme remote `upstream` pour récupérer les nouveaux composants plus tard.
3. Copier `client.json` dans `site/src/data/`.

## 3. Générer depuis le contexte

- Tokens SCSS (couleurs, polices), motif de fond, variante de footer.
- `generated.storageKey` et `generated.demoDb`.
- Sprite sheet des prestations / produits et ses classes.
- Données de seed, puis `npm run seed` (et `seed:demo` si le simulateur est prévu).
- JSON-LD `LocalBusiness`.

## 4. Assembler

- Composer les pages avec les composants de `library/` (chercher dans `CATALOGUE.md` d'abord).
- Créer les composants manquants en respectant `10-bibliotheque-composants.md`.
- Personnaliser l'habillage pour que le site soit unique.

## 5. Configurer et déployer

- Variables GitHub Actions (`PUBLIC_*`) pour `site/`, secrets de `api/` sur l'hébergeur de l'API.
- Site Plausible créé pour le domaine.
- Déploiement GitHub Pages + API.

## 6. Valider

- Dérouler la checklist « Mise en ligne » de `99-definition-of-done.md`.
- Lister les composants à rapatrier → skill `recolter-composant`.
