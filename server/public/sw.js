importScripts("precache-manifest.73fe0ed2802700e348313e990506bfb9.js", "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

const VERSION = 'V1';

// customized cache name
const CACHE_NAME = 'CACHE_NAME_';
const CUSTOMIZED_CACHE_NAME = CACHE_NAME + VERSION;

// workbox cache name
const WORKBOX = 'WORKBOX';
const RUNTIME = 'RUNTIME';
const PRECACHE = 'PRECACHE';
const WROKBOX_RUNTIME_CACHE_NAME = `${WORKBOX}-${RUNTIME}-${VERSION}`;
const WROKBOX_PRECACHE_CACHE_NAME = `${WORKBOX}-${PRECACHE}-${VERSION}`;

const whiteListVersion = ['V1'];
const whiteListCacheName = [];
whiteListVersion.map(version => {
  whiteListCacheName.push(CACHE_NAME + version);
  whiteListCacheName.push(`${WORKBOX}-${RUNTIME}-${version}`);
  whiteListCacheName.push(`${WORKBOX}-${PRECACHE}-${version}`);
});

const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  // 'js/index.bundle.js',
  // 'js/framework.bundle.js',
  '/icons/icon_144x144.png',
  '/icons/icon_152x152.png',
  '/icons/icon_192x192.png',
  '/icons/icon_512x512.png',
];

if (workbox) {
  // 修改默认配置
  workbox.core.setCacheNameDetails({
    prefix: WORKBOX,
    suffix: VERSION,
    precache: PRECACHE,
    runtime: RUNTIME,
  });

  workbox.precaching.precacheAndRoute(self.__precacheManifest || []);

  workbox.routing.registerRoute(new RegExp('.*.js'), workbox.strategies.networkFirst());
}

this.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CUSTOMIZED_CACHE_NAME).then(function(cache) {
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
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      return response || fetch(event.request);
    })
  );
});

