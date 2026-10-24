# SIRVOX 🎧

**Lecteur de texte à voix haute, pensé pour les étudiants.**
Importez vos cours et écoutez-les où que vous soyez, même sans connexion. Application web progressive (PWA) : un dossier statique, installable sur téléphone sans App Store ni Play Store.

**Version actuelle : 9.1.1**

### Nouveautés 9.1.1
- **Bible** : 4 versions libres de droits installables en un geste — Louis Segond 1910, King James, **American King James** (KJV au vocabulaire modernisé, la plus proche de la NKJV) et **Berean Standard Bible** (anglais moderne).
- Écrans Lexique / Bible : le clavier est libéré de l'éditeur à l'ouverture et le champ actif reste visible.

### Nouveautés 9.1
- **◀ PHRASE / PHRASE ▶** : avancer ou reculer phrase par phrase, même pendant la lecture (la barre de pages en bas change de page).
- **Projet courant** : « Sauvegarder » met à jour le projet ouvert (plus de doublon) ; les modifications sont enregistrées automatiquement (option « Auto »). « Enregistrer sous… » crée une copie.
- **Lexique de prononciation** : ajoutez un mot et sa prononciation, utilisés à chaque lecture (texte affiché inchangé). Balises SSML (`<break>`, `<prosody>`, `<emphasis>`, `<sub>`) exécutées par l'app ; export SSML / PLS pour les voix cloud.
- **Bible hors ligne** : choisissez version, livre et chapitres (plusieurs passages possibles), copiez-les ou envoyez-les dans la lecture. Versions fournies (domaine public) : **Louis Segond 1910**, **King James**, **American King James**, **Berean Standard Bible**. Vos propres versions s'importent en JSON / XML.
- Précédemment (8.8.x) : phrases coupées seulement à `. ? !`, abréviations lues en entier (FR/EN/DE/ES/PT), stockage interne IndexedDB sans limite de 5 Mo, une seule balise Google Analytics, icônes à la racine.

---

## ✨ Fonctionnalités

- **Lecture vocale** surlignée, 5 langues (FR, EN, DE, ES, PT), voix du système, vitesse / ton / volume, minuterie de sommeil, mode immersion.
- **Import** `.txt`, `.docx`, `.pdf` (max 50 Mo) en gardant titres, chapitres et paragraphes.
- **Outils IA** : texte extrait d'une image (Tesseract.js, FR + EN), sélection style Google Lens.
- **Organisation** : bibliothèque, marque-pages nommés, historique.
- **Lexique** et **Bible** (voir ci-dessus).
- **PWA** : hors ligne après la première ouverture, installable (Android et iPhone).
- **Conformité** : consentement à chaque mise à jour / installation ; Google Analytics 4 chargé seulement après acceptation.

---

## 🗂️ Structure du projet

```
sirvox-pwa/
├── index.html        # Toute l'application
├── manifest.json     # Métadonnées PWA
├── sw.js             # Service worker (cache hors ligne)
├── icon-192.png, icon-512.png, icon-512-maskable.png, apple-touch-icon.png, favicon-32.png
├── bible-lsg.json, bible-kjv.json, bible-akjv.json, bible-bsb.json   # textes bibliques (domaine public)
├── splash/           # Écrans de démarrage iOS (facultatif)
├── lib/              # pdf.min.js, pdf.worker.min.js, tesseract.min.js
└── README.md
```

⚠️ Tout au même niveau que `index.html` (depuis un téléphone, GitHub ne téléverse pas les dossiers : envoyez les fichiers à la racine).

---

## 🚀 Déploiement et mises à jour

Hébergez le dossier en **HTTPS** (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

- **Installer** : Android, bannière ou bouton 📲 ; iPhone, Safari → Partager → « Sur l'écran d'accueil ». En cas de souci : 📲 → **Diagnostic**.
- **Nouvelle version** : changez `APP_VERSION` en haut de `index.html`, puis publiez.
- **Bible** : ouvrez 📖 → « Versions installées et ajout » → installer (téléchargement unique, ensuite hors ligne).

### Autres versions de la Bible
La **NKJV** (Thomas Nelson) et **La Bible du Semeur** (Biblica) sont protégées par des droits d'auteur : elles ne sont pas fournies, même si certains dépôts GitHub en hébergent des copies non autorisées (à ne pas utiliser). Si vous obtenez une licence, importez votre fichier (📖 → Importer) :
- JSON `[{"name":"…","chapters":[["verset 1","verset 2"],…]}, …]` (66 livres, ordre standard), ou XML Zefania / OSIS simplifié (`<book><chapter><verse>`).
- Le fichier reste sur l'appareil de l'utilisateur.

---

## ⚠️ Limitations connues

- **Voix** : le navigateur ne lit pas le SSML ; l'app exécute elle-même pauses, vitesse, hauteur et volume.
- **Stockage** : interne à l'app (IndexedDB), non chiffré, sans synchronisation. Vider les données du navigateur efface bibliothèque, lexique et Bible.
- **PDF** : pas de PDF scannés ni de mises en page à deux colonnes ; `.doc` non pris en charge.
- **Lecture écran verrouillé** : impossible dans les navigateurs mobiles.

---

## 🛣️ À venir

- **SirChat** : partage de documents entre étudiants à proximité, via WebRTC + code QR (aucune donnée ne transite par Bluetooth réel — limitation des navigateurs — mais l'expérience "à proximité" est conservée).
- Résumés et quiz générés automatiquement à partir d'un document (IA).
- Export du texte corrigé vers PDF/DOCX.

---

## 📄 Licence

Projet personnel — à adapter selon vos besoins. Textes bibliques fournis : domaine public.
