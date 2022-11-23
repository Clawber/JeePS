let mapOptions = {
  center:[14.65454, 121.06652],
  zoom:16
}


let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png');
map.addLayer(layer);

let marker = new L.Marker([14.65454, 121.06652]);
marker.addTo(map);
marker = new L.Marker([14.65496,121.06436]);
marker.addTo(map);




// oble
// 14.65496,121.06436

// 14.65613,121.06857

// 14.65521,121.07315

