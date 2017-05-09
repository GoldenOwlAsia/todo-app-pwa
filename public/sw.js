// const CACHE_NAME = 'todo-app';
// const CACHE_URLS = [
//   '/',
//   '/index.html',
//   '/static/js/bundle.js',
// ];

// self.addEventListener("install", event => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then(cache => cache.addAll(CACHE_URLS))
//       .catch(console.log)
//   );
// });

// self.addEventListener("activate", event => {
//   event.waitUntil(
//     caches.keys().then(keys => {
//       return Promise.all(keys.map(key => {
//         if(key !== CACHE_NAME) {
//           return caches.delete(key);
//         }
//         return null;
//       }));
//     })
//   )
// });

// self.addEventListener("fetch", event => {
//   event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)) );
// });
