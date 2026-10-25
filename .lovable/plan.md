## Nouvelle identité visuelle « sticker / pop » — étape 1 (page d'accueil)

Approche en bref : je définis une nouvelle palette et des styles dans le fichier de thème, limités pour l'instant à la page d'accueil pour ne rien changer ailleurs. Verdana est une police déjà présente sur les ordinateurs, et j'ajoute Caveat (version fine) pour la touche manuscrite. La mascotte fraise est dessinée à la main en SVG.

### Ce qui change visuellement (accueil uniquement)
- Palette : bleu marine profond (#161B4D) en couleur dominante (texte, blocs pleins, pied de page), corail fraise (#EF5350) pour les boutons d'action, badges et mises en valeur, vert feuille (#4CAF50) en petites touches (puces, coches, petites icônes). Fond blanc cassé.
- Typographie : Verdana pour tout le texte (titres, paragraphes, boutons, menu). Caveat en poids léger, utilisé avec parcimonie : le petit badge du haut, les petits titres de section (« Pour qui », « FAQ »…) et la phrase signature de « Pourquoi travailler avec moi ».
- Boutons : en forme de pilule, bordure noire de 2px, ombre noire nette décalée de 4px (sans flou). Au survol, le bouton glisse vers son ombre (l'ombre se réduit), comme si on appuyait dessus.
- Cartes et badges : même bordure noire et même ombre, coins bien arrondis (cartes « Pour qui », cas d'usage, FAQ, étapes numérotées, articles du blog).
- Mascotte : fraise kawaii corail, pépins jaunes, couronne de feuilles vertes, grands yeux ronds noirs avec reflets blancs, petit sourire, contour noir façon sticker. Placée à côté du titre dans le haut de page (sur ordinateur, titre à gauche et fraise à droite ; sur mobile, fraise au-dessus du titre), avec une légère animation de flottement. Une petite fraise en clin d'œil près de l'appel à l'action final, sans plus.
- Aucun texte, aucune section ni aucun lien ne change.

### Détails techniques
- `src/styles.css` : nouveaux jetons (`--navy`, `--coral`, `--leaf`, `--ink`, `--shadow-pop`) déclarés dans une classe `.theme-pop` qui redéfinit aussi background/foreground/accent/muted/card ; elle est appliquée au conteneur racine de `index.tsx`. Les pages /audit et /contact gardent leur look actuel jusqu'à validation, puis il suffira de remonter ces valeurs dans `:root`.
- Ajout des utilitaires `@utility pop-btn`, `pop-card` (bordure 2px ink, `box-shadow: 4px 4px 0 var(--ink)`, survol en `translate(2px,2px)` + ombre 2px) et `font-script`.
- Polices : `--font-sans` passe à `Verdana, Geneva, "DejaVu Sans", sans-serif` dans le périmètre `.theme-pop` ; Caveat 400 chargé par `<link>` Google Fonts dans `__root.tsx` (aucune autre modification de ce fichier).
- Il n'existe pas encore de composants partagés `button`/`card` dans le projet : je crée `src/components/ui/pop-button.tsx` (variantes primary corail / navy / outline, utilisables en `Link` ou `a`) et `src/components/ui/pop-card.tsx`, utilisés sur l'accueil et réutilisables ensuite partout.
- Mascotte : `src/components/StrawberryMascot.tsx` (SVG inline, taille ajustable, `aria-hidden`), avec un clin d'œil aux yeux et au sourire du logo rond magenta.
- `LatestPosts.tsx` : seulement les classes des cartes et du bouton (style pop), pas la logique.
- Vérification : capture d'écran de l'accueil sur ordinateur et sur mobile.
