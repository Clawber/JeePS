let mapOptions = {
  center:[14.65504,121.06871],
  zoom:17
}

let map = new L.map('map' , mapOptions);

function addMarker(map,coordinates) {
  let marker = new L.Marker(coordinates);
  marker.addTo(map);
}

function addRoutes(map) {
  var ikotRoutePoints = [
    [14.65764329,	121.062349],
    [14.65754914,	121.0685395],
    [14.65942819,	121.0685395],
    [14.65945055,	121.0726833],
    [14.65753149,	121.0727345],
    [14.6575533,	121.0742258],
    [14.65356657,	121.0742794],
    [14.6535254,	121.0728096],
    [14.65210307,	121.0728096],
    [14.65094052,	121.0712646],
    [14.65037956,	121.0712217],
    [14.65056726,	121.0737644],
    [14.64827247,	121.0737752],
    [14.64790957,	121.0718654],
    [14.64719375,	121.070181],
    [14.64722455,	121.0678958],
    [14.64797239,	121.0659217],
    [14.64728358,	121.0623173],
    [14.65764329,	121.062349]
  ];

  var polyline = L.polyline(ikotRoutePoints, {color: 'yellow'}).addTo(map);

}

function displayMap() {
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);

  coordinates = [14.65454, 121.06652]
  addMarker(map, coordinates)
  coordinates = [14.65496,121.06436]
  addMarker(map, coordinates)
  addRoutes(map)
}



displayMap()



