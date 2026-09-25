const CACHE_NAME = 'sirvox-v2';
const APP_SHELL = [
  './', './index.html', './manifest.json', './icon-192.png', './icon-512.png',
  './splash/splash-1125x2436.png','./splash/splash-1170x2532.png','./splash/splash-1179x2556.png',
  './splash/splash-1242x2208.png','./splash/splash-1242x2688.png','./splash/splash-1284x2778.png',
  './splash/splash-1290x2796.png','./splash/splash-1668x2388.png','./splash/splash-640x1136.png',
  './splash/splash-750x1334.png','./splash/splash-828x1792.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', event => {
  if (event.request.method !== 'GET') return;
  const url = new URL(event.request.url);
  // Only manage the app shell (same-origin). CDN libraries (JSZip, pdf.js,
  // Tesseract.js) are left to the network/browser's own caching as usual.
  if (url.origin !== self.location.origin) return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      const network = fetch(event.request).then(response => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then(cache => cache.put(event.request, copy));
        return response;
      }).catch(() => cached);
      return cached || network;
    })
  );
});
