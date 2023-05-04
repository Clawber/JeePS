// Note, added these fields to package.json "type": "module", "main": "script.js",
// DESCRIPTION: SIRA
// import * as db from '/public/db.js';
var currentikotRoutePoints = [
  [14.654787833877382, 121.06231633947266],
  [14.652934367152321, 121.0623185631908],
  [14.650677766187137, 121.06236274999226],
  [14.649611464678982, 121.06230370560867],
  [14.64734079631258, 121.06234307190255],
  [14.647712102528592, 121.06385850423928],
  [14.647697821411343, 121.06427672470892],
  [14.64767877829581, 121.0646359021624],
  [14.647807309146891, 121.06537885865805],
  [14.647988200694943, 121.06599388785833],
  [14.6479215569597, 121.06640718894404],
  [14.647226548271563, 121.06789310211127],
  [14.64718370502912, 121.0689706347692],
  [14.648930744539125, 121.0689706360126],
  [14.650287425463494, 121.06848353195251],
  [14.651001465520666, 121.06842448877318],
  [14.652472381063792, 121.06866558095453],
  [14.652530082027512, 121.07170827440761],
  [14.653903896804978, 121.07166246942026],
  [14.653942672001572, 121.07274750991797],
  [14.654552022381466, 121.0731139626612],
  [14.655471585317198, 121.07312541542382],
  [14.65593136456072, 121.07295077764707],
  [14.656114167911923, 121.07282767252224],
  [14.656274814472436, 121.07277327500216],
  [14.657536377886018, 121.07274861724157],
  [14.659375473174784, 121.0727257166097],
  [14.659425327795493, 121.07250813528624],
  [14.659400400504174, 121.06855446240188],
  [14.659040338567142, 121.06853728514182],
  [14.657536378470509, 121.06857736787227],
  [14.657573225765375, 121.06575860964738],
  [14.657570455777524, 121.0647909479622],
  [14.657681245513706, 121.06354844803548],
  [14.657689554282829, 121.06235175370882],
  [14.656828166592991, 121.06232598753893],
  [14.654962559827988, 121.06233415203758],
  [14.654787833877382, 121.06231633947266]
];

var IKOTicon = L.icon({
  iconUrl: 'jeep marker try.png',

  iconSize:     [60, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


var IKOTicon = L.icon({
  iconUrl: 'jeep marker try.png',

  iconSize:     [60, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

// GET request using fetch()
const URL = 'https://jeeps-api.onrender.com/api/jeeps'
// const url = 'http://localhost:3000/api/jeeps'

class Jeep {
  constructor(map, route, index) {
    this.map = map
    this.route = route
    this.index = index
    //this.marker = new L.Marker(this.route[0])
    this.marker = new L.Marker((this.route[0]), {icon: IKOTicon})
    // console.log(`${index}`);
  }

  usad() {
    // console.log(`usad, index = ${this.index}`);
    this.marker.remove(this.map)
    this.index += 1
    this.marker = new L.Marker(this.route[ (this.index ) %(this.route.length)], {icon: IKOTicon});
    this.marker.addTo(this.map);
  }


/*
getCoords() {
    const res = client.query('SELECT * FROM tracker WHERE ID = 1', (err, res) => {
        if (!err) {
            console.log(res.rows);
        } else {
            console.log(err.message);
        }
        client.end()
    });
  }
*/


  // vroom() {
  //   // setInterval(function () {usad()}, 1000);    
  //   setInterval(function() {console.log("Hello");}, 1000 )
  //   setInterval(this.usad(), 1000);    
  // }

  // call every 2 seconds
  move_online_jeep(id) {
    let result = ""
    
    fetch(URL + "/" + id)
      // .then(commits => console.log(commits));
      .then((response) => response.json())
      .then((data) => {
        // result = output of url/id
        result=data;
        let new_coord = [result.coords[0], result.coords[1]]
        // console.log(new_coord);

        this.marker.remove(this.map)
        this.index += 1
        this.marker = new L.Marker(new_coord);
        this.marker.addTo(this.map);
    })
  }
}


let mapOptions = {
  center:[14.65504,121.06871],
  zoom:15,
  zoomControl: false
}

// setup (1 lang muna ginawa ko sa driverNum)
let driverNum = 1;
let coordinates = [];
let markers = [];//(nakamap dito yung kada isang markers para pwedeng maremove at update)
for (let i=0; i<driverNum; i++){
  coordinates[i] = [];
}

let map = new L.map('map' , mapOptions);






function addRoutes(map) {
  //var ikotRoute = L.polyline(ikotRoutePoints, {color: 'yellow'}).addTo(map);
  //var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
  //var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);
  var currentikotroute = L.polyline(currentikotRoutePoints, {color: 'maroon'}).addTo(map);

  //var jeepRoutes = {
    //"Ikot" : ikotRoute,
    //"Ikot(Night)" : ikotEveningRoute,
    //"Toki" : tokiRoute,
    
  //}
  //L.control.layers(null, jeepRoutes).addTo(map);
}



function addMarker(map, coordinates, i) {
  markers[i] = new L.Marker(coordinates);
  markers[i].addTo(map);
}

//update lang sa marker, assuming na may bago nang coordinates
function updateMarker(map, coordinates, i){
  markers[i].remove(map);
  // console.log(coordinates);
}



// function addRoutes(map) {
//   // var ikotRoute = L.polyline(ikotRoutePoints, {color: 'yellow'}).addTo(map);
//   // var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
//   // var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);

//   var jeepRoutes = {
//     "Ikot" : ikotRoute,
//     "Ikot(Night)" : ikotEveningRoute,
//     "Toki" : tokiRoute,
//   }
//   L.control.layers(null, jeepRoutes).addTo(map);
// }

function displayMap() {
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);

  //Make Jeeps that move around
  let Jeep1 = new Jeep(map, currentikotRoutePoints, 500000);  
  setInterval(function () {Jeep1.usad()}, 60);   
  //let Jeep2 = new Jeep(map, ikotEveningRoutePoints, 100);  
  //setInterval(function () {Jeep2.usad()}, 50);    
  //let Jeep3 = new Jeep(map, ikotRoutePoints, 1000);  
  //setInterval(function () {Jeep3.usad()}, 55);    

  let Jeep4 = new Jeep(map, currentikotRoutePoints, 1000);    // changed to currentikotRoutePoints
  setInterval(function () {Jeep4.move_online_jeep(1)}, 1000)

  addRoutes(map);
}




displayMap();
