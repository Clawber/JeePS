// export function addRoutes(map) {
//   var ikotRoute = L.polyline(ikotRoutePoints, {color: 'blue'}).addTo(map);
//   var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
//   var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);
//   var IKOTRoute = L.polyline(IKOTRoutePoints, {color: 'yellow'}).addTo(map);
  

//   var jeepRoutes = {
//     "Ikot" : IKOTRoute,
//     "Ikot(old)" : ikotRoute,
//     "Ikot(Night)" : ikotEveningRoute,
//     "Toki" : tokiRoute,
//   }
//   var layerControl = L.control.layers(null, jeepRoutes).addTo(map);

// }


// export function displayMap() {
//   let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
//   map.addLayer(layer);

//   //Make Jeeps that move around
//   let Jeep1 = new Jeep(map, tokiRoutePoints, 500);  
//   setInterval(function () {Jeep1.usad()}, 60);   
//   let Jeep2 = new Jeep(map, ikotEveningRoutePoints, 100);  
//   setInterval(function () {Jeep2.usad()}, 50);    
//   let Jeep3 = new Jeep(map, ikotRoutePoints, 1000);  
//   setInterval(function () {Jeep3.usad()}, 55);    

//   addRoutes(map);

//   map.on('click', function(ev){
//     var latlng = map.mouseEventToLatLng(ev.originalEvent);
//     // console.log(latlng.lat + ', ' + latlng.lng);
//   });

// }



// export default {addRoutes, displayMap};