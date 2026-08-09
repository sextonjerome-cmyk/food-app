/* Frigo service worker — offline-first.
   BUMP CACHE_VERSION ON EVERY DEPLOY or the phone keeps running old code. */
const CACHE_VERSION = 'frigo-v4';

const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './recipes.js',
  './ai.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_VERSION)
      .then(c => c.addAll(SHELL).catch(() => {}))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== CACHE_VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;

  /* Never cache the Claude API call. */
  if (req.url.includes('api.anthropic.com')) return;

  /* Cache-first: everything here is bundled and versioned, so a hit is always
     correct for this deploy, and the app opens instantly with no network. */
  e.respondWith(
    caches.match(req).then(hit => {
      if (hit) return hit;
      return fetch(req).then(res => {
        if (res && res.status === 200 && res.type === 'basic') {
          const copy = res.clone();
          caches.open(CACHE_VERSION).then(c => c.put(req, copy));
        }
        return res;
      }).catch(() => caches.match('./index.html'));
    })
  );
});
