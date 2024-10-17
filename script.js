let environment = 4;
// 1: randomLatLong, 2: taxi, 3: earthquake

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

// create marker cluster
function clusterRandom(){
    let markerClusterLayer = L.markerClusterGroup();

    for (let i = 0; i < 1000; i++) {
        let pos = getRandomLatLng(map);
        L.marker(pos).addTo(markerClusterLayer);
    }

    markerClusterLayer.addTo(map);
}

taxiMap = async () => {
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
};

quakeMap = async () => {
    let eLocations = await geoLoc();
    console.log("Earthwuake Locations >>> ", eLocations);
    let markerClusterLayer = L.markerClusterGroup();
    L.geoJSON(eLocations).addTo(markerClusterLayer);

    markerClusterLayer.addTo(map);
}

layerDemo = () => {
    document.querySelector('#toggle-btn').addEventListener('click', function(){
        // use hasLayer() to check if the map already have the shopping layer group
        // reminder: group2 contains all the circles
                if (map.hasLayer(group2)) {
                    map.removeLayer(group2);
                } else {
                    map.addLayer(group2);
                }
        }
    )
    let group= L.layerGroup(); // 1. create the layer group
    L.marker(getRandomLatLng(map)).addTo(group);  // 2. add markers to the group
    L.marker(getRandomLatLng(map)).addTo(group);
    L.marker(getRandomLatLng(map)).addTo(group);

    // add the group layer to the map
    group.addTo(map); // 3. add the layer to the map

    let group2 = L.layerGroup();
    for (let i = 0; i < 5; i++) {
        L.circle(getRandomLatLng(map), {
        color: 'red',
        fillColor:"orange",
        fillOpacity:0.5,
        radius: 500
    }).addTo(group2);
    }

    let group3 = L.layerGroup();
    for (let i = 0; i < 5; i++) {
        L.circle(getRandomLatLng(map), {
        color: 'red',
        fillColor:"green",
        fillOpacity:0.5,
        radius: 250
    }).addTo(group3);
    }

    let baseLayers ={
        'Markers': group,
        'Circles': group2
    }
    
    let overlays = {
        'Green Circle':group3
    }

    L.control.layers(baseLayers, overlays).addTo(map);
}

let singapore = [ 1.29,103.85]; // Singapore latlng
let map;
switch(environment){
    case 1:
        setMap(1.29, 103.85, 13, 0, 18);
        clusterRandom();
        break;
    case 2:
        setMap(1.29, 103.85, 13, 0, 18);
        taxiMap();
        break;
    case 3:
        setMap(0,0, 0, 1, 1);
        quakeMap();
        break;
    case 4:
        setMap(1.29, 103.85, 13, 0, 18);
        layerDemo();
        break;
}

function setMap(lat, long, zoom, minZoom, maxZoom){
    map = L.map('map').setView([lat, long], zoom);
    // setup the tile layers
    // NOTE: This tile layer code was lifted from Lab 6 as I was having problems with
    // the tile layer code in Lab 3.
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
        minZoom: minZoom,
        maxZoom: maxZoom,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoiZXh0cmFrdW4iLCJhIjoiY2swdnZtMWVvMTAxaDNtcDVmOHp2c2lxbSJ9.4WxdONppGpMXeHO6rq5xvg'
    }).addTo(map);
}