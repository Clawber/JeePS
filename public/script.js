import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, } from './jeepRoutes.js'


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
  zoom:15
}

// setup (1 lang muna ginawa ko sa driverNum)
let driverNum = 1;
let coordinates = [];
let markers = [];//(nakamap dito yung kada isang markers para pwedeng maremove at update)
for (let i=0; i<driverNum; i++){
  coordinates[i] = [];
}

let map = new L.map('map' , mapOptions);



function addMarker(map, coordinates, i) {
  markers[i] = new L.Marker(coordinates);
  markers[i].addTo(map);
}

//update lang sa marker, assuming na may bago nang coordinates
function updateMarker(map, coordinates, i){
  markers[i].remove(map);
  // console.log(coordinates);




function addRoutes(map) {
  var ikotRoute = L.polyline(ikotRoutePoints, {color: 'yellow'}).addTo(map);
  var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
  var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);

  var jeepRoutes = {
    "Ikot" : ikotRoute,
    "Ikot(Night)" : ikotEveningRoute,
    "Toki" : tokiRoute,
  }
  L.control.layers(null, jeepRoutes).addTo(map);

}

function displayMap() {
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);

  //Make Jeeps that move around
  let Jeep1 = new Jeep(map, tokiRoutePoints, 500);  
  setInterval(function () {Jeep1.usad()}, 60);   
  let Jeep2 = new Jeep(map, ikotEveningRoutePoints, 100);  
  setInterval(function () {Jeep2.usad()}, 50);    
  let Jeep3 = new Jeep(map, ikotRoutePoints, 1000);  
  setInterval(function () {Jeep3.usad()}, 55);    

  let Jeep4 = new Jeep(map, ikotRoutePoints, 1000);
  setInterval(function () {Jeep4.move_online_jeep(1)}, 1000)

  addRoutes(map);
}








displayMap()

