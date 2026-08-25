# CV en ligne — Guide de personnalisation & de déploiement

Site statique (HTML / CSS / JS), sans framework ni étape de build : vous pouvez
le déployer tel quel sur **GitHub Pages**, gratuitement.

## ⚠️ À savoir sur le « back » du site

GitHub Pages n'héberge que des fichiers statiques : il ne peut pas exécuter de
code serveur (PHP, Node, base de données…). Le seul endroit où un « back » a
du sens ici est le **formulaire de contact**, qui doit envoyer les messages
quelque part. Ce site est câblé pour utiliser **Formspree**, un service gratuit
qui reçoit les données du formulaire et vous les transfère par e-mail — sans
que vous ayez à écrire ou héberger de serveur. C'est l'approche standard pour
ce type de site.

## 1. Personnaliser le contenu

Ouvrez `index.html` (et éventuellement `css/style.css`) dans un éditeur de
texte (VS Code recommandé). Tous les éléments à remplacer sont :

- **entourés d'un pointillé orange** dans le navigateur (classe `todo`),
- accompagnés d'un commentaire `<!-- ✏️ ... -->` ou d'un attribut
  `data-todo="..."` qui décrit ce qu'il faut y mettre.

Remplacez le texte, supprimez la classe `todo` de l'élément une fois fait
(elle n'a aucun effet sur le fonctionnement, seulement sur l'affichage du
pointillé), puis supprimez le bandeau orange en haut de page (bloc
`<div class="edit-banner">` dans `index.html`) avant publication.

### Éléments à remplacer, section par section
| Section | Ce qu'il faut faire |
|---|---|
| `<head>` | Titre de l'onglet et description (2 lignes en haut du fichier) |
| Cartouche (hero + pied de page) | Nom, fonction, établissement, ville, date |
| Hero | Nom, intitulé de poste, phrase d'accroche, liens LinkedIn / GitHub / e-mail |
| Photo | Voir section **2. Ajouter votre photo** ci-dessous |
| À propos | Paragraphe de présentation, niveaux enseignés, langues |
| Compétences | Intitulés et niveaux (barres en `%`), tags libres |
| Parcours | Postes, dates, établissements, missions — dupliquez un bloc `trace__node` pour ajouter une ligne |
| Projets pédagogiques | Titre, description, tags, lien — dupliquez un bloc `<article class="card">` pour ajouter un projet |
| Projets personnels | Titre, description, tags, lien — ajoutez les projets personnels dans la section `#projets-personnels` |
| Contact | E-mail, téléphone, ville + configuration Formspree (étape 3) |

## 2. Projets disponibles

La section **Projets pédagogiques** présente actuellement :

- **PRJ-01 — Projet interdisciplinaire « Le Petit Prince »** : page HTML et téléchargement du jeu Scratch au format `.mblock`.
- **PRJ-02 — Éclairage solaire autonome** : galerie des photos du projet, ouverte dans un nouvel onglet.
- **PRJ-03 — Semaine de sensibilisation à l'IA** : carte à compléter avec le lien du projet.

La section **Projets personnels** contient :

- **PRJ-PERSO-01 — Banque d'appréciations** : application web disponible dans `Projet_appréciation/appreciation.html`.

Les liens des projets qui disposent d'une page dédiée s'ouvrent dans un nouvel onglet avec `target="_blank"` et `rel="noopener"`.

### Galerie du projet panneau solaire

La page `projet-panneau-solaire.html` affiche les photos du dossier `IMG/Projet panneau solaire/` sous forme de carrousel. Pour ajouter une photo, placez un fichier `.jpg` dans ce dossier et ajoutez son nom dans le tableau `photos` de la page.

## 3. Ajouter votre photo et votre CV en PDF

1. Placez votre photo (idéalement carrée, ≥ 500×500 px) dans
   `assets/images/photo.jpg`. Si le fichier est absent, le site affiche
   automatiquement un cadre "à remplacer" plutôt qu'une image cassée.
2. Placez votre CV au format PDF dans le dossier `PDF/`. Le CV actuellement
   utilisé par les boutons de téléchargement est `PDF/CV_RAZANAJATOVO_A_Toavina.pdf`.

## 4. Rendre le formulaire de contact fonctionnel (Formspree)

1. Créez un compte gratuit sur [formspree.io](https://formspree.io).
2. Créez un nouveau formulaire ("New Form"), donnez-lui votre adresse e-mail.
3. Formspree vous donne une URL du type
   `https://formspree.io/f/abcd1234`.
4. Dans `index.html`, remplacez :
   ```html
   <form class="contact-form" id="contactForm" action="https://formspree.io/f/VOTRE_ID_FORMSPREE" method="POST">
   ```
   par votre propre URL.
5. Testez le formulaire une fois le site en ligne : Formspree demande de
   confirmer le premier envoi par e-mail.

*Alternative sans Formspree* : laissez simplement les liens `mailto:` de la
section Contact — les visiteurs pourront vous écrire directement depuis leur
messagerie, sans configuration supplémentaire.

## 5. Aperçu en local

Aucune installation nécessaire : ouvrez simplement `index.html` dans votre
navigateur. Pour un rendu identique à celui en ligne (recommandé), lancez un
petit serveur local :

```bash
# Avec Python (déjà présent sur la plupart des systèmes)
python3 -m http.server 8000
# puis ouvrez http://localhost:8000
```

## 6. Déployer sur GitHub Pages

1. Créez un nouveau dépôt GitHub, par exemple `mon-cv`.
2. Poussez tous les fichiers de ce dossier à la racine du dépôt :
   ```bash
   git init
   git add .
   git commit -m "Site CV"
   git branch -M main
   git remote add origin https://github.com/VOTRE_PSEUDO/mon-cv.git
   git push -u origin main
   ```
3. Sur GitHub, allez dans **Settings → Pages**.
4. Sous "Build and deployment", choisissez **Source : Deploy from a branch**,
   branche **main**, dossier **/ (root)**, puis **Save**.
5. Après 1 à 2 minutes, votre site est en ligne à l'adresse :
   `https://VOTRE_PSEUDO.github.io/mon-cv/`

*Astuce* : si vous nommez le dépôt `VOTRE_PSEUDO.github.io`, le site sera
disponible directement à la racine de ce domaine, sans `/mon-cv/` à la fin.

## Structure du projet

```
portfolio-cv/
├── index.html                                      → contenu du CV et des projets
├── style.css                                       → design du CV
├── script.js                                       → menu mobile, formulaire et animations
├── projet-panneau-solaire.html                     → galerie du PRJ-02
├── IMG/Projet panneau solaire/                     → photos du PRJ-02
├── Projet Petit Prince/                            → projet pédagogique PRJ-01
│   ├── Projet Petit Prince.mblock                 → jeu Scratch
│   └── carte-petit-prince/                        → pages HTML du projet
├── Projet_appréciation/                            → projet personnel
│   └── appreciation.html                           → banque d'appréciations
├── PDF/                                            → CV au format PDF
└── README.md                                       → ce guide
```

## Design

Le site s'inspire de l'univers du **plan technique / dessin industriel**
(grille de fond, cartouche, repères d'angle, nomenclature de compétences,
numérotation de "feuilles") — un clin d'œil direct à l'enseignement de la
Technologie, en écho au métier plutôt qu'un habillage générique.
