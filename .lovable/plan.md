# Plan — Élargir Jetassiste à plusieurs secteurs

## Accueil
- Conserver strictement la direction visuelle actuelle et remplacer uniquement les textes demandés dans le hero, la section « Pourquoi travailler avec moi » et le pied de page.
- Ajouter « Pour qui » en premier dans la navigation, puis insérer la nouvelle section `pour-qui` entre le constat et la solution.
- Présenter les sept secteurs dans une grille responsive non cliquable, avec une huitième carte accentuée menant vers l’audit.
- Mettre à jour les descriptions SEO demandées sur l’accueil et à la racine, sans modifier la section blog.

## Audit
- Ajouter les huit secteurs au formulaire, avec préselection sûre depuis `?secteur=...` lorsqu’une valeur reconnue est fournie.
- Exiger le secteur à l’étape 2, ajuster les deux libellés et le placeholder, puis compléter les listes de tâches et d’outils.
- Valider `sector` côté serveur et ajouter son libellé lisible dans l’e-mail juste avant le métier, sans toucher au destinataire, à l’expéditeur, à Calendly ou au reste de l’envoi.
- Ajouter la description sociale demandée à la page d’audit.

## Vérification
- Vérifier la compilation et les erreurs d’exécution.
- Tester dans le navigateur la grille responsive, l’ancre « Pour qui », la préselection par URL, la validation de l’étape 2 et le parcours complet du formulaire jusqu’à l’envoi et l’écran Calendly.

## Détails techniques
- Les valeurs de secteur resteront strictement limitées aux huit identifiants fournis, dans la validation URL, l’état du formulaire et le schéma serveur.
- Aucun changement ne sera apporté aux couleurs, polices, composants visuels existants, au lien Calendly, à Resend ou à la récupération WordPress.
