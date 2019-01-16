const name = "restaurantApp";

const cacheData = [
    'index.html',
    'restaurant.html',
    'css/styles.css',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg',
    'js/dbhelper.js',
    'js/main.js',
    'js/restaurant_info.js'
];

//call install
self.addEventListener('install',event =>{
    console.log("SW installing...");
    event.waitUntil(
        caches
            .open(name)
            .then(cache =>{
                console.log('SW: caching...');
                cache.addAll(cacheData);
            })
            .then(()=>self.skipWaiting())
    )
})
self.addEventListener('activate',event=>{
    console.log('SW activeated');
    event.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key =>{
                if(!expectedCaches.includes(key)){
                    return caches.delete(key);
                }
            })
        )).then(()=>{
            console.log('now ready to handle fetches!')
        })
    )
})

//Call fetch
self.addEventListener('fetch', event => {
    console.log("SW: fetching");
    event.respondWith(
        fetch(event.request)
            .then( res => {
                const resClone = res.clone();
                caches
                    .open(cacheName)
                    .then(cache => {
                        cache.put(event.request, resClone);
                    });
                return res;
            }).catch(err => caches.match(event.request).then(res => res))
    );
});