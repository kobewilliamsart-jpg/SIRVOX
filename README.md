# SIRVOX 🎧

**Lecteur de texte à voix haute, pensé pour les étudiants.**
Importez vos cours et écoutez-les où que vous soyez, même sans connexion. Application web progressive (PWA) : un dossier statique, installable sur téléphone sans App Store ni Play Store.

**Version actuelle : 8.8**

### Nouveautés 8.8
- **Import DOCX / PDF fidèle** : titres, chapitres et paragraphes conservés (en-têtes, pieds de page et numéros de page retirés du PDF). Chaque chapitre démarre sur une nouvelle page.
- **Outil IA façon Google Lens** : l'image s'affiche avec les lignes de texte surlignées ; touchez pour sélectionner, puis copiez ou insérez dans le document.
- **Installation PWA corrigée** : bannière à chaque visite tant que l'app n'est pas installée, et bouton 📲 permanent dans l'en-tête.
- **Conditions d'utilisation** redemandées à chaque mise à jour **et** à chaque nouvelle installation.
- Voix de/es/pt mieux choisies (langue exacte, voix hors ligne en priorité) ; lecture « répéter » fiabilisée.
- Sauvegarde sécurisée (plus de faux « sauvegardé » si le stockage est plein), reprise de lecture corrigée, fichiers `.doc` refusés avec un message clair.
- Nouveau logo.

---

## ✨ Fonctionnalités

- **Lecture vocale** avec surlignage de la phrase en cours, en 5 langues : Français, English, Deutsch, Español, Português. Choix de la voix système, vitesse / ton / volume, préréglages Normal / Rapide / Cinéma.
- **Import** `.txt`, `.docx`, `.pdf` (max 10 Mo), glisser-déposer ou sélection.
- **Outils IA** : extraction de texte depuis une image (Tesseract.js, FR + EN). La photo n'est jamais conservée, seul le texte l'est.
- **Organisation** : bibliothèque renommable, marques-pages nommés, historique.
- **Confort** : minuterie de sommeil, bouton « Répéter », mode immersion, Bureau / Mobile, thème clair / sombre, taille de police.
- **PWA** : 100 % hors ligne après la première ouverture, installable (Android et iPhone), écrans de démarrage iOS.
- **Conformité** : écran de consentement obligatoire (FR/EN), conditions consultables via 📜, rappel « usage personnel et non commercial ».
- **Suivi** : Google Analytics 4 (installations, mises à jour), chargé seulement après acceptation des conditions.

---

## 🗂️ Structure du projet

```
sirvox-pwa/
├── index.html        # Toute l'application (HTML, CSS, JS, JSZip)
├── manifest.json     # Métadonnées PWA
├── sw.js             # Service worker (cache hors ligne)
├── icons/            # icon-192, icon-512, icon-512-maskable, apple-touch-icon, favicon-32
├── splash/           # Écrans de démarrage iOS (11 tailles)
├── lib/              # pdf.min.js, pdf.worker.min.js, tesseract.min.js
└── README.md
```

⚠️ Ne pas séparer ces fichiers : `index.html` les référence par chemin relatif.

---

## 🚀 Déploiement et mises à jour

SIRVOX est 100 % statique. Hébergez le dossier en **HTTPS** (obligatoire pour l'installation et le hors ligne) : Netlify Drop, GitHub Pages, Vercel ou Cloudflare Pages.

- **Installer** : Android, bannière « Installer » ou bouton 📲 ; iPhone, Safari → Partager → « Sur l'écran d'accueil ».
- **Nouvelle version** : changez `APP_VERSION` en haut de `index.html`, puis publiez. L'app propose la mise à jour (🔄), garde les documents et redemande les conditions.
- **Analytics** : l'ID de mesure `SIRVOX_GA_ID` se trouve en haut de `index.html`.

Bibliothèques chargées à la demande, puis gardées pour le hors ligne : pdf.js (PDF), Tesseract.js (image). JSZip (DOCX) est intégré à `index.html`.

---

## ⚠️ Limitations connues

- **Stockage local** (≈ 5 Mo, `localStorage`) : pas de synchronisation entre appareils.
- **PDF** : les PDF scannés (sans texte) et les mises en page à deux colonnes ne sont pas gérés ; `.doc` non pris en charge (enregistrer en `.docx`).
- **Outil IA** : texte imprimé et captures d'écran uniquement, pas d'écriture manuscrite ; sur photo, la qualité dépend de la lumière. Ce n'est pas Google Lens (non intégrable dans une app tierce).
- **Lecture écran verrouillé** : non disponible (les navigateurs mobiles coupent la synthèse vocale en arrière-plan).
- **Import sur PC** : moins fiable que sur mobile ; une version dédiée est prévue.
- **Légal** : le consentement sensibilise et engage l'utilisateur, il n'empêche pas techniquement un usage abusif.

---

## 🛣️ À venir

- **SirChat** : partage de documents entre étudiants à proximité, via WebRTC + code QR (aucune donnée ne transite par Bluetooth réel — limitation des navigateurs — mais l'expérience "à proximité" est conservée).
- Résumés et quiz générés automatiquement à partir d'un document (IA).
- Export du texte corrigé vers PDF/DOCX.

---

## 📄 Licence

Projet personnel — à adapter selon vos besoins.
