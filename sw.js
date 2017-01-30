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
  'assets/images/animals/whale.svg'
]

this.addEventListener('install', (event) => {
  console.log('SW installed')
  event.waitUntil(
    caches.open('v1').then((cache) => {
      return cache.addAll(animalsFiles)
    })
  )
})

this.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
  );
});