<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, currentikotRoutePoints } from './jeepRoutes.js';
  import jeep_marker from '$lib/images/jeep_marker.png';

  let mapElement;
  let map;

  onMount(async () => {
    if (browser) {
      const leaflet = await import('leaflet');

      // Leaflet Map initialization
      // Set up map options
      const southWest = L.latLng(14.6405,121.0542),
          northEast = L.latLng(14.6618,121.0819),
          bounds = L.latLngBounds(southWest, northEast);

      let mapOptions = {
        maxBounds: bounds,
        maxZoom: 19,
        minZoom: 10,
        center: [14.6551,121.0684],
        zoom: 15
      }
      
      // Instantiate map
      map = leaflet.map(mapElement, mapOptions)

      leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      var IKOTicon = L.icon({
        iconUrl: jeep_marker,
        iconSize:     [60, 60], // size of the icon
        iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

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
      
        // Backend server (also hosts the frontend);
  const URL = 'https://jeeps-api.onrender.com/api/jeeps';

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
    this.marker = new L.Marker(this.route[ (this.index) %(this.route.length)], {icon: IKOTicon});
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

        this.marker.remove(this.map)
        this.marker = new L.Marker(new_coord, {icon: IKOTicon}).bindPopup('Test').openPopup();
        this.marker.addTo(this.map);
        })
  }
}

      function displayMap() {
        let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        map.addLayer(layer);

        let Jeep1 = new Jeep(map, ikotRoutePoints, 1000);
        setInterval(() => Jeep1.move_online_jeep(1), 1000)

        let Jeep2 = new Jeep(map, ikotRoutePoints, 1000);
        setInterval(() => Jeep2.move_online_jeep(2), 1000)

        let Jeep3 = new Jeep(map, ikotRoutePoints, 1000);
        setInterval(() => Jeep3.move_online_jeep(3), 1000)

        addRoutes(map);

        map.on('click', function(ev){
          var latlng = map.mouseEventToLatLng(ev.originalEvent);
        });

      }
      
      displayMap()
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
  @import 'leaflet/dist/leaflet.css';
  main div {
    height: 800px;
  }
</style>