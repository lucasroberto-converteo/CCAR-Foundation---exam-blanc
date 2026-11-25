# Examen blanc · Claude Certified Architect

Huit examens blancs pour préparer la certification Claude Certified Architect, au choix depuis la page d'accueil :

| Examen | Questions | Organisation | Source |
|---|---|---|---|
| Examen 1 · Practice Test | 60 | 4 scénarios × 15 | [paullarionov/claude-certified-architect](https://github.com/paullarionov/claude-certified-architect/blob/main/guide_en.MD) |
| Examen 2 · Foundations | 77 | 5 domaines | [OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam](https://github.com/OlivierAlter/Claude-Certified-Architect-Foundations-Certification-Exam) |
| Utkarsh 1 à 6 | 6 × 60 | 6 scénarios (1, 4, 5, 6) ou tirage de 4 scénarios (2, 3) ; 4 à 6 en mode difficile ; 18 questions « Select TWO » au total | [utkarsh1agarwal/claude-architect-exam-guide](https://github.com/utkarsh1agarwal/claude-architect-exam-guide/tree/main/mock-exam) (MIT, voir `THIRD_PARTY_LICENSES.md`) |

**Lancer l'examen :** https://lucasroberto-converteo.github.io/CCAR-Foundation---exam-blanc/

## Fonctionnement

- Sidebar avec toutes les questions, regroupées par scénario ou par domaine ; une question répondue y apparaît en couleur, et on peut revenir dessus à tout moment.
- Les réponses A–D sont mélangées à chaque nouvel examen ; aucune correction n'est affichée avant la soumission.
- Questions à réponses multiples (« Select TWO ») : le nombre de réponses attendu est affiché, et le point n'est accordé que si toutes les bonnes réponses sont cochées.
- Chrono de 120 minutes, non bloquant : il passe en négatif une fois le temps écoulé. Un clic dessus le met en pause.
- Bouton « Soumettre l'examen » sur la dernière question, avec confirmation s'il reste des questions sans réponse.
- Résultats : score, pourcentage, verdict (seuil 72 %), temps passé, score par scénario, score par domaine (quand la source indique les domaines) et correction détaillée avec explications (les lettres citées dans les explications suivent l'ordre mélangé affiché).
- La progression de chaque examen est sauvegardée séparément dans le navigateur (localStorage) : un rafraîchissement ne fait rien perdre.
- Raccourcis clavier : 1–4 (ou A–D) pour répondre, ← → pour naviguer.

## En local

Aucune dépendance : ouvrir `index.html` dans un navigateur.

## Sources des questions

Les questions viennent des deux repos cités plus haut ; elles sont extraites dans `data/exam1.js`, `data/exam2.js` et `data/utkarsh1.js` à `data/utkarsh6.js` (question, options, bonne réponse, explication). Ce sont des examens communautaires, pas des contenus officiels d'Anthropic.
