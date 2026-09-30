/* SIRVOX service worker — hors ligne + mises à jour contrôlées.
   La version vient de l'URL d'enregistrement (sw.js?v=APP_VERSION) : il suffit de changer
   APP_VERSION dans index.html. À l'activation, les anciens caches sont supprimés.
   Les documents de l'utilisateur (localStorage) ne sont JAMAIS touchés. */
const VERSION = new URL(self.location.href).searchParams.get('v') || 'dev';
const CACHE_VERSION = 'sirvox-' + VERSION;
const CORE = [
  './',
  './index.html',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-192.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png',
  './icons/favicon-32.png'
];
// Optionnels : ignorés sans erreur s'ils sont absents.
const OPTIONAL = ['./lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/tesseract.min.js'];
const CDN_HOSTS = ['cdnjs.cloudflare.com', 'cdn.jsdelivr.net'];

self.addEventListener('install', (event) => {
  // Pas de skipWaiting ici : la nouvelle version attend que l'utilisateur appuie sur « Mettre à jour ».
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_VERSION);
    await Promise.all(CORE.map((u) => cache.add(new Request(u, { cache: 'reload' }))));
    await Promise.allSettled(OPTIONAL.map((u) => cache.add(u)));
  })());
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter((k) => k !== CACHE_VERSION).map((k) => caches.delete(k)));
    await self.clients.claim();
  })());
});

self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') self.skipWaiting();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.searchParams.has('vcheck')) return; // vérification de version : toujours le réseau

  // Pages : réseau d'abord (toujours la dernière version en ligne), cache en secours hors ligne.
  if (req.mode === 'navigate') {
    event.respondWith((async () => {
      try {
        const fresh = await fetch(req);
        if (fresh && fresh.ok) {
          const cache = await caches.open(CACHE_VERSION);
          cache.put('./index.html', fresh.clone());
        }
        return fresh;
      } catch (_) {
        return (await caches.match('./index.html')) || (await caches.match('./'));
      }
    })());
    return;
  }

  const sameOrigin = url.origin === self.location.origin;
  const cdn = CDN_HOSTS.includes(url.hostname);
  if (!sameOrigin && !cdn) return; // Google Analytics etc. : jamais interceptés

  event.respondWith((async () => {
    const cached = await caches.match(req, { ignoreSearch: sameOrigin });
    if (cached) return cached;
    try {
      const res = await fetch(req);
      if (res && (res.ok || res.type === 'opaque')) {
        const cache = await caches.open(CACHE_VERSION);
        cache.put(req, res.clone());
      }
      return res;
    } catch (err) {
      return Response.error();
    }
  })());
});
