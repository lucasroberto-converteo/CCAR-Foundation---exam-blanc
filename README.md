# Examen blanc · Claude Certified Architect

Deux examens blancs pour préparer la certification Claude Certified Architect, au choix depuis la page d'accueil :

| Examen | Questions | Organisation | Source |
|---|---|---|---|
| Examen 1 · Practice Test | 60 | 4 scénarios × 15 | [paullarionov/claude-certified-architect](https://github.com/paullarionov/claude-certified-architect/blob/main/guide_en.MD) |
| Examen 2 · Foundations | 77 | 5 domaines | [OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam](https://github.com/OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam) |

**Lancer l'examen :** https://lucasroberto-converteo.github.io/CCAR-Foundation---exam-blanc/

## Fonctionnement

- Sidebar avec toutes les questions, regroupées par scénario ou par domaine ; une question répondue y apparaît en couleur, et on peut revenir dessus à tout moment.
- Les réponses A–D sont mélangées à chaque nouvel examen ; aucune correction n'est affichée avant la soumission.
- Chrono de 120 minutes, non bloquant : il passe en négatif une fois le temps écoulé. Un clic dessus le met en pause.
- Bouton « Soumettre l'examen » sur la dernière question, avec confirmation s'il reste des questions sans réponse.
- Résultats : score, pourcentage, verdict (seuil 72 %), temps passé, score par scénario ou domaine et correction détaillée avec explications (les lettres citées dans les explications suivent l'ordre mélangé affiché).
- La progression de chaque examen est sauvegardée séparément dans le navigateur (localStorage) : un rafraîchissement ne fait rien perdre.
- Raccourcis clavier : 1–4 (ou A–D) pour répondre, ← → pour naviguer.

## En local

Aucune dépendance : ouvrir `index.html` dans un navigateur.

## Sources des questions

Les questions viennent des deux repos cités plus haut ; elles sont extraites dans `data/exam1.js` et `data/exam2.js` (question, options, bonne réponse, explication). Ce sont des examens communautaires, pas des contenus officiels d'Anthropic.
