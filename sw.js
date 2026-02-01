var CACHE_NAME = 'grocery-list-v1';
var URLS_TO_CACHE = [
  './',
  './grocerylist1.html',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Nunito:wght@400;600;700&display=swap'
];

// Install — cache core files
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(URLS_TO_CACHE).catch(function(err) {
        console.log('Cache addAll partial failure (fonts may be cross-origin):', err);
        // Cache what we can individually
        return Promise.all(
          URLS_TO_CACHE.map(function(url) {
            return cache.add(url).catch(function() {
              console.log('Could not cache:', url);
            });
          })
        );
      });
    })
  );
  self.skipWaiting();
});

// Activate — clean old caches
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(names) {
      return Promise.all(
        names.filter(function(name) { return name !== CACHE_NAME; })
          .map(function(name) { return caches.delete(name); })
      );
    })
  );
  self.clients.claim();
});

// Fetch — serve from cache, fallback to network
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(cached) {
      if (cached) return cached;
      return fetch(event.request).then(function(response) {
        // Cache successful GET responses
        if (response && response.status === 200 && event.request.method === 'GET') {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, clone);
          });
        }
        return response;
      }).catch(function() {
        // Offline fallback — return the main page for navigation requests
        if (event.request.mode === 'navigate') {
          return caches.match('./grocerylist1.html');
        }
      });
    })
  );
});
