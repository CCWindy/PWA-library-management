export function registerWs() {
  // 判断浏览器是否支持 Service Worker
  if ('serviceWorker' in navigator) {
    // 在 load 事件触发后注册 Service Worker，确保 Service Worker 的注册不会影响首屏速度
    window.addEventListener('load', function() {
      // 注册 Service Worker
      navigator.serviceWorker
        .register('/sw.js')
        .then(function(registration) {
          console.log('ServiceWorker registration successful with scope: ', registration.scope);
        })
        .catch(function(err) {
          console.warn('ServiceWorker registration failed: ', err);
        });
    });
  }
}

export function unregisterWs() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then(registration => {
      registration.unregister();
    });
  }
}
