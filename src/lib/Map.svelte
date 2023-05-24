<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, currentikotRoutePoints } from './jeepRoutes.js'
  import jeep_marker from '$lib/images/jeep_marker.png'


  let mapElement;
  let map;

  onMount(async () => {
    if(browser) {



// import leaflet
const leaflet = await import('leaflet');

// map initialization
let mapOptions = {
  center:[14.65504,121.06871],
  zoom:15
}

map = leaflet.map(mapElement, mapOptions)

leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);





var IKOTicon = L.icon({
  iconUrl: jeep_marker,
  iconSize:     [60, 60], // size of the icon
  //shadowSize:   [50, 64], // size of the shadow
  iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
  //shadowAnchor: [4, 62],  // the same for the shadow
  popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});


// GET request using fetch()
const URL = 'https://jeeps-api.onrender.com/api/jeeps'




// Jeeps logic start
//----------------------------------------------------------------
class Jeep {
  constructor(map, route, index) {
    this.map = map
    this.route = route
    this.index = index
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

  move_online_jeep(id) {
    let result = ""
    
    fetch(URL + "/" + id)
      // .then(commits => console.log(commits));
      .then((response) => response.json())
      .then((data) => {
        // result = output of url/id
        result=data;
        console.log(result);
        let new_coord = [result.coords[0], result.coords[1]]

        // console.log(new_coord);
        // this.marker.remove(this.map)
        // this.index += 1
        // this.marker = new L.Marker(this.route[ (this.index ) %(this.route.length)], {icon: IKOTicon});
        // this.marker.addTo(this.map);

        // console.log(this.route[ (this.index ) %(this.route.length)]);


        this.marker.remove(this.map)
        this.marker = new L.Marker(new_coord, {icon: IKOTicon});
        this.marker.addTo(this.map);
    })
  }

}


// setup (1 lang muna ginawa ko sa driverNum)
let driverNum = 1;
let coordinates = [];
let markers = [];//(nakamap dito yung kada isang markers para pwedeng maremove at update)
for (let i=0; i<driverNum; i++){
  coordinates[i] = [];
}

function addRoutes(map) {
  var ikotRoute = L.polyline(currentikotRoutePoints, {color: 'yellow'}).addTo(map);
  // var ikotRouteOld = L.polyline(ikotRoutePoints, {color: 'blue'}).addTo(map);
  // var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
  // var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);
  

  var jeepRoutes = {
    "Ikot" : ikotRoute,
    "Ikot(Old)" : ikotRouteOld,
    "Ikot(Night)" : ikotEveningRoute,
    "Toki" : tokiRoute,
  }
  // var layerControl = L.control.layers(null, jeepRoutes).addTo(map);

}


function displayMap() {
  let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
  map.addLayer(layer);

  //Make Jeeps that move around
  // let Jeep1 = new Jeep(map, tokiRoutePoints, 500);  
  // setInterval(function () {Jeep1.usad()}, 60);   
  // let Jeep2 = new Jeep(map, ikotEveningRoutePoints, 100);  
  // setInterval(function () {Jeep2.usad()}, 50);    
  // let Jeep3 = new Jeep(map, ikotRoutePoints, 1000);  
  // setInterval(function () {Jeep3.usad()}, 55);    

  let Jeep1 = new Jeep(map, ikotRoutePoints, 1000);
  setInterval(function () {Jeep1.move_online_jeep(1)}, 1000)

  let Jeep2 = new Jeep(map, ikotRoutePoints, 1000);
  setInterval(function () {Jeep2.move_online_jeep(2)}, 1000)

  let Jeep3 = new Jeep(map, ikotRoutePoints, 1000);
  setInterval(function () {Jeep3.move_online_jeep(3)}, 1000)

  addRoutes(map);

  map.on('click', function(ev){
    var latlng = map.mouseEventToLatLng(ev.originalEvent);
    // console.log(latlng.lat + ', ' + latlng.lng);
  });

}



displayMap()





// --------------------------------------------------------------------------------
// Jeeps logic end















    }
  });

  onDestroy(async () => {
    if(map) {
      console.log('Unloading Leaflet map.');
      map.remove();
    }
  });
</script>


<main>
  <div bind:this={mapElement}></div>
</main>

<style>
  /* leaflet css */
  @import 'leaflet/dist/leaflet.css';
  main div {
      height: 800px;
  }
</style>
