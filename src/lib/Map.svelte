<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, currentikotRoutePoints } from './jeepRoutes.js';
  import jeep_marker from '$lib/images/jeep_marker.png';

  const debug = false;
  const testUrl = 'http://localhost:8080/api/jeeps'
  const apiUrl = 'https://jeeps-alt.onrender.com/api/jeeps' // backend

  // promise based function
  async function get_coords_from_api() {
    const response = await fetch(`${(debug ? testUrl : apiUrl)}`);
    const coords = await response.json();
    return coords;
  }

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
        // maxBounds: bounds,
        maxZoom: 19,
        minZoom: 10,
        center: [14.6517,121.0681],
        zoom: 16
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
          // "Ikot(Old)" : ikotRouteOld,
          // "Ikot(Night)" : ikotEveningRoute,
          // "Toki" : tokiRoute,
        }
        // var layerControl = L.control.layers(null, jeepRoutes).addTo(map);

      }

    class Jeep {
      constructor(map, route, index, mode, id) {
        this.map = map
        this.route = route
        this.index = index
        this.marker = new L.Marker((this.route[0]), {icon: IKOTicon})
        // console.log(`${index}`);

        if (mode === "online") {
          let new_coords 
          get_coords_from_api(id)
          .then((data) => {
            new_coords = L.latLng(data.coords.x, data.coords.y)
            this.marker = new L.Marker(new_coords, {icon: IKOTicon}).bindPopup('Test').openPopup();
            this.marker.addTo(this.map);
          })
        }
      }



    move_online_jeep(id) {
      let new_coords 
      get_coords_from_api(id)
        .then((data) => {
          new_coords = [data.coords.x, data.coords.y]
          this.marker.setLatLng(new_coords)  
        })
    }
  }

      function displayMap() {
        let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
        map.addLayer(layer);

        let Jeep1 = new Jeep(map, ikotRoutePoints, 1000, "online", 1);
        setInterval(() => Jeep1.move_online_jeep(1), 5000)

        let Jeep2 = new Jeep(map, ikotRoutePoints, 1000, "online", 2);
        setInterval(() => Jeep2.move_online_jeep(2), 5000)

        let Jeep3 = new Jeep(map, ikotRoutePoints, 1000, "online", 3);
        setInterval(() => Jeep3.move_online_jeep(3), 5000)

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