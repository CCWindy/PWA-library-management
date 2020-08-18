import urlBase64ToUint8Array from './utils/urlBase64ToUint8Array';
import axios from 'axios';

export const register = () => {
  if ('serviceWorker' in navigator) {
    // 在 load 事件触发后注册 Service Worker，确保 Service Worker 的注册不会影响首屏速度
    window.addEventListener('load', function () {
      // 注册 Service Worker
      registerServiceWorker('./sw.js')
        .then(registration => {
          return Promise.all([registration, askPermission()]);
        })
        .then(result => {
          const registration = result[0];

          if ('PushManager' in window) {
            subscribeUserToPush(registration).then(subscription => {
              axios.post(
                'http://localhost:3000/subscribe',
                { subscription, client: 'library' })
                .then(data => {
                  console.log(data);
                });
            });
          }
        })
        .catch(function (err) {
          console.warn('ServiceWorker registration failed: ', err);
        });
    });
  }
};

export function unregister() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}

function registerServiceWorker(file) {
  return navigator.serviceWorker.register(file);
}

const askPermission = () => {
  return new Promise(function (resolve, reject) {
    const permissionResult = Notification.requestPermission(function (result) {
      console.log(result, 'get permission');

      resolve(result);
    });

    if (permissionResult) {
      permissionResult.then(resolve, reject);
    }
  }).then(function (permissionResult) {
    if (permissionResult !== 'granted') {
      throw new Error("We weren't granted permission.");
    }
  });
};

const subscribeUserToPush = registration => {
  const publicKey = 'BOEQSjdhorIf8M0XFNlwohK3sTzO9iJwvbYU-fuXRF0tvRpPPMGO6d_gJC_pUQwBT7wD8rKutpNTFHOHN3VqJ0A';
  const subscribeOptions = {
    userVisibleOnly: true,
    applicationServerKey: urlBase64ToUint8Array(publicKey),
  };

  return registration.pushManager.subscribe(subscribeOptions).then(function (pushSubscription) {
    console.log('Received PushSubscription: ', JSON.stringify(pushSubscription));
    return pushSubscription;
  });
};

navigator.serviceWorker.addEventListener('message', function (e) {
  const action = e.data;
  console.log(`receive post-message from sw, action is '${e.data}'`);
  switch (action) {
    case 'show-book':
      location.href = 'http://100.98.137.158:3000';
      break;
    case 'contact-me':
      break;
    default:
      console.log('nothing');

      break;
  }
});
