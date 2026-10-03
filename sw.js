/* SIRVOX service worker — le cache change à chaque version (index.html enregistre sw.js?v=APP_VERSION) */
const VERSION = new URL(self.location.href).searchParams.get('v') || '8.8';
const CACHE = 'sirvox-' + VERSION;
const CORE = [
  './', './index.html', './manifest.json',
  './icons/icon-192.png', './icons/icon-512.png', './icons/icon-512-maskable.png', './icons/apple-touch-icon.png', './icons/favicon-32.png',
  './lib/pdf.min.js', './lib/pdf.worker.min.js', './lib/tesseract.min.js'
];
// Bibliothèques téléchargées une fois (PDF.js / Tesseract + langues) puis gardées pour le hors-ligne.
// Google Analytics n'est volontairement jamais mis en cache.
const RUNTIME_HOSTS = ['cdn.jsdelivr.net', 'cdnjs.cloudflare.com', 'unpkg.com', 'tessdata.projectnaptha.com'];

self.addEventListener('install', e => {
  // un fichier manquant ne doit jamais bloquer l'installation
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(new Request(u, { cache: 'reload' })).catch(() => {})))));
});

self.addEventListener('message', e => { if (e.data === 'SKIP_WAITING') self.skipWaiting(); });

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k.startsWith('sirvox-') && k !== CACHE).map(k => caches.delete(k)));
    await self.clients.claim();
  })());
});

async function networkFirst(req) {
  const cache = await caches.open(CACHE);
  try {
    const res = await fetch(req);
    if (res && res.ok && !new URL(req.url).searchParams.has('vcheck')) cache.put(req, res.clone());
    return res;
  } catch (err) {
    return (await cache.match(req, { ignoreSearch: true })) || (await cache.match('./index.html')) || (await cache.match('./')) || Response.error();
  }
}

async function cacheFirst(req) {
  const cache = await caches.open(CACHE);
  const hit = await cache.match(req);
  if (hit) return hit;
  const res = await fetch(req);
  if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
  return res;
}

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const same = url.origin === self.location.origin;
  if (!same && RUNTIME_HOSTS.indexOf(url.hostname) === -1) return;
  if (req.mode === 'navigate' || (same && /(\/|index\.html)$/.test(url.pathname))) { e.respondWith(networkFirst(req)); return; }
  e.respondWith(cacheFirst(req));
});
