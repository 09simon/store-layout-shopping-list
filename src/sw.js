const CACHE_NAME = 'pathfinder-grocery-v1';
const ASSETS = [
  '/',
  '/index.html',
  '/src/styles/tokens.css',
  '/src/styles/app.css',
  '/src/app.ts'
];

self.addEventListener('install', (event: any) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS);
    })
  );
});

self.addEventListener('fetch', (event: any) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});
