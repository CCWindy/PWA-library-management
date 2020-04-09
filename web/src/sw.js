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

this.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(CUSTOMIZED_CACHE_NAME).then(function (cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

this.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (keyList) {
      return Promise.all(
        keyList.map(function (key) {
          if (whiteListCacheName.indexOf(key) === -1) {
            return caches.delete(key);
          }
        })
      );
    })
  );
});

this.addEventListener('fetch', function (event) {
  console.log(event.request);
  event.respondWith(
    caches.match(event.request).then(function (response) {
      return response || fetch(event.request);
    })
  );
});

this.addEventListener('notificationclick', function (e) {
  const action = e.action;
  console.log(`action tag: ${e.notification.tag}`, `action: ${action}`);

  switch (action) {
    case 'show-book':
      console.log('show-book');
      // location.href = 'https://127.0.0.1:9000';
      break;
    case 'contact-me':
      // location.href = 'yan.y.wu@ericsson.com';
      break;
    default:
      console.log(`Unhandled action: ${e.action}`);
      action = 'default';
      break;
  }

  e.notification.close();

  e.waitUntil(
    // get all clients
    self.clients.matchAll().then(function (clients) {
      if (!clients || clients.length === 0) {
        self.clients.openWindow && self.clients.openWindow('http://127.0.0.1:3000');
        return;
      }
      clients[0].focus && clients[0].focus();
      clients.forEach(function (client) {
        //use postMessage to communicate
        client.postMessage(action);
      });
    })
  );
});

this.addEventListener('push', function (e) {
  if (e.data) {
    const data = e.data.json();
    const title = 'CV library';
    const options = {
      body: data,
      icon: '/img/icons/book-128.png',
      image: '/img/icons/book-521.png', // no effect
      actions: [{
        action: 'show-book',
        title: '去看看'
      }, {
        action: 'contact-me',
        title: '联系我'
      }],
      tag: 'pwa-starter',
      renotify: true
    };
    self.registration.showNotification(title, options);
  }
  else {
    console.log('push没有任何数据');
  }
});
