## Vision

Landing page conversion-orientée en français pour une consultante en opérations IA & automatisation, basée sur la direction **Quiet luxury editorial** choisie : typographie serif Cormorant Garamond pour les titres, Inter pour le corps, JetBrains Mono pour les labels techniques. Ajustements demandés : **palette pastel sobre et unisexe** (bleu-vert sauge profond + crème chaud + touche pastel neutre, pas trop féminin) et **boutons aux bords arrondis** (rounded-full).

## Design tokens (src/styles.css)

```text
background : crème très clair  hsl(35 25% 97%)
foreground : ardoise profonde  hsl(215 28% 14%)
muted      : gris-bleuté       hsl(215 14% 46%)
accent     : sauge profond     hsl(170 22% 30%)   ← unisexe, sobre
accent-soft: sauge pastel      hsl(170 25% 88%)   ← surfaces douces
sand       : beige pastel      hsl(35 22% 92%)    ← sections alternées
border     : foreground/8
radius     : boutons → full ; cartes → 2xl (16px)
```

Polices chargées via `<link>` dans `src/routes/__root.tsx` (pas d'@import dans le CSS).

## Structure des fichiers

```text
src/routes/index.tsx          → page assemblée (sections importées)
src/routes/__root.tsx         → <link> fonts + meta SEO de base
src/styles.css                → tokens @theme + keyframe revealUp
src/components/landing/
  ├─ SiteNav.tsx              → nav sticky avec logo serif + CTA discret
  ├─ Hero.tsx                 → badge mono + H1 serif + sous-titre + CTA arrondi + 4 réassurances
  ├─ Problem.tsx              → section sombre, liste 01-05 + conclusion italique
  ├─ Solution.tsx             → titre + texte + grille 2 colonnes des 10 exemples (puces sauge)
  ├─ Process.tsx              → 4 étapes numérotées sur fond sand
  ├─ UseCases.tsx             → 4 cartes (Production / Admin / Client / Data) — rounded-2xl
  ├─ WhyMe.tsx                → bloc texte éditorial, accent italique
  ├─ FinalCTA.tsx             → CTA centré, bouton accent arrondi
  ├─ FAQ.tsx                  → 5 questions <details> avec réponses rédigées
  └─ SiteFooter.tsx           → logo + positionnement + ©
```

## Contenu

- Tout le copy français du brief est utilisé **mot pour mot** dans les sections Hero, Problème, Solution, Process, Cas d'usage, Pourquoi, CTA final, FAQ, Footer.
- Les 5 questions FAQ reçoivent des réponses courtes rédigées (le brief ne les fournit pas).
- Nom de marque placeholder : "Studio Opéra." (modifiable en un endroit).

## Décisions de design

- **Boutons** : `rounded-full`, padding généreux (px-8 py-4), fond `accent` pour le CTA final, fond `foreground` pour le CTA hero (contraste hiérarchique), états hover discrets (opacity).
- **Cartes** : `rounded-2xl`, ring 1px border, hover ring accent/30, intérieur blanc cassé sur fond background.
- **Section problème** : reste sur fond `foreground` (sombre) pour la respiration éditoriale — contraste cinématographique avec le reste pastel.
- **Section process** : fond `sand` pastel (au lieu de stone-100 générique).
- **Pas d'images générées** : la direction est purement typographique, aucun `data-lov-image-placeholder` dans le prototype choisi.
- **Animations** : keyframe `revealUp` discrète sur le hero uniquement (comme dans le prototype).
- **Responsive** : mobile-first, layout déjà cadré max-w-2xl centré ; grille 2 colonnes sur md+ pour Solution et Use Cases.

## SEO

`__root.tsx` head() : `<html lang="fr">`, title "Studio Opéra — Opérations & automatisation pour coachs et consultants", meta description orientée bénéfice (<160 car), viewport responsive, og:title/og:description cohérents.

## Hors scope (peut être ajouté plus tard)

- Formulaire d'audit fonctionnel (les boutons pointent pour l'instant vers un `mailto:` ou ancre `#audit`).
- Backend / Lovable Cloud.
- Page de remerciement post-soumission.
