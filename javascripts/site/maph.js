
var map = L.mapbox.map('map', 'examples.map-h67hf2ic')
  .setView([
    -29.316525709054982,27.47320175170898], 11);


$.ajax({
    url: 'geojson/map.geojson',
    dataType: 'json',
    success: function load(d) {
        var states = L.geoJson(d, {
			style: function(feature) { return feature.properties; return {"color": feature.properties.stroke}; },
		    onEachFeature: function (feature, layer) {
		        layer.bindPopup(feature.properties.name);
		    },
			pointToLayer: L.mapbox.marker.style,
			    style: function(feature) { return feature.properties; }				
		}).addTo(map);
    }
});
