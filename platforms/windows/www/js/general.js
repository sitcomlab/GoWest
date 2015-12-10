//call 1,2,3,4: overpass API requests for receiving data for bars, shops, sights, restaurants.

function call1(map){		
	$.ajax({
		type: "GET",
		url: 'http://www.overpass-api.de/api/xapi?node[bbox='+cfg.boundingBox+'][amenity=bar|pub]',
		dataType: "xml",
		success: function (data){
			console.log("Pubs and Bars loaded");
			data = osmtogeojson(data);
			map.initializeCategories(data, "bars");
			call2(map);
		}
	});
}

function call2(map){
	$.ajax({
		type: "GET",
		url: 'http://www.overpass-api.de/api/xapi?node[bbox='+cfg.boundingBox+'][amenity=restaurant]',
		data:{},
		dataType: "xml",
		success: function (data){
			console.log("Restaurants loaded");					
			data = osmtogeojson(data);
			map.initializeCategories(data, "food");
			call3(map);
		}
	});
}

function call3(map){
	$.ajax({
		type: "GET",
		url: 'http://overpass-api.de/api/interpreter?data=[out:xml][timeout:25];(node[%22shop%22]('+cfg.boundingBox2+'));out;',
		dataType: "xml",
		success: function (data){
			console.log("Shops loaded");
			data = osmtogeojson(data);
			map.initializeCategories(data, "shops");
			$('#overlay').css("display", "none"); 
			call4(map);
		}
	});
}

//Has to be revised in order to extent the amount of sights.
function call4(map){
	$.ajax({
		type: "GET",
		url: 'http://www.overpass-api.de/api/xapi?node[bbox='+cfg.boundingBox+'][tourism=attraction]',
		dataType: "xml",
		success: function (data){
			console.log("Sights loaded");
			data = osmtogeojson(data);
			map.initializeCategories(data, "sights");
		}
	});
}

/*
function showDirection(goal){
	goal = JSON.parse(decodeURI(goal));
	console.log(goal);
	updateDestination(goal.name, goal.location, goal.street, goal.timeNeeded);
	$('#navtab2').trigger('click');
}*/

// see map.js.  Triggered by Take me there in the popup of a marker
function showDirection2(goal){
	goal = JSON.parse(decodeURI(goal));
	map.bringMeThere(goal.name, goal.location);
	$('#navtab2').trigger('click');
}


//Check if a user's device is near a signage and if the target is in the right direction.
function checkForSignage(){
	//console.log(currentPosition)
	//console.log(directions.currentDestination)
	if ( directions.currentDestination != null){
			positionUser = {lat:currentPosition._lat, lng:currentPosition._lon};
			destinationUser = {lat:directions.currentDestination.lat,lng:directions.currentDestination.lng};
			$.ajax({
				type: "POST",
				url: 'http://giv-konkol.uni-muenster.de/TIS/php/checkSignage.php',
		//		url: 'php/checkSignage.php',		
				data:	{	
						loc: positionUser,
						dest: destinationUser
					},
				success:function(data){
					//console.log(data)
					if ( data != "false"){
						data = JSON.parse(data);
						id = data[0].id;
						content = data[0].content;					
						if (directions.lastShownSignageId != id){
							createPopup(id,content);
							directions.lastShownSignageId = id;	
						}
					}else{
						directions.lastShownSignageId = null;
					}
				},
				error: function(data){
					//console.log(data);
				}	
			});		
	}
}

var $popUp = false;

//Creates popup if checkSignage found a suitable signage
function createPopup(id, content){
		var timeout = 0;
		if ($popUp != false){
			$popUp.popup( "close" );
			var timeout = 2000;		
		}
	setTimeout(function(){
		$popUp = $("<div/>").popup({
		dismissible: false,
		theme: "b",
		overlayTheme: "e",
		transition: "pop",
		id: "signPopup"
	}).on("popupafterclose", function () {
		//remove the popup when closing
		    $(this).remove();
	}).css({
	    'width': '270px',
		'height': '350px',
		'padding': '3px'
	});
	
	$("<img/>", {
		src: "css/signimages/"+id+".jpg"
	}).appendTo($popUp);
	
	//create a message for the popup
	$("<p/>", {
		text: language.signage1 + ' "' + content + '" ' + language.signage2
	}).appendTo($popUp);
	
	$("<a>", {
		text: language.close
	}).buttonMarkup({
		    inline: false,
		    mini: true
	}).on("click", function () {
		$popUp.popup("close");
		$popUp = false;
	}).appendTo($popUp);			    
	
	$popUp.popup('open').trigger("create");},2000);
	navigator.vibrate(1700);		
}

//Creates an srrival popup if a user is within less than 15 meters from the target.
//Triggered in compass.js
function createArrivalPopup(){
	var timeout = 0;
	if ($popUp != false){
		$popUp.popup( "close" );
		var timeout = 2000;		
	}
	setTimeout(function(){
		$popUp = $("<div/>").popup({
		dismissible: false,
		theme: "b",
		overlayTheme: "e",
		transition: "pop"
	}).on("popupafterclose", function () {
		//remove the popup when closing
		    $(this).remove();
	}).css({
	    'width': '270px',
		'height': '100px',
		'padding': '3px'
	});
	
	//create a message for the popup
	$("<p/>", {
		text: language.arrived
	}).appendTo($popUp);
	
	$("<a>", {
		text: language.close
	}).buttonMarkup({
		    inline: false,
		    mini: true
	}).on("click", function () {
		$popUp.popup("close");
		$popUp = false;
	}).appendTo($popUp);			    
	
	$popUp.popup('open').trigger("create");
	navigator.vibrate(1700);},timeout);		
}


function backtomapButton(selector){
	$("<a>", {
			text: language.backtomap,
			id: "backToMapButton"
		}).buttonMarkup({
		}).css({
			'margin-right': '10%',
			'margin-left':'10%'					
		}).on("click", function () {
			$('#navtab1').trigger('click');
		}).appendTo($(selector));
}
