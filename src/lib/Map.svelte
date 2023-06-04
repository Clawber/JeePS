<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import {ikotRoutePoints, ikotEveningRoutePoints, tokiRoutePoints, currentikotRoutePoints } from './jeepRoutes.js';
  import jeepMarker from '$lib/images/jeep_marker.png';

  const getCoordsURL = 'https://jeeps-alt.onrender.com/api/jeeps' // backend
  const getAllJeepneysURL = 'https://jeeps-alt.onrender.com/api/jeeps/jeepney'

  // promise based function
  async function getCoords() {
    const response = await fetch(getCoordsURL);
    const coords = await response.json().coords;
    return coords;
  }

  let mapElement;
  let map;

  onMount(async () => {
    if (browser) {
      const L = await import('leaflet');

      // Leaflet Map initialization
      // Set up Map Options
      const southWest = L.latLng(14.28654, 120.80366);
      const northEast = L.latLng(14.84474, 121.27631);
      const bounds = L.latLngBounds(southWest, northEast);

      const mapOptions = {
        maxBounds: bounds,
        maxZoom: 18,
        minZoom: 10,
        center: L.latLng(14.6524,121.0681),
        zoom: 16,
        zoomSnap: 0.25,
        wheelPxPerZoomLevel: 120
      }
      
      // Instantiate map and add desired tile layer (routes and markers to follow)
      map = L.map(mapElement, mapOptions)

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      
      // Define Jeepney Class (represented by marker on map)
      // All markers in all routes currently have same icon (lack of assets)
      var jeepIcon = L.icon({
        iconUrl: jeepMarker,
        iconSize:     [60, 60], // size of the icon
        iconAnchor:   [30, 60], // point of the icon which will correspond to marker's location
        popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
      });

      class Jeep {
        constructor(map, details) {
          this.map = map;
          this.id = details.id;
          this.platenumber = details.platenumber;
          this.capacity = details.capacity;
          this.coords = L.latLng(details.coords.x, details.coords.y);   // TODO: Round either in backend or here
          this.driver = details.driverid;
          this.route = details.routeid;

          // Map this Jeep to a marker of its own
          this.marker = new L.Marker(this.coords, {icon: jeepIcon});
          this.marker.addTo(this.map);
          this.popup();
        }

        set(details) {
          this.capacity = details.capacity;
          this.coords = L.latLng(details.coords.x, details.coords.y);
          this.driver = details.driverid;
          this.route = details.routeid;
          
          this.marker.setLatLng(this.coords);
          this.popup();
        }

        popup() {
          this.marker.bindPopup(
            `JeepneyID: ${this.id} <br>
             Plate Number: ${this.platenumber}<br>
             Capacity: ${this.capacity}<br>
             Lat: ${this.coords.lat}<br>
             Long: ${this.coords.lng}<br>
             DriverID: ${this.driver}<br>
             RouteID: ${this.route}`);
        }
      }

      var jeepneys = [];   // store instances in array

      // Function for updating markers in bulk
      function updateJeeps() {
        fetch(getAllJeepneysURL).then((res) => {
            res.json().then(async (data) => {
              data.ret.forEach((jeep) => {
                jeepneys.find(elem => elem.id == jeep.id)
                .set(jeep);
              })
            })
          })
      }

      // Fetch all jeepneys and instantiate each jeepney
      // API returns array of jeepneys
      await fetch(getAllJeepneysURL).then((res) => {
        console.log(res)
        res.json().then((data) => {
          data.ret.forEach((jeep) => console.log(jeep))
          data.ret.forEach((jeep) => {
            jeepneys.push(new Jeep(map, jeep));
          })
        }).then(() => {
          setInterval(updateJeeps, 1000 * 3)
        })
      })

      // Function addRoutes
      function addRoutes(map) {
        var ikotRoute = L.polyline(currentikotRoutePoints, {color: 'yellow'}).addTo(map);
        // var ikotRouteOld = L.polyline(ikotRoutePoints, {color: 'blue'}).addTo(map);
        // var ikotEveningRoute = L.polyline(ikotEveningRoutePoints, {color: 'violet'}).addTo(map);
        // var tokiRoute = L.polyline(tokiRoutePoints, {color: 'orange'}).addTo(map);

        var jeepRoutes = {
          "Ikot" : ikotRoute
        }
      }

      addRoutes(map);

      // map.on('click', function(ev){
      //   var latlng = map.mouseEventToLatLng(ev.originalEvent);
      // });

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