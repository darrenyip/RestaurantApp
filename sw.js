const cacheData = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js'
];

//call install
self.addEventListener('install',event =>{
    console.log("SW installing...");
    event.waitUntil(
        caches
            .open('v1')
            .then(cache =>{
                console.log('SW: caching...');
                return cache.addAll(cacheData);
            })
            .then(()=>self.skipWaiting())
    )
})

//call activate
// self.addEventListener('activate', function(event){
//     var cacheKeepList = ['v2'];
//     console.log("SW: activated")
//     event.waitUntil(
//         caches.keys().then(function(keyList){
//             return Promise.all(keyList.map(function(key){
//                 if(cacheKeepList.indexOf(key) === -1){
//                     console.log("SW: deleting old cache");
//                     return caches.delete(key);
//                 }
//             }))
//         })
//     )
// })

//Call fetch
self.addEventListener('fetch', function(event) {
    console.log('Handling fetch event for', event.request.url);
    event.respondWith(
        caches.match(event.request).then(function(response) {
        if (response) {
            console.log('Found response in cache:', response);
            return response;
        }
        console.log('No response found in cache. About to fetch from network...');
        
        return fetch(event.request).then(function(response) {
            console.log('Response from network is:', response);
            
            return response;
        }).catch(function(error) {
            console.error('Fetching failed:', error);

            throw error;
            });
        })
    );
});



// self.addEventListener('fetch', function(event) {
//     console.log('Handling fetch event for', event.request.url);
//     event.respondWith(
//         caches.match(event.request).then(function(response){
//             if(response){
//                 console.log('Found response in cache:', response);
//                 return response;
//             }
//             else{
//                 console.log('Response from network is:', response);
//                 return fetch(event.request);
//             }
//         })
//     );
// });

