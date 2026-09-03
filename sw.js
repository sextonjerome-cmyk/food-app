/* Frigo service worker — offline-first.
   BUMP CACHE_VERSION ON EVERY DEPLOY or the phone keeps running old code. */
const CACHE_VERSION = 'frigo-v58';

/* Recipe photos are cached up front, not on demand. He opens the app in the
   kitchen; the Cook screen is all photos, and it cannot go and fetch them
   then. About 2.6 MB for the lot, paid once on the first visit. */
const PHOTOS = [
  './img/poulet-moutarde.webp',
  './img/gratin-dauphinois.webp',
  './img/shakshuka.webp',
  './img/poulet-zaatar.webp',
  './img/menemen.webp',
  './img/mapo-tofu.webp',
  './img/smash-burger.webp',
  './img/crevettes-ail-citron.webp',
  './img/amatriciana.webp',
  './img/crockpot-beef-stew.webp',
  './img/crockpot-tikka-masala.webp',
  './img/mercimek-lentil-soup.webp',
  './img/takikomi-gohan.webp',
  './img/airfryer-salmon.webp',
  './img/airfryer-chickpeas.webp',
  './img/airfryer-chicken-thighs.webp',
  './img/firecracker-meatballs.webp',
  './img/street-cart-chicken.webp',
  './img/peruvian-aji-verde-chicken.webp',
  './img/hot-honey-chicken.webp',
  './img/steakhouse-pork-chops.webp',
  './img/shrimp-and-grits.webp',
  './img/chicken-biscuit-pot-pie.webp',
  './img/dan-dan-noodles.webp',
  './img/korean-beef-bibimbap.webp',
  './img/thai-coconut-curry-chicken.webp',
  './img/buffalo-cauliflower-tacos.webp',
  './img/honey-miso-donburi.webp',
  './img/onion-crunch-chicken.webp',
  './img/middle-eastern-chickpea-bowls.webp',
  './img/pecan-crusted-chicken.webp',
  './img/szechuan-pork-green-beans.webp',
  './img/shepherds-pie.webp',
  './img/crispy-parmesan-chicken.webp',
  './img/chicken-adobo.webp',
  './img/cilbir-turkish-eggs.webp',
  './img/french-onion-soup.webp',
  './img/poulet-basquaise.webp',
  './img/french-omelette.webp',
  './img/huevos-rancheros.webp',
  './img/croque-monsieur.webp',
  './img/dutch-baby.webp',
  './img/ful-medames.webp',
  './img/chicken-congee.webp',
  './img/esquites.webp',
  './img/whipped-feta.webp',
  './img/pad-krapow.webp',
  './img/carbonara.webp',
  './img/kimchi-jjigae.webp',
  './img/chicken-tinga-tacos.webp',
  './img/crockpot-ropa-vieja.webp',
  './img/airfryer-halloumi.webp',
  './img/garlic-mushrooms-on-toast.webp',
  './img/horiatiki.webp',
  './img/coban-salatasi.webp',
  './img/cacik.webp',
  './img/piyaz.webp',
  './img/tabbouleh.webp',
  './img/fattoush.webp',
  './img/muhammara.webp',
  './img/bulgogi-meatballs.webp',
  './img/chicken-al-limone.webp',
  './img/sheet-pan-harissa-chicken.webp',
  './img/ezme.webp'
];

const SHELL = [
  './',
  './index.html',
  './styles.css',
  './app.js',
  './ingredients.js',
  './foodwords.js',
  './recipes.js',
  './kicks.js',
  './ai.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
].concat(PHOTOS);

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
