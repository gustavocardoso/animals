const DEBUG = false
const { assets } = global.serviceWorkerOption
const CACHE_NAME = 'app-animals-v2'

let assetsToCache = [...assets, './']

assetsToCache = assetsToCache.map(path => {
  return new URL(path, global.location.toString())
})

self.addEventListener('install', event => {
  if (DEBUG) {
    console.log('[SW]: Install event')
  }

  event.waitUntil(
    global.caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(assetsToCache)
      })
      .then(() => {
        if (DEBUG) {
          console.log('[SW]: Cached assets: main', assetsToCache)
        }
      })
      .catch(error => {
        console.error(error)
        throw error
      })
  )
})

self.addEventListener('activate', event => {
  if (DEBUG) {
    console.log('[SW]: Service worker activate event')
  }

  event.waitUntil(
    global.caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheName.indexOf(CACHE_NAME) === 0) {
              return null
            }

            return global.caches.delete(cacheName)
          })
        )
      })
  )
})

self.addEventListener('message', event => {
  switch (event.data.action) {
    case 'skipWaiting':
      if (self.skipWaiting) {
        self.skipWaiting()
        self.clients.claim()
      }
      break
    default:
      break
  }
})

self.addEventListener('fetch', event => {
  // TODO: cache google fonts
  const request = event.request

  if (DEBUG) {
    console.log('[SW]: Fetch event')
  }

  // Ignore not GET request.
  if (request.method !== 'GET') {
    if (DEBUG) {
      console.log(`[SW]: Ignore non GET request ${request.method}`)
    }

    return
  }

  const requestUrl = new URL(request.url)

  // Ignore difference origin.
  if (requestUrl.origin !== location.origin) {
    if (DEBUG) {
      console.log(`[SW]: Ignore difference origin ${requestUrl.origin}`)
    }

    return
  }

  const resource = global.caches.match(request)
    .then(response => {
      if (response) {
        if (DEBUG) {
          console.log(`[SW]: fetch URL ${requestUrl.href} from cache`)
        }

        return response
      }

      // Load and cache known assets
      return fetch(request)
        .then(responseNetwork => {
          if (!responseNetwork || !responseNetwork.ok) {
            if (DEBUG) {
              console.log(
                `[SW] URL [${requestUrl.toString()}] wrong responseNetwork: ${
                  responseNetwork.status
                } ${responseNetwork.type}`
              )
            }

            return responseNetwork
          }

          if (DEBUG) {
            console.log(`[SW]: URL ${requestUrl.href} fetched`)
          }

          const responseCache = responseNetwork.clone()

          global.caches
            .open(CACHE_NAME)
            .then(cache => {
              return cache.put(request, responseCache)
            })
            .then(() => {
              if (DEBUG) {
                console.log(`[SW]: Cache asset: ${requestUrl.href}`)
              }
            })

          return responseNetwork
        })
        .catch(() => {
          // User is landing on our page.
          if (event.request.mode === 'navigate') {
            return global.caches.match('./')
          }

          return null
        })
    })

    event.respondWith(resource)
})

