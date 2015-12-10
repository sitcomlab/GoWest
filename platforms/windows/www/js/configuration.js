//Goal of this file: Allow users to use this app in other cities as well. 
//Still necessary to implement the functionality. 

var cfg = {
          // radius should be small ONLY if scaleRadius is true (or small radius is intended)
          "radius": 0.001,
          "maxOpacity": .6, 
          // scales the radius based on map zoom
          "scaleRadius": true, 
          // if set to false the heatmap uses the global maximum for colorization
          // if activated: uses the data maximum within the current map boundaries 
          //   (there will always be a red spot with useLocalExtremas true)
          "useLocalExtrema": false,
          // which field name in your data represents the latitude - default "lat"
          latField: 'lat',
          // which field name in your data represents the longitude - default "lng"
          lngField: 'lng',
          // which field name in your data represents the data value - default "value"
          valueField: 'count',
          //Coordinates of Münster Marketing
          displayPositionLat: 51.961130, 
          displayPositionLng: 7.629333,
          
          zoomLevel: 13,
          extentLat: 51.962797, 
          extentLng: 7.621200,
          boundingBox: "7.5399,51.9260,7.7143,51.9835",
          boundingBox2: "51.9260,7.5399,51.9835,7.7143",
          
          initializeValues: function(){
          	this.extentLat = map.getCenter().lat;
          	this.extentLng = map.getCenter().lng;	
          }    
	};