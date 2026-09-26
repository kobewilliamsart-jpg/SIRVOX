const CACHE_NAME = 'sirvox-v3';
// Keep this list small and essential: cache.addAll() is all-or-nothing, and a
// large first-install batch (e.g. splash screens) can fail or stall entirely
// on a slow/flaky first connection, leaving nothing cached — which is exactly
// what makes a PWA unable to open offline afterwards. Non-essential assets
// (splash images, etc.) get cached opportunistically by the fetch handler
// below the first time they're actually requested, same end result, no risk
// to the critical first install.
const APP_SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache =>
      // Cache each file independently (not cache.addAll, which is all-or-
      // nothing) so one bad/slow request can never sink the whole install
      // and leave the app with zero offline caching.
      Promise.allSettled(APP_SHELL.map(url => cache.add(url)))
    )
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
