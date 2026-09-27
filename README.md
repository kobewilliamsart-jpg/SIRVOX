# SIRVOX 🎧

**Lecteur de texte à voix haute, pensé pour les étudiants.**
Importez vos cours, laissez SIRVOX les lire à voix haute, où que vous soyez — même sans connexion internet.

Application web progressive (PWA) : un seul dossier statique, installable sur téléphone comme une vraie app, sans passer par l'App Store ou le Play Store.

**Version actuelle : 8.5**

---

## ✨ Fonctionnalités

### Lecture & import
- **Lecture texte-vers-parole** avec surlignage de la phrase en cours, en respectant la structure du document (titres, paragraphes séparés — plus de texte "en bloc").
- **Import de fichiers** : `.txt`, `.docx`, `.pdf` — glisser-déposer ou sélection manuelle.
- **8 langues de lecture** : Français, English, Deutsch, Español, Português, العربية, עברית, 中文.
- **Voix système réelles** : SIRVOX liste les voix réellement installées sur votre téléphone et vous laisse choisir, au lieu d'un simple réglage Homme/Femme.
- **Réglages audio** : vitesse, ton, volume, + préréglages rapides (Normal / Rapide / Cinéma).

### Outils IA (extraction de texte depuis une image)
- Importez une capture d'écran, une photo ou une image contenant du texte.
- L'IA (Tesseract.js, reconnaissance FR + EN combinée) extrait le texte automatiquement.
- **La photo n'est jamais conservée** — seul le texte extrait est gardé, éditable avant sauvegarde.
- Nécessite une connexion internet la première utilisation (téléchargement du modèle de reconnaissance).

### Organisation
- **Bibliothèque** de documents sauvegardés, renommables.
- **Marques-pages nommés** : donnez un nom à un marque-page ("Formules d'examen", "À réviser") et retrouvez la page d'un simple tap, même si c'est un autre document de la bibliothèque.
- **Historique** de lecture, effaçable en un tap.
- Bibliothèque / Marques-pages / Historique / Outils IA s'ouvrent en pop-up, pour ne pas encombrer l'écran.

### Confort de lecture
- **Minuterie de sommeil** (10 à 60 min) : arrête automatiquement la lecture, idéal pour réviser en s'endormant.
- **Bouton "Répéter"** : revient à la phrase précédente en un tap, sans avoir à rejouer toute la page.
- **Mode immersion** : masque les contrôles secondaires pour une lecture sans distraction.
- **Mode Bureau / Mobile** : adapte la mise en page à l'écran.
- Thème clair / sombre, taille de police ajustable.

### Application installable (PWA)
- Fonctionne **100 % hors ligne** une fois ouverte une première fois (lecture, bibliothèque, marques-pages, voix).
- Installable sur l'écran d'accueil (Android et iPhone) avec icône et écran de démarrage dédiés.
- Bannière d'installation personnalisée sur Android ; instructions claires sur iPhone (Safari ne permet pas l'installation automatique).
- **Suivi des installations** : un événement personnalisé (`pwa_install`) est envoyé à Google Analytics dès que l'app est installée (voir la section Analytics ci-dessous pour l'activer).

### Conformité & mentions légales (nouveau en 8.5)
- **Écran de consentement obligatoire** au premier lancement : l'utilisateur doit accepter les conditions d'utilisation (usage personnel et non commercial, respect du droit d'auteur) avant de pouvoir utiliser l'app. En cas de refus, l'application reste bloquée.
- Écran de consentement disponible en **FR/EN**, avec bouton "J'accepte" mis en évidence.
- **Bouton "Conditions d'utilisation"** dans l'en-tête (à côté d'Infos) : permet de relire les conditions à tout moment, avec la date d'acceptation affichée.
- **Rappel discret et permanent** sous les boutons d'import : "Usage personnel et non commercial uniquement".

---

## 🗂️ Structure du projet

```
sirvox-pwa/
├── index.html          # L'application (tout le code : HTML, CSS, JS)
├── manifest.json        # Métadonnées PWA (nom, icônes, couleurs)
├── sw.js                 # Service worker — mise en cache hors-ligne
├── icon-192.png          # Icône de l'app (192×192)
├── icon-512.png          # Icône de l'app (512×512)
├── splash/                # Écrans de démarrage iOS (11 tailles d'iPhone/iPad)
│   └── splash-*.png
└── README.md
```

