/*Create the map*/
var mymap = L.map('mapid').setView([45.7670562,4.8705643], 14);

var loc = [45.75231328094806, 4.8564025543870155];
var fire_dim = 50

/*Add map tiles*/
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    /*Account Mapbox*/
    accessToken: 'pk.eyJ1IjoibG9pY2JydW5vIiwiYSI6ImNramw3OG1mMzM5M3QydXNjeDJ1NXM1enAifQ.2edbMGFjSdeR75h8zAPfJw'
}).addTo(mymap);

/*Add fire*/
var circle = L.circle(([loc[0], loc[1]]), {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: fire_dim
}).addTo(mymap);