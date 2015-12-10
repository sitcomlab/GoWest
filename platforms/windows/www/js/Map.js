var Map = L.Map.extend({
	pois:{},
	foodLayerGroup: false,
	barsLayerGroup: false,
	shopsLayerGroup:false,
	sightsLayerGroup:false,

	markerBars: false,
	markerShops: false,
	markerFood: false,
	markerSights: false,
	
	destinationMarker: false,
	currentLocationMarker: false,
	icon: L.icon({iconUrl: 'css/marker-icon-red.png', iconSize:[25, 41],iconAnchor:[12,41], popupAnchor:[0,-41]}),
	allLayers: {},
	//right click or keep pressing on map for mobile device
	options:{	contextmenu:true, 
				contextmenuWidth: 140,
				contextmenuItems: [{
									text: '<p>'+language.takemethere+'</p>', 
									callback: function(e){
												this.bringMeThere("", e.latlng);
											}
									},
									{
									text: '<p>'+language.addtotour+'</p>', 
									callback: function(e){
												this.addToTargets(e.latlng);
											}																						
									},
									{
									text: '<p>'+language.showapps+'</p>', 
									callback: function(e){
												proposeApps(new LatLon(e.latlng.lat,e.latlng.lng));
											}																						
									}
								   ]
			},
			
	addToTargets: function(location){
			targets.addTarget("", location);	
	},
	
	setDestinationMarker: function(location){
		var temp =  encodeURI(JSON.stringify({name: "", location:{lat:location.lat, lng:location.lng}}));
		this.deleteDestinationMarker();
		this.destinationMarker = L.marker(L.latLng(location.lat,location.lng)
			,{icon:this.icon})
			.bindPopup(language.currentTarget + 
						'<p><button class="ui-btn ui-btn-inline" onclick=targets.addToTargets("'+temp+'");>'+language.addtotour+'</button></p>')
			.addTo(map);		
	},
	
	deleteDestinationMarker: function(){
		map.removeLayer(this.destinationMarker);
	},
	
	//Functionality for the context menu, targets section, marker, geocoder
	//generates QR code (kiosk) or arrow+distance+signage (mobile device), draws the route on the map, time needed
	bringMeThere: function(name, location){
		var that = this;
		this.setDestinationMarker(location);
		if (mobileDevice){
			directions.clear();
			directions.init();
			directions.currentDestination = location;			
		}
		var directionsService = new google.maps.DirectionsService();	
		var end = new google.maps.LatLng(location.lat, location.lng);
		var start = new google.maps.LatLng(currentPosition._lat, currentPosition._lon);
		var request = {
	    	origin: start,
	    	destination: end,
	    	travelMode: google.maps.TravelMode.WALKING,
		};		
		directionsService.route(request, function(response, status) {
	  	if (status == google.maps.DirectionsStatus.OK) {
	  		time = Math.round(response.routes[0].legs[0].duration.value/60).toString();
	 		$.ajax({
				type: "GET",
				url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + location.lat + ',' + location.lng + '&key=AIzaSyCmGfbyXgyQviltRiEU-qVBOY3AM7liH7k',
				dataType: "json",
				success: function (data){
					var street = data.results[0].address_components[1].long_name;
					var number = data.results[0].address_components[0].long_name;
					if (typeof street === "undefined"){
						street = "";
						number = "";
					}
					if (typeof number === "undefined"){
						number = "";
					}
					var address = street + " " + number;
					if (mobileDevice){
						updateDestination(name, location, address, time);
						$('#navtab2').trigger('click');						
					}else{
						generateQR.init(0, name, location, address, time);
						$('#navtab2').trigger('click');
					}
					that.deleteTourFromMap();
					tsp.initiateStartLocation();
					tsp.drawRoute(response);
				}
			}); 			  	
	  	}
	});		

	},		
	
	deleteTourFromMap: function() {
	if (tsp.polylines != null ){
		for ( var i = 0; i < tsp.polylines.length; i++ ){
			map.removeLayer(tsp.polylines[i]);	
			}		
		}  
	},
	
	createHeatmap: function(pts, type){
		var that = this;				
		switch(type){
			case "food":
				if (that.foodLayerGroup === false){
					var foodLayer = new HeatmapOverlay(cfg);
					that.foodLayerGroup = new L.LayerGroup();
					that.foodLayerGroup.addLayer(foodLayer).addTo(that);
						foodLayer.setData(that.pois);
					that.allLayers.food = that.foodLayerGroup;		
					break;	
				}
			case "bars":
				if (that.barsLayerGroup === false){
					var barsLayer = new HeatmapOverlay(cfg);
					that.barsLayerGroup = new L.LayerGroup();
					that.barsLayerGroup.addLayer(barsLayer).addTo(that);
						barsLayer.setData(that.pois);
					that.allLayers.bars = that.barsLayerGroup;		
					break;		
				}			
			case "shops":
				if (that.shopsLayerGroup === false){
					var shopsLayer = new HeatmapOverlay(cfg);
					that.shopsLayerGroup = new L.LayerGroup();
					that.shopsLayerGroup.addLayer(shopsLayer).addTo(that);
						shopsLayer.setData(that.pois);
					that.allLayers.shops = that.shopsLayerGroup;		
					break;	
				}	
			case "sights":
				if (that.sightsLayerGroup === false){
					var sightsLayer = new HeatmapOverlay(cfg);
					that.sightsLayerGroup = new L.LayerGroup();
					that.sightsLayerGroup.addLayer(sightsLayer).addTo(that);
						sightsLayer.setData(that.pois);
					that.allLayers.sights = that.sightsLayerGroup;		
					break;	
				}								
			default:
				break;
		};
	},
	
	createMarker: function(pts, type){
		var that = this;
		var markers = [];
		for (var i = 0; i < pts.length; i++){
			var marker = L.marker([pts[i].lat,pts[i].lng]);
			if (pts[i].name == null){
				pts[i].name = " ";
			}
			var temp =  encodeURI(JSON.stringify({name: pts[i].name, location:{lat:pts[i].lat, lng: pts[i].lng}}));
			
			var popup = new L.Popup({}).setContent(pts[i].name + 
							'<p><button class="ui-btn ui-btn" onclick=targets.addToTargets("'+temp+'");>'+language.addtotour+'</button></p>'+
							'<p><button class="ui-btn ui-btn" onclick=showDirection2("'+temp+'");>'+language.takemethere+'</button></p>');
			marker.bindPopup(popup);
			
			markers.push(marker);
		}
		var layer = L.layerGroup(markers);
		switch(type){
			case "food":
					that.markerFood = layer;
					break;	
			case "bars":
					that.markerBars = layer;
					break;			
			case "shops":		
					that.markerShops = layer;
					break;				
			case "sights":		
					that.markerSights = layer;
					break;	
			default:
				break;
		};
	},

	initializeCategories: function(data, type){
		var that = this;
		that.pois.data = [];
		for (var i = 0; i < data.features.length; i++){
			var lon = data.features[i].geometry.coordinates[0];
			var lat = data.features[i].geometry.coordinates[1];
			var point = {
							lat:lat,
							lng:lon,
							count:0,
							name:data.features[i].properties.tags.name
						};
			that.pois.data.push(point);
		}
		that.createHeatmap(that.pois, type);
		that.createMarker(that.pois.data, type);
	},
	
	//visualizes marker after zooming in: >=17
	checkMarkerVisibility: function(){
		if ( this.getZoom() >= 17){
			if ($('#radio-choice-h-2b').is(':checked')){
				this.removeMarkers();
				this.markerBars.addTo(this);
			}else if ($('#radio-choice-h-2c').is(':checked')){
				this.removeMarkers();
				this.markerShops.addTo(this);
			}else if ($('#radio-choice-h-2a').is(':checked')){
				this.removeMarkers();
				this.markerFood.addTo(this);
			}else if ($('#radio-choice-h-2d').is(':checked')){
				this.removeMarkers();
				this.markerSights.addTo(this);
			}
		}else{
			this.removeMarkers();
		}
	},
	
	//removes marker after zooming out
	removeMarkers: function(){
		this.removeLayer(this.markerBars);
		this.removeLayer(this.markerShops);
		this.removeLayer(this.markerFood);	
		this.removeLayer(this.markerSights);		
	},
	
	//heatmaps reacting on radio buttons
	handleHeatmaps: function(selection){
		this.removeLayer(this.barsLayerGroup);
		this.removeLayer(this.shopsLayerGroup);
		this.removeLayer(this.foodLayerGroup);
		this.removeLayer(this.sightsLayerGroup);		
		switch(selection.target.value){
			case "foodLayerGroup":
					this.addLayer(this.foodLayerGroup);	
					break;	
			case "barsLayerGroup":
					this.addLayer(this.barsLayerGroup);
					break;			
			case "shopsLayerGroup":		
					this.addLayer(this.shopsLayerGroup);
					break;	
			case "sightsLayerGroup":		
					this.addLayer(this.sightsLayerGroup);
					break;									
			default:
				break;
		};
	},
	createLocator: function(){
		locator = L.control.locate({
				locateOptions: {
				   maxZoom: 16
				}
		});
		locator.addTo(this);			
	},
	
	createGeocoder: function(){
		L.Control.geocoder({position:'topleft'}).addTo(map);
	},
	
	initMap: function () {			
		var that = this;
		that.on("zoomend", that.checkMarkerVisibility);
		that.createLocator();
		that.createGeocoder();
		$("input[type='radio']").bind( "change", function(event, ui) {
			that.handleHeatmaps(event);
			that.checkMarkerVisibility();
		}); 
    }
});

