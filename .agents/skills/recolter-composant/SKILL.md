---
name: recolter-composant
description: Procédure pour rapatrier un composant créé dans un projet client vers la bibliothèque du boilerplate webAgency, en le rendant générique et documenté. À utiliser en fin de projet client ou quand un composant réutilisable vient d'être créé.
---

# Récolter un composant

## 1. Évaluer

Le composant mérite d'être rapatrié s'il peut servir à au moins un autre type de commerce.
Vérifier dans `CATALOGUE.md` qu'il n'existe pas déjà : si oui, l'**améliorer** (nouvelle variante, nouvelles props) plutôt que de créer un doublon.

## 2. Rendre générique

- Remplacer textes, images et liens du client par des **props** ou des **slots**.
- Remplacer les couleurs et polices en dur par les **tokens** (`var(--color-primary)`…).
- Retirer toute dépendance aux données d'un client précis.
- Conserver l'habillage spécifique comme **variante** (`variant="…"`) s'il est réussi.

## 3. Ranger

- Placer dans `site/src/components/library/<catégorie>/<NomComposant>/` (`.astro`, `_nom.scss`, `README.md`).
- README : rôle, props, slots, variantes, exemple d'usage, dépendances, client d'origine, date.

## 4. Référencer

- Ajouter l'entrée dans `CATALOGUE.md` avec le statut `beta` (ou `stable` s'il sert déjà chez plusieurs clients).
- L'afficher dans la page `/_catalogue`.
- Si une nouvelle librairie tierce a été introduite, l'ajouter à la liste validée de `02-conventions-code.md`.

## 5. Vérifier

- Checklist « Composant » de `99-definition-of-done.md`.
- Le build du boilerplate passe.
