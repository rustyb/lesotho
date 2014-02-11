var map = L.mapbox.map('map').setView([38.73300, -9.16], 17);;

//var markerLayer = L.mapbox.markerLayer();
//markerLayer.loadURL('../map_files/geojson/mx_point_1k.geojson');

// Add layer switcher control to the map
L.control.layers({
    'Base Map': L.mapbox.tileLayer('rusty.map-ag30cy9j').addTo(map),
    'Aerial Map': L.mapbox.tileLayer('rusty.map-xq326six')
}, {
    //L.mapbox.tileLayer('rusty.isegi_facilities_labels'),
    'Full ISEGI Map': L.layerGroup([ 
	L.mapbox.tileLayer('rusty.isegi_map'),
	L.mapbox.gridLayer('rusty.isegi_map')]).addTo(map),
	//'MX Points': L.mapbox.tileLayer('rusty.mx_point_1k'),
	'UNL Facilities': L.layerGroup([ L.mapbox.tileLayer('rusty.isegi_facilities_labels'), L.mapbox.gridLayer('rusty.isegi_facilities_labels')]),
	'Building Schedules': L.mapbox.tileLayer('rusty.isegi_facilities_labels'),
	'WiFi - Isegi Guest': L.mapbox.tileLayer('rusty.isegi_wifi_guest'),
	'WiFi - Eduroam': L.mapbox.tileLayer('rusty.isegi_eduroam')
	
}, {collapsed: false}).addTo(map);
