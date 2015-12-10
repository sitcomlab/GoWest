//tsp = Traveling Salesman Problem

var tsp = {
	
	locations: null,
	currentLocation: null,
	polylines:null,
	origin:null,
	waypoints:null,
	totalTime:null,
	startLocation:null,
	optimize: true,
	
	createWaypoints: function(){
		var that = this;
		that.origin = new google.maps.LatLng(currentPosition._lat, currentPosition._lon);
		that.origin.name = language.origin;
		that.waypoints = new Array();
		for ( var i = 0; i < that.locations.length; i++ ){
			waypoint = {location:new google.maps.LatLng(that.locations[i].location.lat, that.locations[i].location.lng)};
			that.waypoints.push(waypoint);
		}
		switch(this.optimize){
		case 1:
			that.generateTSP();
			break;
		case 2:
			that.generateOTSP();
			break;
		case 3:
			that.generateSimpleTour();
			break;
		}
	},
	
	//generates tour based on traveling salesman problem
	generateTSP: function(){
		var that = this;
		var directionsService = new google.maps.DirectionsService();	
		var request = {
		    origin: that.origin,
		    destination: that.origin,
		    travelMode: google.maps.TravelMode.WALKING,
		    optimizeWaypoints: true,
		    waypoints:that.waypoints
		};		
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    that.drawRoute(response);
		    that.rearrangeTargetList(response.routes[0].waypoint_order);
		  }
		});		
	},	
	
	//generates tour based on OPEN traveling salesman problem
	generateOTSP: function(){
		var that = this;
		var directionsService = new google.maps.DirectionsService();	
		var request = {
		    origin: that.origin,
		    destination: that.waypoints[that.waypoints.length-1].location,
		    travelMode: google.maps.TravelMode.WALKING,
		    optimizeWaypoints: true,
		    waypoints:that.waypoints
		};		
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    that.drawRoute(response);
		    that.rearrangeTargetList(response.routes[0].waypoint_order);
		  }
		});		
	},

	//generates tour based on the selected order without optimizations
	generateSimpleTour: function(){
		var that = this;
		var directionsService = new google.maps.DirectionsService();	
		var request = {
		    origin: that.origin,
		    destination: that.waypoints[that.waypoints.length-1].location,
		    travelMode: google.maps.TravelMode.WALKING,
		    optimizeWaypoints: false,
		    waypoints:that.waypoints
		};		
		directionsService.route(request, function(response, status) {
		  if (status == google.maps.DirectionsStatus.OK) {
		    that.drawRoute(response);
		    that.rearrangeTargetList(response.routes[0].waypoint_order);
		  }
		});		
	},	
	
	//draw route on the map based on the results of the Google Directions API
	drawRoute: function(route){
		var that = this;
		that.polylines = new Array();
		//L.marker([that.origin.G,that.origin.K]).bindPopup(that.origin.name).addTo(map);
		var path = route.routes[0].legs;
		for ( var i = 0; i < path.length; i++ ){
			duration = path[i].duration.value;
			that.totalTime += duration;
			for ( j = 0; j < path[i].steps.length; j++ ){			
				for ( k = 0; k < path[i].steps[j].path.length-1; k++ ){
					that.polylines.push(L.polyline([L.latLng(path[i].steps[j].path[k].H, path[i].steps[j].path[k].L), 
													L.latLng(path[i].steps[j].path[k+1].H, path[i].steps[j].path[k+1].L)])
													.bindPopup(language.timeneeded + Math.round(duration/60) + " Min."));
				}
			}
			if ( typeof targets.targetItems[route.routes[0].waypoint_order[i]] != "undefined"){
				targets.targetItems[route.routes[0].waypoint_order[i]].timeNeeded = Math.round(duration/60).toString();				
			}else{
				that.startLocation.timeNeeded = Math.round(duration/60).toString();
			}
		}
		for ( l = 0; l < that.polylines.length; l++ ){
			that.polylines[l].addTo(map);			
		}		
	},
	
	
	//reorders the list after optimization
	rearrangeTargetList: function(newOrder){
		var newList = new Array();
		for ( var i = 0; i < newOrder.length; i++ ){
			newList.push(targets.targetItems[newOrder[i]]);
		}
		targets.targetItems = newList;
		targets.showTargets();
		targets.drawMarker(targets.targetItems);
		$.mobile.loading('hide');
		$.rustaMsgBox({ 
			"content" : language.successfullygenerated,
			"mode": 'success', 
		});
	},
	
	initiateStartLocation: function(){
		var that = this;
		that.startLocation = {name:language.origin, location:L.latLng(currentPosition._lat, currentPosition._lon), street:"", timeNeeded:""};
		$.ajax({
			type: "GET",
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + currentPosition._lat + ',' + currentPosition._lon + '&key=AIzaSyCmGfbyXgyQviltRiEU-qVBOY3AM7liH7k',
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
				that.startLocation.street = street + " " + number;
			}
		});		
	},
	
	clear: function(){
		this.totalTime = null;
		this.startLocation = null;
	},
	
	generateTour: function(optimize){
		this.totalTime = null;
		this.optimize = optimize;
		if (targets.targetItems.length < 9){
			this.locations = targets.targetItems;
			this.initiateStartLocation();
			this.createWaypoints();							
		}else{
		$.rustaMsgBox({ 
			"content" : language.limitedtour,
			"mode": 'error', 
		});						
		}
	}
};
