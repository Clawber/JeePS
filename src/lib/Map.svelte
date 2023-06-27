<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';
  import {IKOTRoutePoints, SMPANTRANCORoutePoints, TOKIDAYRoutePoints, TOKINIGHTRoutePoints, PHILCOADAYRoutePoints, PHILCOANIGHTRoutePoints, KATIPUNANDAYRoutePoints, KATIPUNANNIGHTRoutePoints} from './jeepRoutes.js';

  const DEV = false;
  // For development, use 'http://localhost:8080/api/jeeps/jeepney'
  // For production, use 'https://jeeps-alt.onrender.com/api/jeeps/jeepney'
  const GET_ALL_JEEPNEYS_URL = DEV ? 'http://localhost:8080/api/jeeps/jeepney' : 'https://jeeps-alt.onrender.com/api/jeeps/jeepney'

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

      // TILELAYERS
      var tileLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      var tileDark = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        subdomains: 'abcd',
        accessToken: '9fOCsMcK18SMc09DhrvoFakvomCQptCvmQibfQ8486sAjaENeb8QOzKFAwyf8Vau'
      });

      const mapOptions = {
        maxBounds: bounds,
        maxZoom: 18,
        minZoom: 10,
        center: L.latLng(14.6524,121.0681),
        zoom: 16,
        zoomSnap: 0.25,
        wheelPxPerZoomLevel: 120,
        layers: [tileLight, tileDark]
      }
      
      // Instantiate map and add desired tile layer (routes and markers to follow)
      map = L.map(mapElement, mapOptions)

      var tiles = {
        "Light Mode": tileLight,
        "Dark Mode": tileDark
      }

      // TODO: Dark mode toggle
      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      //   attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      // }).addTo(map);

      L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
        attribution: '<a href="http://jawg.io" title="Tiles Courtesy of Jawg Maps" target="_blank">&copy; <b>Jawg</b>Maps</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 22,
        subdomains: 'abcd',
        accessToken: '9fOCsMcK18SMc09DhrvoFakvomCQptCvmQibfQ8486sAjaENeb8QOzKFAwyf8Vau'
      }).addTo(map);

      // Define Jeepney Class (represented by marker on map)

      var jeepTag = L.Icon.extend({
        options: {
          iconSize:     [80, 96], // size of the icon
          iconAnchor:   [40, 88], // point of the icon which will correspond to marker's location
          popupAnchor:  [0, -68] // point from which the popup should open relative to the iconAnchor
        }
      });

      class Jeep {
        constructor(map, details) {
          this.map = map;
          this.id = details.id;
          this.platenumber = details.platenumber;
          this.capacity = details.capacity;
          this.coords = details.coords ? L.latLng(details.coords.x, details.coords.y) : 'Undefined';
          this.drivername = details.Driver ? (details.Driver.firstname + ' ' + details.Driver.lastname) : 'Undefined';
          this.routeid = details.routeid ? details.routeid : 'Undefined';
          this.routename = details.Route ? details.Route.name : 'Undefined';

          // Map this Jeep to a marker of its own
          this.marker = new L.Marker(details.coords ? this.coords : L.latLng(14.65491, 121.06862),
                        {icon: new jeepTag({iconUrl: `../tags/${this.routename}.png`})});
          this.marker.addTo(this.map);
          this.popup();
        }

        set(details) {
          this.platenumber = details.platenumber;
          this.capacity = details.capacity;
          this.coords = details.coords ? L.latLng(details.coords.x, details.coords.y) : 'Undefined';
          this.drivername = details.Driver ? (details.Driver.firstname + ' ' + details.Driver.lastname) : 'Undefined';
          this.routeid = details.routeid ? details.routeid : 'Undefined';
          this.routename = details.Route ? details.Route.name : 'Undefined';

          this.marker.setLatLng(details.coords ? this.coords : L.latLng(14.65491, 121.06862));
          this.popup();
        }

        popup() {
          this.marker.bindPopup(
            `Jeepney ID: ${this.id} <br>
             Plate Number: ${this.platenumber}<br>
             Capacity: ${this.capacity}<br>
             Driver Name: ${this.drivername}<br>
             Route Name: ${this.routename}<br>
             Coords: (${this.coords.lat},${this.coords.lng})<br>`
            );
        }
      }

      var jeepneys = [];   // store instances in array, push here new jeepneys

      // Function for updating markers in bulk
      function updateJeeps() {
        fetch(GET_ALL_JEEPNEYS_URL).then((res) => {
            res.json().then(async (data) => {
              data.ret.forEach((jeep) => {
                let found = jeepneys.find(elem => elem.id === jeep.id);
                if (found === undefined) {
                  jeepneys.push(new Jeep(map, jeep));
                } else {
                  found.set(jeep);
                }
              })
            })
          })
      }

      // Fetch all jeepneys and instantiate each jeepney
      // API returns array of jeepneys
      await fetch(GET_ALL_JEEPNEYS_URL).then((res) => {
        console.log(res)
        res.json().then((data) => {
          data.ret.forEach((jeep) => {
            jeepneys.push(new Jeep(map, jeep));
          })
        }).then(() => {
          console.log(jeepneys);
          setInterval(updateJeeps, 1000 * 3)
        })
      })

      // TODO: Add orientation (arrows) to route
      class Route {

      }
      // Function addRoutes
      function addRoutes(map) {
        var IKOTRoute = L.polyline(IKOTRoutePoints, {color: '#ffcd32', weight: 5, smoothFactor: 3}).addTo(map);
        var SMPANTRANCORoute = L.polyline(SMPANTRANCORoutePoints, {color: '#329a9a', weight: 5, smoothFactor: 3})
        var TOKIDAYRoute = L.polyline(TOKIDAYRoutePoints, {color: '#f68c34', weight: 5, smoothFactor: 3})
        var TOKINIGHTRoute = L.polyline(TOKINIGHTRoutePoints, {color: '#88202c', weight: 5, smoothFactor: 3})
        var PHILCOADAYRoute = L.polyline(PHILCOADAYRoutePoints, {color: '#98cd67', weight: 5, smoothFactor: 3})
        var PHILCOANIGHTRoute = L.polyline(PHILCOANIGHTRoutePoints, {color: '#0f6752', weight: 5, smoothFactor: 3})
        var KATIPUNANDAYRoute = L.polyline(KATIPUNANDAYRoutePoints, {color: '#e42f59', weight: 5, smoothFactor: 3})
        var KATIPUNANNIGHTRoute = L.polyline(KATIPUNANNIGHTRoutePoints, {color: '#663367', weight: 5, smoothFactor: 3})

        var jeepRoutes = {
          "Ikot" : IKOTRoute,
          "SM North - Pantranco" : SMPANTRANCORoute,
          "Toki - Day" : TOKIDAYRoute,
          "Toki - Night" : TOKINIGHTRoute,
          "Philcoa - Day" : PHILCOADAYRoute,
          "Philcoa - Night" : PHILCOANIGHTRoute,
          "Katipunan - Day" : KATIPUNANDAYRoute,
          "Katipunan - Night" : KATIPUNANNIGHTRoute,
        }
        L.control.layers(tiles, jeepRoutes).addTo(map);
      }

      addRoutes(map);

      map.on('click', function(ev){
        var latlng = map.mouseEventToLatLng(ev.originalEvent);
      });

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