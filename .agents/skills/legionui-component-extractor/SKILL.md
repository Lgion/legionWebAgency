---
name: legionui-component-extractor
description: Permet d'extraire n'importe quel composant de LegionUI à partir d'un snippet HTML ou d'une URL de page web, selon notre arborescence modulaire pure BEM, sans aucune classe bootstrap ou design dans le JSX, et supportant à la fois les structures de listes et d'instances uniques.
version: 3.0.0
author: Antigravity
tags:
  - react
  - scss
  - bem
  - legionui
  - extraction
  - wysiwyg
  - pure-semantic
---

# LegionUI Component Extractor Skill (v3.0.0)

## Overview
Cette compétence décrit la méthodologie stricte pour extraire et modéliser un composant d'interface utilisateur à partir d'une source HTML brute (maquette locale ou page en ligne) et l'intégrer au sein de l'écosystème de **LegionUI**.

Chaque composant LegionUI extrait doit être hautement dynamique, optimisé pour le SEO, compatible avec notre éditeur WYSIWYG en temps réel, et parfaitement découplé grâce à notre architecture de **générateurs par modificateurs**.

---

## 💎 Règles Fondamentales & Standards de Code (CRITIQUES)

### 🚫 Règle n°1 : Pureté BEM Absolue & Zéro Bootstrap dans le JSX
* **Aucune classe bootstrap** (`row`, `col-*`, `d-flex`, `align-items-center`, `justify-content-center`, `accordion-header`, etc.) **ne doit apparaître dans le JSX** (ni dans le composant principal, ni dans les helpers de template).
* **Aucune classe utilitaire ou de design brute** (comme `bg_cover`, `single_slider`, `btn-primary`) n'est autorisée dans le JSX.
* **Le JSX ne doit porter que des classes BEM pures** basées sur le nom du bloc et de ses modificateurs (ex: `cards__item`, `accordion__button`, `accordion__body`, `--collapsed`, `--open`, `--wedding`).
* **Délégation totale au SCSS** : Toutes les grilles, flexbox, alignements, styles d'arborescence et intégrations tierces (comme Bootstrap) doivent être **mappés et étendus exclusivement dans les fichiers SCSS** à l'aide de `@extend .nomDeClasse !optional` (ex: `@extend .row !optional`, `@extend .col-md-6 !optional`, `@extend .accordion-header !optional`).

### 🚫 Règle n°2 : Aplatissement DOM & Pseudo-Éléments pour l'Arrière-Plan
* **Proscrire absolument l'imbrication de balises enfants uniques** et les cascades de `div` génériques de mise en page.
* **Les images de fond et overlays** ne doivent pas utiliser de wrapper `div` dédié dans le JSX.
* **Méthodologie du Pseudo-Élément** :
  1. Le composant JSX applique la balise sémantique racine (ex: `<section>`) avec un attribut `style` portant une variable CSS personnalisée alimentée par le state : `style={{ '--bg-image': \`url(${imageUrl})\`, backgroundImage: \`url(${imageUrl})\` }}`.
  2. Le fichier SCSS associe l'image de fond et son overlay semi-transparent directement sur le pseudo-élément `::before` de la racine à l'aide de la variable CSS : `background-image: var(--bg-image);`.
  3. Les textes enfants directs se voient appliquer `position: relative` et un `z-index: 2` (ou supérieur) pour s'afficher proprement au-dessus.

