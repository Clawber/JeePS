import { onMount, onDestroy } from 'svelte';
import { browser } from '$app/environment';

import {PG} from 'pg'; 

let mapElement;
let map;

onMount(async () => {
    if(browser) {
        const leaflet = await import('leaflet');
        
        map = leaflet.map(mapElement).setView([14.6551,121.0686], 15);

        leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            zoom: 15,
            maxZoom: 19,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);

        leaflet.marker([14.6551,121.0686]).addTo(map)
            .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
            .openPopup();

        class Jeep {
            constructor(map, jeepneyID) {
                this.map = map;
                coords = getCoords(jeepneyID, client);
                this.marker = new leaflet.Marker(coords);
                this.marker.addTo(this.map);
            }
        }
    }
});

onDestroy(async () => {
    if(map) {
        console.log('Unloading Leaflet map.');
        map.remove();
    }
});