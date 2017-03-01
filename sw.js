const animalsFiles = [
  'assets/images/animals/cat.svg',
  'assets/images/animals/cow.svg',
  'assets/images/animals/dog.svg',
  'assets/images/animals/dolphin.svg',
  'assets/images/animals/dove.svg',
  'assets/images/animals/duck.svg',
  'assets/images/animals/elephant.svg',
  'assets/images/animals/frog.svg',
  'assets/images/animals/hen.svg',
  'assets/images/animals/horse.svg',
  'assets/images/animals/lion.svg',
  'assets/images/animals/macaw.svg',
  'assets/images/animals/monkey.svg',
  'assets/images/animals/mouse.svg',
  'assets/images/animals/owl.svg',
  'assets/images/animals/pig.svg',
  'assets/images/animals/snake.svg',
  'assets/images/animals/whale.svg',
  'assets/images/backgrounds/intro-mobile.jpg',
  'assets/images/backgrounds/intro.jpg',
  'assets/css/app.css',
  'assets/js/application.js',
  'assets/fonts/icomoon.eot',
  'assets/fonts/icomoon.svg',
  'assets/fonts/icomoon.ttf',
  'assets/fonts/icomoon.woff'
]

var CacheSW = {
  cacheVersion: '1234567890',

  name: function(cacheName){
    return 'animals-'+ cacheName + '-' + this.cacheVersion;
  },

  get: function(cache, url, opts, cacheName){
    return cache.match(url).then(function (response) {
      return response || fetch(url, opts).then(function(response) {
        cache.put(url, response.clone()).then(function() {
          CacheSW.limitCache(cacheName);
        });

        return response;
      });
    })
  },

  limitCache: function(cacheName){
    var cacheLimits = [];
    cacheLimits[CacheSW.name('dynamic')] = 30;
    cacheLimits[CacheSW.name('images')] = 90;

    if(cacheName in cacheLimits){
      CacheSW.trimCache(cacheName, cacheLimits[cacheName]);
    }
  }
}

this.addEventListener('install', (event) => {
  console.log('install')
  var cacheName = CacheSW.name('v2')
  event.waitUntil(
    caches.open(cacheName).then((cache) => {
      CacheSW.get(cache, '/', {}, cacheName)
      return cache.addAll(animalsFiles)
    })
  )
})

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
    .then((response) => {
      console.log(response)
    })
  );
});
