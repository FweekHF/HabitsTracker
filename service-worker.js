const CACHE_NAME = 'plan-cmi-cache-v1';
const urlsToCache = [
  '/plan-cmi-pwa/',
  '/plan-cmi-pwa/index.html',
  '/plan-cmi-pwa/style.css',
  '/plan-cmi-pwa/manifest.json',
  '/plan-cmi-pwa/icon.png',
  '/plan-cmi-pwa/icon.png'
];

self.addEventListener('install', event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache)));
});

self.addEventListener('fetch', event => {
  event.respondWith(caches.match(event.request).then(response => response || fetch(event.request)));
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
  );
});
