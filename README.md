# SIRVOX 🎧

**Lecteur de texte à voix haute, pensé pour les étudiants.**
Importez vos cours et écoutez-les où que vous soyez, même sans connexion. Application web progressive (PWA) : un dossier statique, installable sur téléphone sans App Store ni Play Store.

**Version actuelle : 8.8.2**

### Nouveautés 8.8.2
- **Phrases** : la lecture et le surlignage s'arrêtent uniquement à `.` `?` `!` — plus jamais à une virgule, un point-virgule ou une abréviation (Dr., M., cf., p. 12, Ps. 85, av. J.-C.…).
- **Abréviations lues en entier** (dictionnaire par langue FR/EN/DE/ES/PT) : « Dr. » → « Docteur », « B.C. » → « before Christ », « z. B. » → « zum Beispiel »… Le texte affiché ne change pas.
- **Stockage illimité en pratique** : les documents sont enregistrés dans la base interne de l'app (IndexedDB), sans la limite de 5 Mo — livres entiers acceptés (import jusqu'à 50 Mo). Migration automatique de la bibliothèque existante.
- **Google Analytics** : une seule balise, une seule page vue par ouverture (fini le doublon `?source=pwa`), mode `browser` / `pwa` séparé par un paramètre.
- Invitation d'installation conservée même si elle arrive avant la fin du chargement.

---

## ✨ Fonctionnalités

- **Lecture vocale** avec surlignage de la phrase en cours, en 5 langues : Français, English, Deutsch, Español, Português. Choix de la voix système, vitesse / ton / volume, préréglages Normal / Rapide / Cinéma.
- **Import** `.txt`, `.docx`, `.pdf` (max 50 Mo), glisser-déposer ou sélection.
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
- **Si l'installation n'apparaît pas** : touchez 📲 puis **Diagnostic** (vérifie HTTPS, manifest, icônes, service worker). Le lien doit s'ouvrir dans Chrome/Safari, pas dans Facebook ou WhatsApp (l'app le signale).
- **Nouvelle version** : changez `APP_VERSION` en haut de `index.html`, puis publiez. L'app propose la mise à jour (🔄), garde les documents et redemande les conditions.
- **Analytics** : l'ID de mesure `SIRVOX_GA_ID` se trouve en haut de `index.html`.

Bibliothèques chargées à la demande, puis gardées pour le hors ligne : pdf.js (PDF), Tesseract.js (image). JSZip (DOCX) est intégré à `index.html`.

---

## ⚠️ Limitations connues

- **Stockage** : interne à l'app (IndexedDB, limité seulement par l'espace libre de l'appareil), non chiffré, sans synchronisation entre appareils. Vider les données du navigateur ou désinstaller l'app efface la bibliothèque.
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
