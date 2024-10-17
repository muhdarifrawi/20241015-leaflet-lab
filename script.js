// the map argument refers to the map which we create using Leaflet
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}


let singapore = [ 1.29,103.85]; // Singapore latlng
let map = L.map('map').setView(singapore, 13);

// setup the tile layers
// NOTE: This tile layer code was lifted from Lab 6 as I was having problems with
// the tile layer code in Lab 3.
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
}).addTo(map);

// create marker cluster
// let markerClusterLayer = L.markerClusterGroup();

// for (let i = 0; i < 1000; i++) {
//     let pos = getRandomLatLng(map);
//     L.marker(pos).addTo(markerClusterLayer);
// }

// markerClusterLayer.addTo(map);

// getLocation();



(async () => {
    let markerClusterLayer = L.markerClusterGroup();
    let taxiLocations = await getLocation();
    console.log("taxi locations >>> ", taxiLocations)
    taxiLocations.map((pos)=>{
        let latLong = [pos[1], pos[0]]
        console.log(latLong)
        L.marker(latLong).addTo(markerClusterLayer);
    })

    console.log(markerClusterLayer);

    markerClusterLayer.addTo(map);
})();