⚠️ **Ne pas séparer ces fichiers** — `index.html` référence `manifest.json`, `sw.js`, les icônes et le dossier `splash/` par chemin relatif. Le dossier `splash/` est utilisé uniquement sur iPhone/iPad (Android génère son propre écran de démarrage à partir du manifest) ; l'inclure ne coûte rien et évite un flash blanc au lancement sur iOS.

---

## 📊 Activer Google Analytics (suivi des installations)

Le code de suivi est déjà en place dans `index.html`, mais utilise un identifiant provisoire. Pour l'activer :

1. Créez une propriété GA4 sur [analytics.google.com](https://analytics.google.com) (Admin → Créer une propriété → Flux de données web).
2. Copiez votre **ID de mesure** (format `G-XXXXXXXXXX`).
3. Dans `index.html`, remplacez les **deux occurrences** de `G-XXXXXXXXXX` par votre véritable ID (recherchez `G-XXXXXXXXXX` dans le fichier).
4. Déployez. Chaque installation de la PWA déclenchera automatiquement un événement `pwa_install`, visible dans GA4 sous Rapports → Engagement → Événements.

Le script est chargé en `async` : si l'utilisateur est hors ligne ou bloque le tracker, l'application continue de fonctionner normalement (aucune dépendance bloquante).

---

## 🚀 Déploiement

SIRVOX est 100 % statique — aucun serveur, aucune base de données requise.

1. **Netlify Drop** (le plus simple) : allez sur [app.netlify.com/drop](https://app.netlify.com/drop) et glissez le dossier `sirvox-pwa` entier. Vous obtenez une URL HTTPS immédiatement.
2. **GitHub Pages** : poussez ce dépôt, activez "Pages" dans les réglages du repo.
3. **Vercel / Cloudflare Pages** : fonctionnent de la même façon.

⚠️ Un **HTTPS** est obligatoire pour que le mode hors-ligne (service worker) fonctionne — c'est automatique avec les trois options ci-dessus.

### Installer sur un téléphone
- **Android** : ouvrez le lien, une bannière "Installer SIRVOX" apparaît automatiquement.
- **iPhone** : ouvrez le lien dans Safari → bouton Partager → "Sur l'écran d'accueil".

---

## 🧩 Bibliothèques externes (chargées à la demande)

Aucune dépendance n'est chargée au démarrage — l'app s'ouvre instantanément, même hors ligne. Ces bibliothèques ne sont récupérées que lorsqu'elles sont réellement nécessaires :

| Bibliothèque | Utilisée pour | Chargée quand |
|---|---|---|
| [JSZip](https://stuk.github.io/jszip/) | Lecture des fichiers `.docx` | Import d'un `.docx` |
| [pdf.js](https://mozilla.github.io/pdf.js/) | Lecture des fichiers `.pdf` | Import d'un `.pdf` |
| [Tesseract.js](https://tesseract.projectnaptha.com/) | Reconnaissance de texte sur image | Utilisation de l'outil IA |
| Google Analytics (gtag.js) | Suivi des installations | Au chargement, en arrière-plan (async) |

---

## ⚠️ Limitations connues

- **Import sur ordinateur (PC)** : moins fiable pour l'instant que sur mobile — une version dédiée PC est prévue séparément.
- **Pas de synchronisation entre appareils** : la bibliothèque, les marques-pages et l'historique sont stockés localement sur l'appareil (`localStorage`). Changer de téléphone signifie repartir de zéro.
- **Lecture en arrière-plan (écran verrouillé)** : retirée de cette version — les navigateurs mobiles interrompent la synthèse vocale de façon peu fiable en arrière-plan ; une solution plus robuste sera étudiée plus tard.
- **Outil IA** : bon sur texte imprimé / captures d'écran ; l'écriture manuscrite n'est pas prise en charge (résultats trop peu fiables pour être utiles).
- **Avertissement légal** : l'écran de consentement et le rappel intégré sont des mesures de sensibilisation, pas une protection technique — ils ne peuvent pas empêcher un usage abusif, seulement le décourager et engager la responsabilité de l'utilisateur qui accepte les conditions.

---

## 🛣️ À venir

- **SirChat** : partage de documents entre étudiants à proximité, via WebRTC + code QR (aucune donnée ne transite par Bluetooth réel — limitation des navigateurs — mais l'expérience "à proximité" est conservée).
- Résumés et quiz générés automatiquement à partir d'un document (IA).
- Export du texte corrigé vers PDF/DOCX.

---

## 📄 Licence

Projet personnel — à adapter selon vos besoins.

