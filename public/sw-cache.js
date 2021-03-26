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
self.addEventListener('fetch', e => {
    console.log("Service Worker: Fetching")
    if (!(e.request.url.indexOf('http') === 0)) return
    
    e.respondWith(
        fetch(e.request)
            .then(res => {
                // Make clone of response
                const resClone = res.clone()
                
                //open cache
                caches
                    .open(cacheName)
                    .then(cache => {
                        //Add response to cache
                        cache.put(e.request, resClone)
                    })
                return res
            }).catch(err => caches.match(e.request).then(res => res))
    )
})