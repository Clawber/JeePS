import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints} from './jeepRoutes.js'

let mapOptions = {
  center:[14.65504,121.06871],
  zoom:15
}

let map = new L.map('map' , mapOptions);

function addMarker(map,coordinates) {
  let marker = new L.Marker(coordinates);
  marker.addTo(map);
}

function addRoutes(map) {
  var ikotRoute = L.polyline(ikotRoutePoints, {color: 'yellow'}).addTo(map);
  var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
  var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);

  var jeepRoutes = {
    "Ikot" : ikotRoute,
    "Ikot(Night)" : ikotEveningRoute,
    "Toki" : tokiRoute,
  }
  var layerControl = L.control.layers(null, jeepRoutes).addTo(map);

}

function displayMap() {
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);

  let coordinates = [14.65454, 121.06652]
  addMarker(map, coordinates)
  coordinates = [14.65496,121.06436]
  addMarker(map, coordinates)
  addRoutes(map)

  map.on('click', function(ev){
    var latlng = map.mouseEventToLatLng(ev.originalEvent);
    console.log(latlng.lat + ', ' + latlng.lng);
  });
}



displayMap()



