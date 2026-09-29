SIRVOX V8.7 — PWA

Contenu :
- index.html : application
- manifest.json : installation PWA
- sw.js : cache offline et dépendances
- lib/jszip.min.js : import DOCX local
- icons/ : icônes PWA
- splash/ : écrans de démarrage

Installation :
1. Héberger ce dossier sur HTTPS (ou localhost).
2. Ouvrir index.html depuis le serveur.
3. Installer SIRVOX depuis le navigateur.
4. Faire une première ouverture/import avec Internet afin que le service worker mette en cache PDF.js/Tesseract.
5. Ensuite, les composants déjà utilisés restent disponibles hors connexion.

Important : les voix allemandes, espagnoles et portugaises sont les voix du système du téléphone/ordinateur. Leur disponibilité dépend de l'appareil et du navigateur.
