var map = L.mapbox.map('map').setView([38.7333, -9.1607], 20);

// Add layer switcher control to the right of the map to change baselayers.
L.control.layers({
    'Base Map': L.mapbox.tileLayer('rusty.map-ag30cy9j').addTo(map),
    'Aerial Map': L.mapbox.tileLayer('rusty.map-xq326six')
},{},{collapsed: false}).addTo(map);

// Add GeoJSON Marker Layers to the Map
// Facilities Layer - Used for sidebar and map filter
var markerLayer1 = L.mapbox.markerLayer().loadURL('geojson/facilities.geojson');
// Transport Markers
var markerLayer2 = L.mapbox.markerLayer().loadURL('geojson/transport.geojson');
// Building Entrance Layer
var markerLayer3 = L.mapbox.markerLayer().loadURL('geojson/entrances.geojson');

// reference the map-ui area for the layer toggle control.
var ui = document.getElementById('map-ui');


// add layers for the switcher
addLayer(1, L.mapbox.tileLayer('rusty.isegi_map'), L.mapbox.gridLayer('rusty.isegi_map'),'UNL Buildings', 4);
addLayer(0, markerLayer3, markerLayer3, 'UNL Building Entrances', 4);
addLayer(0, markerLayer2, markerLayer2,'Transport Options', 6);
addLayer(1, markerLayer1, markerLayer1, 'UNL Facilities', 7);

// Function to add each layer in turn to the switcher and add interactivity
function addLayer(active, layer, gridlayer, name, zIndex) {
    if (active === 1) {
	layer
        .setZIndex(zIndex)
        .addTo(map);
    gridlayer
        .addTo(map);
	}
    // add the gridControl the active gridlayer
    var gridControl = L.mapbox.gridControl(gridlayer, {follow: true}).addTo(map);
    
// Create a simple layer switcher that toggles layers on and off.
    var item = document.createElement('li');
    var link = document.createElement('a');

    link.href = '#';
	if (active === 1) {
    	link.className = 'active';
	} else {link.className = '';}
    link.innerHTML = name;

    link.onclick = function(e) {
        e.preventDefault();
        e.stopPropagation();

        if (map.hasLayer(layer)) {
            map.removeLayer(layer);
            map.removeLayer(gridlayer);
            this.className = '';
        } else {
            map.addLayer(layer);
            map.addLayer(gridlayer);
            this.className = 'active';
        }
    };
    item.appendChild(link);
    ui.appendChild(item);
};

// Add custom popups to each using our custom feature properties
markerLayer1.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<h1 style="line-height:1;margin-bottom:0;">' + feature.properties.name + '</h1>' +
                        '<p style="margin-top:0;">'+ feature.properties.OWNER +'</p>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 100
    });
	
	// construct an empty list to fill with onscreen markers
    var inBounds = []
	
// for each marker we want it to fill the list
        inBounds.push(marker);


//sort free markers
	inBounds = sortMarkers(inBounds, 'id');
	inBounds.reverse()
	
	//build list items from markers array
	var index; 
	for (index = 0; index < inBounds.length; ++index) {
		$('<div id="open-popup" class="item"><div class="title">' + inBounds[index].feature.properties.name + '</div>' +
		                    '<div class="info">'+ inBounds[index].feature.properties.OWNER +'</div></div>') 
			.prependTo($("div#onscreen"))
			.click((function(marker) {
				return function() {
					map.panTo(marker.getLatLng());
					marker.openPopup();
				};
			})(inBounds[index]));
	}
	
});



// Add custom popups to each using our custom feature properties
markerLayer2.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<h1 class="title">' + feature.properties.Transpor + ' ' + feature.properties.Disc + '</h1><span>This stops is <strong>'+ feature.properties.Distance +'</strong> meters from the nearest UNL entrance.</span><h2>Timetable Information</h2><div class="direction"><a target="_blank"  href="' + feature.properties.first_url + '">Direction of ' + feature.properties.first_direct + '</a></div> <div class="direction"><a target="_blank"  href="' + feature.properties.second_url + '">Direction of ' + feature.properties.second_direct + '</a></div> <div class="source">' + feature.properties.Disc + '</div>';



    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 320
    });

});

$('#search').keyup(search);
// search functionality for the 
function search() {
    // get the value of the search input field
    var searchString = $('#search').val().toLowerCase();

    markerLayer1.setFilter(showType);

    // here we're simply comparing the 'name' property of each marker
    // to the search string, seeing whether the former contains the latter.
    function showType(feature) {
        return feature.properties.name
            .toLowerCase()
            .indexOf(searchString) !== -1;
    }
}

// Add custom popups to each using our custom feature properties
markerLayer3.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<h1 class="title">To ' + feature.properties.Entrances +  '</h1>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 120
    });
});

//sort marker arrays by ID, alphabetically
	function sortMarkers(array, key) {
		return array.sort(function(a, b) {
			var x = a.feature[key]; var y = b.feature[key];
			return ((x < y) ? -1 : ((x > y) ? 1 : 0));
		});
	}
	L.control.attribution().addAttribution('Venues from <a href="http://foursquare.com" target="_blank">Foursquare</a>').addTo(map);

