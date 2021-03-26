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
    
    e.respondWith(fromCache(e.request))

    e.waitUntil(
        update(e.request)
            .then(refresh)
    )
})

function fromCache(req){
    return caches.open(cacheName).then(function (cache) {
        console.log("calling fromcache")
        return cache.match(req)
    })

}

function update(req){
    return caches.open(cacheName).then(function (cache) {
    return fetch(req).then(function (res) {
        return cache.put(req, res.clone()).then(function () {
            return res
        })
        })
    })
}

function refresh(res) {
    return self.clients.matchAll().then(function (clients) {
        clients.foreach(function(client) {
            var message = {
                type: 'refresh',
                url: response.url,
                eTag: response.headers.get('ETag')
            }

            client.postMessage(JSON.stringify(message))
        })
            
        });
    }

//Need to change so we provide cache first then fetch
//event.respondWith(caches.match(event.request))
//if (url.origin===location.origin && url.pathname=='/') then event.respondwith(caches.match)
//npm idb for index database