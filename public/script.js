// REQUIREMENTS AND INSTANTIATIONS
const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db.js")

// Start server on client's IP address.
// ...

// MIDDLEWARE
app.use(cors());
app.use(express.json());  // req.body

// TODO: CRUD ROUTS (ignore for testing)
// Create a Driver Entry
// Note: Postman can be used for testing HTTP requests
app.post("/driver", async (req, res) => {
  try {
    const { firstname, lastname } = req.body;
    const newDriver = await client.query (
      "INSERT INTO driver (firstname, lastname) VALUES ($1, $2)",
      [firstname, lastname]
    );
    
    res.json();
  } catch (err) {
    console.error(err.message);
  }
});

// Create a Tracker Entry

// Create a Path Entry

// Create a Jeepney Entry (FKs Driver, Tracker, and Path)

const serverIP = "localhost";
const port = "5000";

// NOTE: Hardcode serverIP to always use the same one on build so no
// need to change every time WiFi connection is changed. Might require
// IP getter API.
// NOTE: Stop using PHP local dev server, use this server manager
// or npm run serve instead
app.listen(port, serverIP, () => {
    console.log(`Server has started on address ${serverIP}, port ${port}.`);
});

import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, } from './jeepRoutes.js'

var IKOTicon = L.icon({
  iconUrl: 'jeep marker try.png',

  iconSize:     [60, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

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

  // For fetching coords from database
  getCoords() {
    
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

  addRoutes(map);
}

displayMap()

