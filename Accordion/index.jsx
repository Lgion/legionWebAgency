import React, { useState } from 'react';
import { WrapperList } from "../../wrappers";
import { createWysiwygFn } from "../../utils/wysiwyg";
import { default__accordion, _data as defaultData } from "./js/default";
import { chrome__accordion, _data as chromeData } from "./js/chrome";

const DATAKEY = "accordion"
const DATACOMPONENTKEY = "items"

const MODIFIER_DEFAULTS = {
  "default": defaultData,
  "chrome": chromeData
};

const _data = {
  id: "accordionExample",
  modifier: "default",
  ...MODIFIER_DEFAULTS.default
};

// Dictionnaire associatif : relier le --modifier au générateur déjà configuré
const MODIFIER_CONFIG = {
  "default": default__accordion,
  "chrome": chrome__accordion
};

// Enrichissement WYSIWYG spécifique au composant Accordion (optionnel)
// Reformate les données link extraites pour les regrouper dans un objet { link: { label, url } }
const accordionWysiwygFn = (data, domNode) => {
  if (data.linkLabel && data.linkUrl) {
    data.link = { label: data.linkLabel, url: data.linkUrl };
    delete data.linkLabel;
    delete data.linkUrl;
  }
  return data;
};

export default ({ _, children, $ = _data, editorProps }) => {
  // Résolution dynamique du state global fusionné avec les valeurs par défaut spécifiques au modificateur
  const globalData = editorProps?.$?.[editorProps?.dataMain]?.[DATAKEY] || {};
  const activeModifier = globalData.modifier || $?.modifier || "default";
  const modifierDefault = MODIFIER_DEFAULTS[activeModifier] || MODIFIER_DEFAULTS.default;

  $ = {
    id: globalData.id || $?.id || "accordionExample",
    modifier: activeModifier,
    ...modifierDefault,
    ...globalData,
    items: globalData.items || modifierDefault.items
  };
  const { id, className, items, modifier = "default", schemaOrg: appSchemaOrg } = $ || _ || children || {};
  const [openItems, setOpenItems] = useState([0]);

  // 1. Résolution du générateur pré-configuré selon le tableau associatif
  const generator = MODIFIER_CONFIG[modifier] || MODIFIER_CONFIG["default"];
  const [templateFn, schemaOrgFn, targetData, itemSelector, modifierWysiwygFn] = generator;

  // 2. Pipeline WYSIWYG automatisé (commun → composant → modifier)
  const localEditorProps = editorProps ? {
    ...editorProps,
    dataKey: DATAKEY,
    dataComponentKey: DATACOMPONENTKEY,
    targetData,
    fn: createWysiwygFn(id, itemSelector, targetData, accordionWysiwygFn, modifierWysiwygFn)
  } : null;

  // 3. SEO et Schema.org (fusion des données par défaut avec les données de l'app si fournies)
  let schemaOrg = schemaOrgFn ? schemaOrgFn(items) : null;
  if (appSchemaOrg && schemaOrg) {
    schemaOrg = { ...schemaOrg, ...appSchemaOrg };
  }

  const templateOptions = {
    id,
    openItems,
    setOpenItems,
    toggleItem: (index, setOpen) => {
      setOpen(prevOpenItems => {
        if (prevOpenItems.includes(index)) {
          return prevOpenItems.filter(i => i !== index);
        } else {
          return [...prevOpenItems, index];
        }
      });
    }
  };

  const accordionItems = items ? items.map((item, index) => templateFn(item, index, templateOptions)) : [];

  return (
    <WrapperList
      $={{
        id,
        className: `${localEditorProps?.dataKey || DATAKEY} --${modifier} ${className || ''}`,
        items: accordionItems,
        editorProps: localEditorProps,
        subElm: itemSelector,
        schemaOrg
      }}
    />
  );
};
