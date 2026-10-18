---
trigger: model_decision
description: "À appliquer pour toute page, contenu, modale ou navigation : sémantique HTML5, SEO local, données structurées, pattern lien-modale"
---

# SEO & sémantique

## HTML5

- Un seul `<h1>` par page, hiérarchie de titres sans saut.
- Repères : `<header>`, `<nav>`, `<main>`, `<section>` (avec titre), `<article>`, `<aside>`, `<footer>`, `<address>`.
- `lang` sur `<html>`, `alt` pertinent, liens explicites (pas de « cliquez ici »).

## Par page

- `<title>` unique (≤ 60 caractères) et `meta description` (≤ 155).
- `link rel="canonical"`, balises Open Graph et Twitter avec **image de partage** (indispensable : l'aperçu WhatsApp est souvent le premier contact).
- `@astrojs/sitemap`, `robots.txt`, `noindex` sur `/admin`, `/panier`, `/_catalogue`.

## SEO local

- JSON-LD **`LocalBusiness`** avec le sous-type le plus précis (`HairSalon`, `BeautySalon`, `Restaurant`…) : nom, adresse, géo, téléphone, horaires, prix, image.
- `Service` / `Product` + `Offer` (prix en XOF ou devise du client) sur les pages de détail, `BreadcrumbList` sur les pages profondes.
- Nom, adresse et téléphone **identiques** au site, au footer et à la fiche Google Business Profile.
- Ville et quartier présents naturellement dans le titre, le H1 et le texte.

## Pattern lien-modale (contenu compact ET indexable)

> Le schéma `#!` / `_escaped_fragment_` (2009) est abandonné par Google depuis 2015 et n'est plus pris en charge depuis 2018. Les fragments `#…` ne sont pas indexés comme des pages distinctes. **Ne pas l'utiliser.**

À la place :

1. Chaque élément détaillé (prestation, produit) a une **vraie page prérendue** : `/prestations/<id>/`.
2. Dans les listes, l'élément est un **vrai lien** `<a href="/prestations/<id>/">`.
3. En amélioration progressive, le JS intercepte le clic, ouvre un `<dialog>` avec le contenu et met à jour l'URL (`history.pushState`) ; la fermeture revient à l'URL précédente.
4. Accès direct, robot d'indexation ou JS désactivé → la page complète s'affiche.

Résultat : interface compacte pour l'utilisateur, une URL indexable par contenu pour Google.
