var map = L.mapbox.map('map').setView([38.73300, -9.16], 15);

// Add layer switcher control to the right of the map to change baselayers.
L.control.layers({
    'Base Map': L.mapbox.tileLayer('rusty.map-ag30cy9j,rusty.isegi_map').addTo(map)},{},{collapsed: false}).addTo(map);

// Add custom popups to each using our custom feature properties
map.markerLayer.on('layeradd', function(e) {
    var marker = e.layer,
        feature = marker.feature;

    // Create custom popup content
    var popupContent =  '<a target="_blank" class="popup" href="' + feature.properties.NAME + '">' +
                        '   <h2>' + feature.properties.NAME + '</h2>' +
                        '</a>';

    // http://leafletjs.com/reference.html#popup
    marker.bindPopup(popupContent,{
        closeButton: false,
        minWidth: 320
    });

	console.log(markerLayer)

	
});

var config = {
    apiKey: 'SQPOOFZMND44BCXIV2SISOEP1E0A2U0KWD1O5133CWX5Z0PX',
    authUrl: 'https://foursquare.com/',
    apiUrl: 'https://api.foursquare.com/',
	apiSecret: '3HEOHYJZ1Y3WSZDJPC1YRPUNDE2GD5F5BHOHHZ4NQMXMH5ZR'
  };
  
 
  //<![CDATA[

	$.getJSON(config.apiUrl + 'v2/venues/search?v=20131016&ll=38.73,-9.16&categoryId=4d4b7105d754a06374d81259&radius=800&client_id=' + config.apiKey + '&client_secret=' + config.apiSecret, {}, function(data) {
    	venues = data['response']['venues'];
	      /* Place marker for each venue. */
	      for (var i = 0; i < venues.length; i++) {
	        /* Get marker's location */
	        var latLng = new L.LatLng(
	          venues[i]['location']['lat'],
	          venues[i]['location']['lng']
	        );

	         /* Build icon for each icon */
	        var leafletIcon = L.icon({
	          "iconUrl": venues[i]['categories'][0]['icon']['prefix'] + '32' + venues[i]['categories'][0]['icon']['suffix'],
	          "shadowUrl": null,
	          "iconSize": new L.Point(44,51),
	          "iconAnchor": new L.Point(16, 41),
	          "popupAnchor": new L.Point(0, -51),
			  "className": "dot"
	        });
	
   /* content for the popup*/
		var content = '<h1><a href=\"'+ venues[i]['url'] +'\" targer=\"blank\">' + venues[i]['name'] + '<\/a><\/h1>' +
						        '<h2>Walk: ' + venues[i]['location']['distance'] + 'm<\/h2>';	
        var marker = new L.Marker(latLng, {icon: leafletIcon})
		
        .bindPopup(content, { closeButton: true })  
        map.addLayer(marker);
		}
		
		
		// construct an empty list to fill with onscreen markers
	    var inBounds = []
		
		// for each marker, consider whether it is currently visible by comparing
		// with the current map bounds
		for (var i = 0; i < venues.length; i++) {
		        inBounds.push('<div id="open-popup" class="item"><div class="title">' + venues[i]['name'] + '</div>' +
			                        '<div class="info">'+ venues[i]['categories'][0]['name'] + ' <em>(' + venues[i]['location']['distance'] + 'm)</em></div></div>');
		};
		// display a list of markers.
		document.getElementById('onscreen').innerHTML = inBounds.join(' ');
		
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
	
	L.control.attribution().addAttribution('Venues from <a href="http://foursquare.com" target="_blank">Foursquare</a>').addTo(map);
  //]]>
  //]]>