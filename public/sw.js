const CACHE_NAME = 'CACHE_NAME_';
const VERSION = 'V1';
const OFFLINE_CACHE_NAME = CACHE_NAME + VERSION;

const whiteListVersion = ['V1'];
const whiteListCacheName = whiteListVersion.map(version => {
  return CACHE_NAME + version;
});

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  'js/index.bundle.js',
  'js/framework.bundle.js',
  '/icons/icon_144x144.png',
  '/icons/icon_152x152.png',
  '/icons/icon_192x192.png',
  '/icons/icon_512x512.png',
];

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(OFFLINE_CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          if (whiteListCacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});