### 🚫 Règle n°3 : Mappage Mixte Dynamique Agnostique SCSS (Parent `#{$block}`)
* **Interdiction absolue de coder en dur** des noms de classe statiques combinés au nom du bloc (ex: `.cta__content` ou `.cta__shape`) à l'intérieur des mixins SCSS réutilisables.
* **Obligation d'utiliser le mappage dynamique** : Couplez systématiquement la descendance directe sémantique (`>`) avec la variable dynamique `#{$block}` (ex: `>div, >#{$block}__content`, `>h2, >#{$block}__title`, `>a, >#{$block}__btn`, `>div, >#{$block}__shape`).
* Cela garantit que la mixin est 100% découplée, réutilisable pour d'autres blocs et immune aux renommages.
* **Maîtrise des pseudo-classes** : Allongez le sélecteur au lieu d'imbriquer l'élément sous un survol (ex: `&:hover >div, &:hover >#{$block}__btn` au lieu d'imbriquer sous `&:hover`).


---

## 📂 Architecture de Dossiers & Cas de Figure d'Extraction

> [!IMPORTANT]
> ⚠️ **ÉVALUATION SYSTÉMATIQUE DU CAS (Anti-Confusion Cas A vs Cas B)** :
> Avant de rédiger tout plan d'implémentation ou de coder, vous devez **obligatoirement** inspecter le dossier `src/components` pour vérifier si un composant gérant le même concept fonctionnel existe déjà.
> * **Si le composant existe déjà** (ex: `Hero`, `Cta`, `Cards`, `Accordion`, `Timeline`), vous **devez appliquer le CAS A** (Enrichissement via modificateur). La création d'un nouveau composant doublon est strictement interdite.
> * **Si et seulement si aucun composant similaire n'existe**, vous pouvez appliquer le **CAS B** (Nouveau Composant).
> * **Justification obligatoire dans l'Audit** : Votre plan d'implémentation initial doit explicitement commencer par cette ligne de garde-fou : *"Vérification du dossier `src/components` : Le composant [Nom] [existe / n'existe pas]. Nous appliquons donc le CAS [A / B] pour enrichir / créer."*

### CAS A : Le composant existe déjà dans `/src/components`
Si un composant portant le même concept s'y trouve (ex: `Accordion` ou `Cards`), vous devez **enrichir** le composant existant avec un nouveau modificateur (`--modifierName`).
1. **Dossier existant préservé** : Ne créez pas de nouveau dossier.
2. **Règle d'or des Helpers (Réutilisation & Extension)** : 
   - **Réutilisation** : Avant de créer un helper, vérifiez si un helper existant dans `/src/helpers/` (ex: `imgSection0`, `h5H2SpanP0`) convient déjà parfaitement.
   - **Extension Incrémentale** : Si un helper existant est très proche mais présente une légère variante sémantique ou structurelle, **étendez la bibliothèque de helpers** en créant un nouveau helper générique avec un suffixe incrémentiel (ex: si `divSection0.js` existe et que vous avez besoin d'une variante proche, créez `divSection1.js`).
   - **Création spécifique** : Ne créez un helper dédié de type `[modifierName][ComponentName]Section0.js` que si le besoin sémantique et la structure de l'item sont totalement uniques et non généralisables.
3. **Liaison JS** : Créer `src/components/[ComponentName]/js/[modifierName].js` qui importe le helper choisi.
4. **Mixin SCSS** : Créer `src/components/[ComponentName]/scss/_[modifierName].scss`.
5. **Routeur SCSS** : Importer et inclure la mixin dans `src/components/[ComponentName]/index.scss` sous la classe `&.--[modifierName]`.
6. **Mise à jour React** : Modifier `index.jsx` pour importer la liaison JS et l'ajouter dans `MODIFIER_CONFIG`.

### CAS B : Le composant n'existe pas encore (Nouveau Composant)
Si le composant n'existe pas encore (ex: `Timeline`), vous devez le créer de toutes pièces dans un nouveau dossier portant son nom, en y implémentant **deux versions** (le modificateur `--default` et le modificateur spécifique `--[modifierName]`).

Selon la nature structurelle du composant, vous devez choisir l'un des deux patterns de données suivants :

---

## 🏗️ PATTERN 1 : Composant Multi-Items / Liste (ex: Accordion, Cards, Timeline)
Utilisé lorsque le composant affiche un ensemble répétitif d'items ou de cartes sous forme de tableau.

* **Données** : `DATACOMPONENTKEY = "items"` (Contient un tableau d'objets `items: [ { ... } ]`).
* **Rendu** : Repose sur `WrapperList`.
* **Éditeur** : Utilise le parseur global standard **`createWysiwygFn`**.

### Structure Type `index.jsx` (Multi-Items) :
```javascript
import React from 'react';
import { WrapperList } from "../../wrappers";
import { createWysiwygFn } from "../../utils/wysiwyg";
import { default__[componentName] } from "./js/default";
import { [modifierName]__[componentName] } from "./js/[modifierName]";
import "./index.scss";

const DATAKEY = "[stateKeyName]";                  
const DATACOMPONENTKEY = "items";                  
const _data = {
  id: "[componentName]Example",
  className: "",
  items: [ /* Données de secours */ ],
  modifier: "default"
};

const MODIFIER_CONFIG = {
  "default": default__[componentName],
  "[modifierName]": [modifierName]__[componentName]
};

const [ComponentName] = ({ _, children, $ = _data, editorProps }) => {
  $ = editorProps?.$?.[editorProps?.dataMain]?.[DATAKEY] || $;
  const { id, className, items, modifier = "default", schemaOrg: appSchemaOrg } = $ || _ || children || {};

  const generator = MODIFIER_CONFIG[modifier] || MODIFIER_CONFIG["default"];
  const [templateFn, schemaOrgFn, targetData, itemSelector, modifierWysiwygFn] = generator;

  if (editorProps) {
    editorProps.dataKey = DATAKEY;
    editorProps.dataComponentKey = DATACOMPONENTKEY;
    editorProps.fn = createWysiwygFn(id, itemSelector, targetData, null, modifierWysiwygFn);
  }

  const renderedItems = items ? items.map((item, i) => templateFn(item, i)) : [];

  let schemaOrg = schemaOrgFn ? schemaOrgFn({ items }) : null;
  if (appSchemaOrg && schemaOrg) {
    schemaOrg = { ...schemaOrg, ...appSchemaOrg };
  }

  return (
    <WrapperList
      $={{
        id,
        className: `${editorProps?.dataKey || DATAKEY} --${modifier} ${className || ''}`,
        elm: "div",
        subElm: itemSelector,
        subElmCn: `${DATAKEY}__item`,
        items: renderedItems,
        editorProps,
        schemaOrg
      }}
    />
  );
};

export default [ComponentName];
```

---

## 🏗️ PATTERN 2 : Composant Instance Unique / Objet Plat (ex: Hero, Banner, Alert)
Utilisé lorsque le composant est un élément unique sur la page, sans boucle de tableau.

* **Données** : `DATACOMPONENTKEY = "item"` (Contient un unique objet plat `item: { subtitle: "...", title: "..." }`).
* **Rendu** : Repose sur un **unique `WrapperRaw` sémantique** (souvent `<section>`). Les éléments textuels enfants sont placés directement dedans, sans div intermédiaire.
* **Éditeur** : Utilise le parseur réutilisable **`createSingleWysiwygFn`** (qui fallback sur le root element si `itemSelector` vaut `""`).

### Structure Type `index.jsx` (Instance Unique) :
```javascript
import React from 'react';
import { WrapperRaw } from "../../wrappers";
import { createSingleWysiwygFn } from "../../utils/wysiwyg";
import { default__[componentName] } from "./js/default";
import { [modifierName]__[componentName] } from "./js/[modifierName]";
import "./index.scss";

const DATAKEY = "[stateKeyName]";                  
const DATACOMPONENTKEY = "item";                  
const _data = {
  id: "[componentName]Example",
  className: "",
  item: { /* Données de secours uniques */ },
  modifier: "default"
};

const MODIFIER_CONFIG = {
  "default": default__[componentName],
  "[modifierName]": [modifierName]__[componentName]
};

// Enrichissement WYSIWYG optionnel propre au composant (ex: extraire l'image de fond)
const [componentName]WysiwygFn = (data, domNode) => {
  if (domNode) {
    const bgVal = domNode.style.getPropertyValue('--bg-image') || domNode.style.backgroundImage;
    if (bgVal) {
      data.imageUrl = bgVal.replace(/^url\(["']?/, '').replace(/["']?\)$/, '').trim();
    }
  }
  return data;
};

const [ComponentName] = ({ _, children, $ = _data, editorProps }) => {
  $ = editorProps?.$?.[editorProps?.dataMain]?.[DATAKEY] || $;
  const { id, className, item, modifier = "default", schemaOrg: appSchemaOrg } = $ || _ || children || {};

  const generator = MODIFIER_CONFIG[modifier] || MODIFIER_CONFIG["default"];
  const [templateFn, schemaOrgFn, targetData, itemSelector, modifierWysiwygFn] = generator;

  if (editorProps) {
    editorProps.dataKey = DATAKEY;
    editorProps.dataComponentKey = DATACOMPONENTKEY;
    // Appel à createSingleWysiwygFn
    editorProps.fn = createSingleWysiwygFn(id, itemSelector, targetData, [componentName]WysiwygFn, modifierWysiwygFn);
  }

  let schemaOrg = schemaOrgFn ? schemaOrgFn({ item }) : null;
  if (appSchemaOrg && schemaOrg) {
    schemaOrg = { ...schemaOrg, ...appSchemaOrg };
  }

  const bgUrl = item?.imageUrl || item?.image || "";
  const bgStyle = bgUrl ? (bgUrl.startsWith('url') ? bgUrl : `url(${bgUrl})`) : "";

  return (
    <WrapperRaw 
      $={{ 
        id, 
        className: `${DATAKEY} --${modifier} ${className || ''}`, 
        elm: "section", 
        editorProps,
        schemaOrg,
        props: { 
          style: bgStyle ? { '--bg-image': bgStyle, backgroundImage: bgStyle } : {} 
        }
      }}
    >
      {item && templateFn(item, 0)}
    </WrapperRaw>
  );
};

export default [ComponentName];
```

---

## 🛠️ Méthodologie d'Extraction en 6 Étapes

### Étape 0 : Audit Préliminaire et Choix de l'Utilisateur
1. **Ne commencez jamais à coder directement.**
2. **Analyser le document entier** pour repérer tous les composants distincts éligibles à l'extraction.
3. **Dresser un inventaire clair** exposant :
   - Le nom proposé pour le composant (ex: `hero`, `cards`, `timeline`).
   - Le type de pattern requis (Pattern 1 Multi-Items ou Pattern 2 Instance Unique).
   - Une courte description de son rôle visuel et de ses données éditables.
4. **Demander explicitement à l'utilisateur** de choisir le composant qu'il souhaite extraire avant de démarrer.
5. **Remontée de Cascade CSS systématique** : Avant de coder, ouvrez le fichier de styles général de la maquette d'origine (ex: `style.css` ou `_general.scss`) et inspectez les propriétés héritées non explicites sur la section (ex: polices calligraphiques appliquées sur les balises de titres globaux `h1-h6`, tailles et opacités réelles des formes d'arrière-plan, transitions et bordures réelles des boutons). Ces styles indispensables doivent être portés fidèlement comme variables locales dans `$index`.


### Étape 1 : Création du Helper de Rendu (`helpers/`)
Créer un helper plat sous la nomenclature stricte `[nomBalisesRacineSémantiques][Index].js` (ex: `headerP0.js` pour une structure retournant un fragment composé d'un `<header>` puis d'un `<p>`).
* **Sémantique HTML5 stricte et Fragment React** : Le `WrapperList` ou `WrapperRaw` génère déjà la boîte englobante de l'item (ex: `.cards__item`). Pour éviter tout double conteneur inutile (effet oignon), la fonction `templateFn` du helper doit retourner un Fragment React (`<React.Fragment>`).
* **Nomenclature univoque** : Le nom du fichier helper et de la fonction exportée doit correspondre très précisément aux balises sémantiques enfants directes sous le Fragment (ex: `headerP0.js`).
* L'option `itemSelector` doit être définie à `""` (chaîne vide) pour les composants à instance unique afin que le parseur cible directement l'élément racine.


### Étape 2 : Création de la Liaison JS (`components/[Name]/js/`)
Déclarer la liaison JS en important le helper et en l'exportant sous la forme :
```javascript
import { headerP0 } from '../../../helpers';
export const [modifierName]__[componentName] = headerP0();
```

### Étape 3 : Création du Fichier de Mixin SCSS (`components/[Name]/scss/`)
Définir les styles à plat sous forme de placeholders `%` et de mixins BEM en appliquant des `@extend` pour toutes les classes d'alignement ou de grilles tierces (ex: `@extend .col-md-6 !optional`).
* **Règle de Ciblage Étanche des Sélecteurs** : Pour éviter que des styles de tags génériques (`div`, `p`, `span`, `img`) ne se propagent accidentellement sur des éléments profondément imbriqués (ex: un `div` auteur imbriqué dans un `div` en-tête) :
  1. Utilisez systématiquement le **combinateur d'enfant direct (`>`)** lorsque vous ciblez des tags nus au sein d'une structure (ex : `> div`, `> p`, `> span`, `> img`).
  2. Réservez les classes BEM explicites (`#{$block}__element`) pour les conteneurs structurels majeurs afin de garantir l'isolation étanche du composant tout en restant flexible.
* Si le composant a un fond ou un overlay, utiliser le pseudo-élément `::before` avec la variable CSS `var(--bg-image)`.


### Étape 4 : Le Contrôleur React Agnostique (`components/[Name]/index.jsx`)
Générer le fichier principal en respectant rigoureusement les structures standardisées BEM (Pattern 1 ou Pattern 2) et en proscrivant les classes Bootstrap dans le code React.

### Étape 5 : Routeur SCSS & Raccordement Global
1. Configurer `components/[Name]/index.scss` pour importer et inclure les mixins.
2. Ajouter le fichier SCSS dans `src/components/index.scss`.
3. Exporter le composant dans `src/importComponents.js`.
4. Raccorder le state initial et le composant dans `src/App.js` pour valider la compilation.
