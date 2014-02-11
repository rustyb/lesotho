var map = L.mapbox.map('map').setView([38.73300, -9.16], 16);

// Add layer switcher control to the right of the map to change baselayers.
L.control.layers({
    'Base Map': L.mapbox.tileLayer('rusty.map-ag30cy9j,rusty.isegi_map').addTo(map),
    'Aerial Map': L.mapbox.tileLayer('rusty.map-xq326six')
},{},{collapsed: false}).addTo(map);


var markerLayer1 = L.mapbox.markerLayer().loadURL('../geojson/transport.geojson');

// reference the map-ui area for the layer toggle.
var ui = document.getElementById('map-ui');


// add layers for the switcher
addLayer(markerLayer1, markerLayer1, 'Transport Stops', 7);

function addLayer(layer, gridlayer, name, zIndex) {
    layer
        .setZIndex(zIndex)
        .addTo(map);
   // gridlayer
   //     .addTo(map);
    // add the gridControl the active gridlayer
    //var gridControl = L.mapbox.gridControl(gridlayer, {follow: true}).addTo(map);
    // Create a simple layer switcher that toggles layers on and off.
    var item = document.createElement('li');
    var link = document.createElement('a');

    link.href = '#';
    link.className = 'active';
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
    var popupContent =  '<h1 class="title">' + feature.properties.Transpor + ' ' + feature.properties.Disc + '</h1><span>This stops is <strong>'+ feature.properties.Distance +'</strong> meters from the nearest UNL entrance.</span><h2>Timetable Information</h2><div class="direction"><a target="_blank"  href="' + feature.properties.first_url + '">Direction of ' + feature.properties.first_direct + '</a></div> <div class="direction"><a target="_blank"  href="' + feature.properties.second_url + '">Direction of ' + feature.properties.second_direct + '</a></div> <div class="source">' + feature.properties.Disc + '</div>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: true,
        minWidth: 320
    });

        // construct an empty list to fill with onscreen markers
    var inBounds = []


        // for each marker, consider whether it is currently visible by comparing
        // with the current map bounds
        markerLayer1.eachLayer(function(marker) {
                inBounds.push('<div id="open-popup" data-foo="' + marker.feature.properties.OBJECTID + '" class="item"><div class="title">' + marker.feature.properties.Disc + ' - <em>' + marker.feature.properties.Transpor + '</em></div>' +
                                        '<div class="info"><a target="_blank"  href="' + marker.feature.properties.first_url + '">Direction of ' + marker.feature.properties.first_direct + '</a> / <a target="_blank"  href="' + marker.feature.properties.second_url + '">Direction of ' + marker.feature.properties.second_direct + '</a></div></div>');
        });
        // display a list of markers.
        document.getElementById('onscreen').innerHTML = inBounds.join(' ');
        // when a user clicks the button run the `clickButton` function.
/*        
// for each marker we want it to fill the list
markerLayer1.eachLayer(function(marker) {
        inBounds.push(marker);
});
//sort free markers
        inBounds = sortMarkers(inBounds, 'id');
        inBounds.reverse()
        
        //build list items from markers array
         
        for (index = 0; index < inBounds.length; ++index) {
                $('<div id="open-popup" class="item"><div id="open-popup" data-foo="' + inBounds[index].feature.properties.OBJECTID + '" class="item"><div class="title">' + inBounds[index].feature.properties.Disc + ' - <em>' + inBounds[index].feature.properties.Transpor + '</em></div>' +
		                        '<div class="info"><a target="_blank"  href="' + inBounds[index].feature.properties.first_url + '">Direction of ' + inBounds[index].feature.properties.first_direct + '</a> / <a target="_blank"  href="' + inBounds[index].feature.properties.second_url + '">Direction of ' + inBounds[index].feature.properties.second_direct + '</a></div></div>') 
                        .prependTo($("div#onscreen"))
                        .click((function(marker) {
                                return function() {
                                        map.panTo(marker.getLatLng());
                                        marker.openPopup();
                                };
                        })(inBounds[index]));
        }*/
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
        return feature.properties.Disc
            .toLowerCase()
            .indexOf(searchString) !== -1;	 
  		return inBounds = [];
    }
	
}

//sort marker arrays by ID, alphabetically
        function sortMarkers(array, key) {
                return array.sort(function(a, b) {
                        var x = a.feature[key]; var y = b.feature[key];
                        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
                });
        }
		L.control.attribution().addAttribution('Venues from <a href="http://foursquare.com" target="_blank">Foursquare</a>').addTo(map);

