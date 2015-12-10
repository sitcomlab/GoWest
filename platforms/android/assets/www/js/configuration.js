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
          displayPositionLat: 48.368457, 
          displayPositionLng: 10.893735,

          zoomLevel: 13,
          extentLat: 48.368457, 
          extentLng: 10.893735,
          boundingBox: "10.8068,48.3220,11.0248,48.4139",
          boundingBox2: "48.3220,10.8068,48.4139,11.0248",
          
          initializeValues: function(){
          	this.extentLat = map.getCenter().lat;
          	this.extentLng = map.getCenter().lng;	
          }    
	};