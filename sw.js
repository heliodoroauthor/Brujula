const CACHE = 'brujula-v3';
const CORE = ['./', 'index.html', 'manifest.webmanifest', 'icon.svg'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Network-first for page navigations so updates appear immediately when online.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(r => {
        const cp = r.clone();
        caches.open(CACHE).then(c => c.put('index.html', cp));
        return r;
      }).catch(() => caches.match('index.html'))
    );
    return;
  }

  // Cache-first for everything else (assets, fonts), with runtime caching.
  e.respondWith(
    caches.match(req).then(cached => cached || fetch(req).then(r => {
      const cp = r.clone();
      caches.open(CACHE).then(c => c.put(req, cp));
      return r;
    }).catch(() => cached))
  );
});
