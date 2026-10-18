---
name: bem-scss-generator
description: Génère ou modifie des composants SCSS structurés selon le pattern BEM avancé (Function, Variable, Placeholder, Mixin, Semantic Block) spécifique à ce projet.
version: 2.0.0
author: Antigravity
tags:
  - scss
  - bem
  - components
  - styling
  - seo
---

# BEM SCSS Generator Skill

## Overview
Cette compétence permet à l'agent de générer et structurer des composants SCSS selon notre pattern BEM avancé et sémantique. Elle garantit un code optimisé pour le SEO, sans redondance de balises (proscription des enfants uniques imbriqués), avec des modificateurs autonomes (ex: `.--mod`), et un mapping final sur des balises HTML natives.

## Règles d'Architecture Stricte

1. **Nommage en camelCase** : Tous les blocs (composants) doivent être nommés en `camelCase` (ex: `chromeCards`, `chromeHero`).
2. **Modificateurs BEM Autonomes** : Les modificateurs ne doivent plus inclure le nom du bloc. On utilise le préfixe `.--` (ex: `.--stick-left`, `.--blue`). Dans le SCSS, ils s'écrivent `&.--stick-left`. Dans le HTML, cela donne `class="chromeCards --stick-left"`.
3. **Pas de Wrapper au niveau du Bloc** : Le bloc lui-même est son propre wrapper. Les éléments comme `__wrapper` au premier niveau sont strictement interdits. Les sous-éléments peuvent en avoir si nécessaire (ex: `__header__wrapper`), mais la structure doit rester aussi plate que possible.
4. **Interdiction des enfants uniques imbriqués** : Ne jamais créer de structure HTML où un enfant unique contient un autre enfant unique inutilement. La hiérarchie doit être directe et justifiée.
5. **Variables et Fonction** : 
   - La fonction retourne les variantes.
   - La variable globale est une Map SCSS simple.
   - Les `map-get` s'effectuent exclusivement dans la Mixin.
6. **Documentation Sémantique (Header du fichier)** : Chaque fichier doit inclure un bloc de commentaire détaillant l'arborescence HTML native (squelette/Emmet) attendue pour le SEO.
7. **Mapping Sémantique Natif (Fin du fichier)** : Le bloc final ne se contente pas d'appeler la mixin, il mappe la structure HTML sémantique (balises SEO comme `article`, `section`, `h1`, `p`) aux placeholders via des sélecteurs d'enfants directs (`>`).
8. **Proscription des balises `<div>`** : L'utilisation de la balise générique `<div>` doit être proscrite au profit de balises HTML5 sémantiques (`section`, `article`, `main`, `aside`, `header`, `footer`, `details`, `summary`, etc.). Les `<div>` sont uniquement autorisées comme "coquilles vides" (simples conteneurs structurels/techniques sans texte ni sémantique propre, servant uniquement au positionnement flex/grid ou à l'application de styles CSS spécifiques).
9. **Instructions de Template visibles dans le Navigateur (CSS Variables)** : Afin de documenter le squelette HTML directement au cœur du CSS compilé pour les développeurs, le placeholder principal `%[ComponentName]` doit inclure une variable CSS `--template` contenant la syntaxe Emmet du squelette attendu (ex: `--template: "details.chromeAccordion > summary.chromeAccordion__header + div.chromeAccordion__panel";`). Ceci permet de lire instantanément la structure HTML requise directement depuis l'inspecteur d'éléments (console de styles) de n'importe quel navigateur !
10. **Mapping Natif dans la Mixin & Maîtrise des Pseudo-classes SCSS (`:hover`, `:focus`, etc.)** : L'extension d'un placeholder `%` ne préserve pas son nom au sein d'une mixin, ce qui empêche les mappages natifs d'être pleinement dynamiques s'ils sont uniquement en bas de fichier. Par conséquent, les ciblages de balises HTML sémantiques (ex: `> section`) doivent également être définis **à l'intérieur de la Mixin**, couplés à l'élément BEM.
**ATTENTION AUX PSEUDO-CLASSES** : L'imbrication d'un élément BEM `&__element` directement *à l'intérieur* d'un `&:hover { ... }` est une **erreur fatale** en SCSS (cela génère `:hover__element`, cassant la compilation).
La **solution élégante** et obligatoire est de remonter la pseudo-classe au même niveau que l'enfant, en allongeant le sélecteur. Utilisez la syntaxe `&:hover &__element, &:hover > balise { ... }`. Cela permet de préserver la résolution correcte du parent BEM tout en ciblant les enfants au survol !

---

## Modèle Type (Template STRICT)

```scss
/*
=========================================================
📝 NATIVE HTML TEMPLATES (SEO Optimized)
=========================================================
Le composant est conçu pour s'appliquer sur des éléments sémantiques.
Enfants uniques inutiles proscrits.

Squelette attendu (Emmet) :
section.[ComponentName][.--modifierName]
 ├── div
 │    ├── h2
 │    └── p
 └── picture
      ├── source
      └── img
=========================================================
*/

/************************************************************/
/**************************FUNCTION**************************/
/************************************************************/
@function [ComponentName]($defaultValues: "") {
    @return ($defaultValues);
}

/******VARIABLES******/
$[ComponentName]: (
    bg-color: red,
    text-color: purple
);

/************************************************************/
/**************************PLACEHOLDER**************************/
/************************************************************/
%[ComponentName] {
    display: flex;
    // ... structures pures ...
    --template: "section.[ComponentName] > div > h2 + p";
    
    &__[ElementName] {
        font-weight: bold;
    }
}

/************************************************************/
/**************************MIXIN**************************/
/************************************************************/
@mixin [ComponentName]($paramMixi_: ()) {
    $paramMixi: [ComponentName](map-merge($[ComponentName], $paramMixi_));

    @extend %[ComponentName];
    background-color: map-get($paramMixi, bg-color);

    &__[ElementName],
    > div {
        @extend %[ComponentName]__[ElementName];
        color: map-get($paramMixi, text-color);
    }

    // Élégance SCSS: Rallonger le sélecteur pour éviter l'aberration `:hover__element`
    &:hover &__ElementName,
    &:hover > div {
        background-color: map-get($paramMixi, text-color);
    }

    // Modificateur autonome
    &.--modifierName {
        background-color: blue;
    }
}

/************************************************************/
/**************************NATIVE SEMANTIC MAPPING**************************/
/************************************************************/
section.[ComponentName] {
    @include [ComponentName]();

    > div {
        @extend %[ComponentName]__[ElementName];

        > h2 { /* styles h2 héritant du placeholder ou spécifiques */ }
        > p { /* styles p */ }
    }

    > picture {
        > source {}
        > img {}
    }
}
```
