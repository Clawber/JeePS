<script>
  import { onMount, onDestroy } from 'svelte';
  import { browser } from '$app/environment';

  const DEV = false;
  // For development, use 'http://localhost:8080/api/jeeps/jeepney'
  // For production, use 'https://jeeps-alt.onrender.com/api/jeeps/jeepney'
  const GET_ALL_JEEPNEYS_URL = DEV ? 'http://localhost:8080/api/jeeps/jeepney' : 'https://jeeps-alt.onrender.com/api/jeeps/jeepney'
  const GET_ALL_ROUTES_URL = DEV ? 'http://localhost:8080/api/jeeps/route' : 'https://jeeps-alt.onrender.com/api/jeeps/route'

  let mapElement;
  let map;

  onMount(async () => {
    if (browser) {
      console.log("Jeep has been mounted");
      await import('leaflet-polylinedecorator');
      const L = await import('leaflet');
      console.log(L)

      // Leaflet Map initialization
      // Set up Map Options
      const southWest = L.latLng(14.28654, 120.80366);
      const northEast = L.latLng(14.84474, 121.27631);
      const bounds = L.latLngBounds(southWest, northEast);

      // TILELAYERS
      const tileLight = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });

      const tileDark = L.tileLayer('https://{s}.tile.jawg.io/jawg-dark/{z}/{x}/{y}{r}.png?access-token={accessToken}', {
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
        layers: [tileDark]
      }
      
      // Instantiate map and add desired tile layer (routes and markers to follow)
      console.log("new map created");
      map = L.map(mapElement, mapOptions)

      const tiles = {
        "Light Mode": tileLight,
        "Dark Mode": tileDark
      }

        var mapControls = L.control.layers(tiles, null, {sortLayers: true}).addTo(map);

        // Define Jeepney Class (represented by marker on map)
      var jeepTag = L.Icon.extend({
        options: {
          iconSize:     [80, 96], // size of the icon
          iconAnchor:   [40, 88], // point of the icon which will correspond to marker's location
          popupAnchor:  [0, -66] // point from which the popup should open relative to the iconAnchor
        }
      });

      // UP central
      const defaultCoords = L.latLng(14.65491, 121.06862);
      const defaultPolyline = [[14.65387, 121.06861], [14.65615, 121.0686]];

      class Jeep {
        constructor(map, details) {
          this.map = map;
          this.id = details.id;
          this.platenumber = details.platenumber;
          this.capacity = details.capacity;
          this.coords = details.coords ? L.latLng(details.coords.x, details.coords.y) : defaultCoords;
          this.driverid = details.driverid;
          this.drivername = details.Driver.firstname + ' ' + details.Driver.lastname;
          this.routeid = details.routeid;
          this.routename = details.Route.name;

          // Map this Jeep to a marker of its own
          this.marker = new L.Marker(this.coords, {icon: new jeepTag({
                  iconUrl: this.routename ? `../tags/dark/${this.routename}.png` : `../tags/dark/Ikot.png`})});
          // this.marker.addTo(this.map);
          this.popup(details);
        }

        set(details) {
            this.platenumber = details.platenumber;
            this.capacity = details.capacity;
            this.coords = details.coords ? L.latLng(details.coords.x, details.coords.y) : defaultCoords;
            this.driverid = details.driverid;
            this.drivername = details.Driver.firstname + ' ' + details.Driver.lastname;
            this.routeid = details.routeid;
            this.routename = details.Route.name;

            this.marker.setLatLng(details.coords ? this.coords : defaultCoords);
            this.popup(details);
        }

        popup(details) {
          this.marker.bindPopup(
            `Jeepney ID: ${this.id}<br>
             Plate Number: ${this.platenumber}<br>
             Capacity: ${this.capacity ? this.capacity : 'Undefined'}<br>
             Driver Name: ${this.drivername? this.drivername : 'Undefined' }<br>
             Route Name: ${this.routename ? this.routename : 'Undefined'}<br>
             Coords: ${details.coords ? `(${this.coords.lat},${this.coords.lng})` : 'Undefined'}<br>`
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
        // TODO: Fix layer control name (name - Day/Night)

        function convertHex(hexCode, opacity = 1){
            var hex = hexCode.replace('#', '');

            if (hex.length === 3) {
                hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
            }

            var r = parseInt(hex.substring(0,2), 16)-75,
                g = parseInt(hex.substring(2,4), 16)-50,
                b = parseInt(hex.substring(4,6), 16)-75;

            /* Backward compatibility for whole number based opacity values. */
            if (opacity > 1 && opacity <= 100) {
                opacity = opacity / 100;
            }

            return 'rgba('+r+','+g+','+b+','+opacity+')';
        }
        class Route {
          constructor(map, details) {
              this.map = map;
              this.id = details.id;
              this.name = details.name;
              this.color = details.color;
              this.path = details.path ? details.path : defaultPolyline;

              // Map this Route to a Polyline of its own
              this.polyline = new L.Polyline(this.path, {name: this.name, color: this.color, weight: 5, smoothFactor: 3});
              this.decorator = new L.layerGroup()
                  .addLayer(this.polyline)
                  .addLayer(new L.polylineDecorator(this.path, {
                      patterns: [
                          // defines a pattern of 10px-wide dashes, repeated every 20px on the line
                          {offset: 0, repeat: 30, symbol: L.Symbol.arrowHead({pixelSize: 10, pathOptions: {fillOpacity: 0.7, color: convertHex(this.color, 0.9), weight: 0}})}
                      ]
                  }));
              // if (this.name === 'Ikot') this.layerGroup.addTo(map);
              this.popup();
          }

          set(details) {
              this.name = details.name;
              this.color = details.color;
              this.path = details.path ? details.path : defaultPolyline;
              this.polyline.setLatLngs(this.path);
              this.popup();
          }

          // TODO: Show how many jeepneys are in a route for List
          popup() {
              this.polyline.bindPopup(
                  `Route ID: ${this.id}<br>
                 Name: ${this.name}<br>
                 Color: ${this.color}<br>
                 Jeepneys: ${jeepneys.filter(jeep => jeep.routeid === this.id).length}<br>`
              );
          }
      }

      // Merges the Jeep and Route classes together
      class jeepRoute {
          constructor(map, route) {
              this.map = map;
              let jeeps = jeepneys.filter((elem) => elem.routeid === route.id);
              let markers = [];
              jeeps.forEach((elem) => {markers.push(elem.marker)});
              console.log(markers)
              this.group = new L.layerGroup(markers)
                  .addLayer(route.polyline)
                  .addLayer(route.decorator);
              mapControls.addOverlay(this.group, route.name);

              if (route.name === "Ikot") this.group.addTo(map);
          }
      }

        var routes = [];

        function updateRoutes() {
        fetch(GET_ALL_ROUTES_URL).then((res) => {
            res.json().then(async (data) => {
                data.ret.forEach((route) => {
                    let found = routes.find(elem => elem.id === route.id);
                    if (found === undefined) {
                        routes.push(new Route(map, route));
                    } else {
                        found.set(route);
                    }
                })
            })
        })
        }

        // Fetch all routes and instantiate each routes
        // API returns array of routes
        // TODO: Fix sortFunction
        await fetch(GET_ALL_ROUTES_URL).then((res) => {
        console.log(res)
        res.json().then((data) => {
            console.log(data);
            data.ret.forEach((route) => {
                routes.push(new Route(map, route));
            })
        }).then(() => {
            console.log(routes);
            routes.forEach((route) => {
                new jeepRoute(map, route);
            })
            setInterval(updateRoutes, 1000 * 10)
        })
        })

      function updateIconMode() {
          if (map.hasLayer(tileLight)) {
              console.log("LIGHT");
              jeepneys.forEach(jeep => {
                  jeep.marker.setIcon(new jeepTag({iconUrl: `../tags/light/${jeep.routename}.png`}));
              })
          } else {
              console.log("DARK");
              jeepneys.forEach(jeep => {
                  jeep.marker.setIcon(new jeepTag({iconUrl: `../tags/dark/${jeep.routename}.png`}));
              })
          }
      }

      // Add scale at lower left corner of the map
      L.control.scale().addTo(map);

      map.on('baselayerchange', updateIconMode);
    }
});

onDestroy(async () => {
  if(map) {
    console.log('Unloading Leaflet map.');
    map.remove();
  }
});

</script>


<div class="mapElem" bind:this={mapElement}></div>


<style>
  @import 'leaflet/dist/leaflet.css';
  .mapElem {
    height: 800px;
    width: 100%;
    
    position: absolute;
    left: 50%;
    top: 63%;
    transform: translate(-50%, -50%);
  }
</style>