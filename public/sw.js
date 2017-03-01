importScripts('/javascripts/vendor/sw-toolbox.js')
console.log('entrou')
self.toolbox.router.get('/(.*)', self.toolbox.cacheFirst, {
  cache: {
    name: 'asset-cache-v1',
    maxEntries: 100
  }
});

// const animalsFiles = [
//   '/images/animals/cat.svg',
//   '/images/animals/cow.svg',
//   '/images/animals/dog.svg',
//   '/images/animals/dolphin.svg',
//   '/images/animals/dove.svg',
//   '/images/animals/duck.svg',
//   '/images/animals/elephant.svg',
//   '/images/animals/frog.svg',
//   '/images/animals/hen.svg',
//   '/images/animals/horse.svg',
//   '/images/animals/lion.svg',
//   '/images/animals/macaw.svg',
//   '/images/animals/monkey.svg',
//   '/images/animals/mouse.svg',
//   '/images/animals/owl.svg',
//   '/images/animals/pig.svg',
//   '/images/animals/snake.svg',
//   '/images/animals/whale.svg',
//   '/images/backgrounds/intro-mobile.jpg',
//   '/images/backgrounds/intro.jpg',
//   '/stylesheets/app.css',
//   '/javascripts/bundle.min.js',
//   '/fonts/icomoon.eot',
//   '/fonts/icomoon.svg',
//   '/fonts/icomoon.ttf',
//   '/fonts/icomoon.woff',
//   'https://fonts.googleapis.com/css?family=Henny+Penny|Open+Sans:300,400,600,700,800'
// ]

// var CacheSW = {
//   cacheVersion: '1234567890',

//   name: function(cacheName){
//     return 'animals-'+ cacheName + '-' + this.cacheVersion;
//   },

//   get: function(cache, url, opts, cacheName){
//     return cache.match(url).then(function (response) {
//       return response || fetch(url, opts).then(function(response) {
//         cache.put(url, response.clone()).then(function() {
//           CacheSW.limitCache(cacheName);
//         });

//         return response;
//       });
//     })
//   },

//   limitCache: function(cacheName){
//     var cacheLimits = [];
//     cacheLimits[CacheSW.name('dynamic')] = 30;
//     cacheLimits[CacheSW.name('images')] = 90;

//     if(cacheName in cacheLimits){
//       CacheSW.trimCache(cacheName, cacheLimits[cacheName]);
//     }
//   }
// }

// this.addEventListener('install', (event) => {
//   console.log('install')
//   var cacheName = CacheSW.name('v2')
//   event.waitUntil(
//     caches.open(cacheName).then((cache) => {
//       CacheSW.get(cache, '/', {}, cacheName)
//       return cache.addAll(animalsFiles)
//     })
//   )
// })

// this.addEventListener('fetch', function(event) {
//   event.respondWith(
//     caches.match(event.request)
//     .then((response) => {
//       console.log(response)
//     })
//   );
// });
