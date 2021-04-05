const cacheName = 'v1'


// Call Install event
self.addEventListener('install', (e) => {
    console.log('Service Worker Installed')

})

//Call Activate Event
self.addEventListener('activate', (e) => {
    console.log('Service Worker Activated')
    //Remove unwanted caches
    e.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cache => {
                        if(cache !== cacheName){
                            console.log("Service Worker: Clearing old cache")
                            return caches.delete(cache)
                        }
                    })
                )
            })
    )
})

//Call Fetch Event
// self.addEventListener('fetch', e => {
//     console.log("Service Worker: Fetching")
//     
//     console.log(e.request)
//     e.respondWith(fromCache(e.request))

//     e.waitUntil(
//         update(e.request)
//             .then(refresh)
//     )
// })

self.addEventListener('fetch', function(event) {
    if (event.request.method==='POST') return
    if (!(event.request.url.indexOf('http') === 0)) return
    console.log(event.request)
    event.respondWith(
      caches.open(cacheName).then(function(cache) {
        return cache.match(event.request).then(function (response) {
          return response || fetch(event.request).then(function(response) {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  });