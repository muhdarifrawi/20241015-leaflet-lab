let singapore = [ 1.29,103.85]; // #1 Singapore latlng
let map = L.map('map').setView(singapore, 12); // #2 Set the center point

// setup the tile layers
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', 
    { 
        maxZoom: 19, 
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>' 
    }).addTo(map);


let singaporeMarker = L.marker([1.29, 103.85]);

singaporeMarker.addTo(map);

singaporeMarker.bindPopup("<p>Singapore</p>");

singaporeMarker.addEventListener('click', function(){
    alert("Singapore");
});

let circle = L.circle([1.35166526, 103.773663572], {
    color: 'red',
    fillColor:"orange",
    fillOpacity:0.5,
    radius: 500
})

// add it to the map
circle.addTo(map);

let singaporeZoo = L.marker([1.4044986571793008, 103.79305517871434]);
let singaporeDiscoveryCenter = L.marker([1.332851287671395, 103.67893246337191]);
let singaporeBirdPark = L.marker([1.3189210185617706, 103.70645242104315]);

singaporeZoo.addTo(map);
singaporeDiscoveryCenter.addTo(map);
singaporeBirdPark.addTo(map);

singaporeZoo.bindPopup("<p>Singapore Zoo</p>");
singaporeDiscoveryCenter.bindPopup("<p>Singapore Discovery Center</p>");
singaporeBirdPark.bindPopup("<p>Jurong Bird Park</p>");

