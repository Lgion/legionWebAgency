---
trigger: always_on
description: "Critères vérifiables à remplir avant de déclarer terminé un composant, une fonctionnalité ou un site client"
---

# Definition of Done

Ne jamais annoncer qu'une tâche est **terminée** sans avoir vérifié la checklist correspondante.
Si un point ne peut pas être vérifié, le dire explicitement.

## Composant

- [ ] Aucun texte, couleur ou image client en dur (props, slots, tokens).
- [ ] États gérés : normal, survol, focus visible, désactivé, chargement, erreur, vide.
- [ ] Accessible au clavier, `aria-*` pertinents, contrastes AA.
- [ ] Affichage correct de 360 px à 1440 px.
- [ ] `prefers-reduced-motion` respecté.
- [ ] `README.md` rédigé, entrée ajoutée dans `CATALOGUE.md`, visible dans `/_catalogue`.

## Fonctionnalité

- [ ] Build `site/` et `api/` sans erreur ni avertissement TypeScript.
- [ ] Aucune erreur dans la console du navigateur.
- [ ] Chaque appel réseau a un état de chargement (skeleton ou spinner) et un état d'erreur.
- [ ] Routes API protégées testées avec et sans le bon rôle (y compris en rôle simulé).
- [ ] `.env.example` à jour si une variable a été ajoutée.
- [ ] Testée dans le navigateur (parcours réel, pas seulement le code).

## Mise en ligne d'un site client

- [ ] Budget de `04-performance-chargement.md` respecté sur mobile (accueil + une page de détail).
- [ ] Titres, descriptions, Open Graph, canonical, sitemap, robots.txt en place.
- [ ] JSON-LD valide (test des résultats enrichis Google).
- [ ] Liens `tel:`, WhatsApp, email et itinéraire testés sur un vrai téléphone.
- [ ] Horaires et badge Ouvert / Fermé corrects (fuseau horaire du client).
- [ ] Paiement testé de bout en bout en mode test, puis clés de production configurées.
- [ ] Événements Plausible reçus.
- [ ] `PUBLIC_ROLE_SIMULATOR` et `ROLE_SIMULATOR` à `false` (sauf démo voulue).
- [ ] Mentions légales et politique de confidentialité publiées.
- [ ] Domaine, HTTPS et redirections OK.
- [ ] Compte admin du client créé, prise en main expliquée.
- [ ] Composants réutilisables rapatriés dans le boilerplate (`recolter-composant`).
