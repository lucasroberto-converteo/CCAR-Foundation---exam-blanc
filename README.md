# Examen blanc · Claude Certified Architect

Examen blanc de 60 questions (4 scénarios × 15) pour préparer la certification Claude Certified Architect.

**Lancer l'examen :** https://lucasroberto-converteo.github.io/CCAR-Foundation---exam-blanc/

## Fonctionnement

- Sidebar avec les 60 questions, regroupées par scénario ; une question répondue y apparaît en couleur, et on peut revenir dessus à tout moment.
- Les réponses A–D sont mélangées à chaque nouvel examen ; aucune correction n'est affichée avant la soumission.
- Chrono de 120 minutes, non bloquant : il passe en négatif une fois le temps écoulé. Un clic dessus le met en pause.
- Bouton « Soumettre l'examen » sur la question 60, avec confirmation s'il reste des questions sans réponse.
- Résultats : score, pourcentage, verdict (seuil 72 %), temps passé, score par scénario et correction détaillée avec explications.
- La progression est sauvegardée dans le navigateur (localStorage) : un rafraîchissement ne fait rien perdre.
- Raccourcis clavier : 1–4 (ou A–D) pour répondre, ← → pour naviguer.

## En local

Aucune dépendance : ouvrir `index.html` dans un navigateur.

## Source des questions

[paullarionov/claude-certified-architect](https://github.com/paullarionov/claude-certified-architect/blob/main/guide_en.MD). Le fichier `questions.js` contient les questions, la bonne réponse et l'explication de chacune.
