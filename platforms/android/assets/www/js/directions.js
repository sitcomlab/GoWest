//Responsible for the section Directions in GoWest

var directions = {
	
	
	currentItem: null,
	currentDestination: null,
	lastShownSignageId: null,
	reached: false,
	
	startTour: function(){
		this.clear();
		this.init();
		this.showUp();
		this.tour();
		$('#navtab2').trigger('click');
	},	
	
	//Creates tour buttons
	tour: function(){
		$('#tourButtons').empty();
		$buttons = $('#tourButtons');
		$backButton = $('<button data-inline="true" data-mini="true" onclick="goBack()">'+language.previousdestination+'</button>');
		$forthButton = $('<button data-inline="true" data-mini="true" onclick="goForth()">'+language.nextdestination+'</button>');
		$buttons.append($backButton);
		$buttons.append($forthButton);
		$('#tourButtons').append($buttons).trigger('create');
	},
	
	//triggers updateDestination of compass.js which includes values.
	showUp: function(){
		counter = 1;
		directions.currentDestination = targets.targetItems[0].location;
		item = targets.targetItems[0];
		updateDestination(language.target + " " + counter + ": " + item.name, item.location, item.street, item.timeNeeded);
		directions.currentItem = 0;		
	},
	
	//Delete content in directions
	clear: function(){
		$('#results').empty();
		$('#tourButtons').empty();
		$('#introDirections').remove();
		$('#backToMapButton').remove();
		this.reached = false;
		this.lastShownSignageId = null;
		if (mobileDevice){
			$('#tab3').append($('<p id = "introDirections">'+language.introdirections+'</p>'));			
			backtomapButton('#tab3');
		}
	},
	
	init: function(){
		$('#introDirections').remove();
		$('#backToMapButton').remove();
		$directions = $('#results');
		$destinationName = $('<p id="destinationName"></p>');
		$destinationStreet = $('<p id ="destinationStreet"></p>');
		$arrow = $('<div id="arrow"></div>');
		$text = $('<div></div>').html('<p>'+language.distance+'<span id="distance"></span>'+language.distanceunit+'</p>'+
										//'<p>Current heading: <span id="heading"></span> degrees</p>'+
										'<p>'+language.timeneeded+'<span id="timeNeeded"></span>'+language.timeunit+'</p>');
		$directions.append($destinationName);
		$directions.append($destinationStreet);
		$directions.append($arrow);
		$directions.append($text);
		$directions.append('<p id="error"></p>');								
	}
};

//Functionality fo the tour button: Previous destination
function goBack(){
	if ( directions.currentItem > 0 ){
		counter--;
		item = targets.targetItems[directions.currentItem-1];
		updateDestination(language.target + " " + counter + ": " + item.name, item.location, item.street, item.timeNeeded);
		map.setDestinationMarker(item.location);
		directions.currentItem = directions.currentItem-1;
		directions.currentDestination = item.location;	
		directions.reached = false;
	}
}

//Functionality fo the tour button: Next destination
function goForth(){
	if ( directions.currentItem < targets.targetItems.length){
		if (directions.currentItem + 1 < targets.targetItems.length ){
			counter++;			
		}
		item = targets.targetItems[directions.currentItem+1];

		if (typeof item === "undefined"){
			counter++;
			directions.currentItem++;
			updateDestination(language.target + " " + counter + ": " + tsp.startLocation.name, tsp.startLocation.location, tsp.startLocation.street, tsp.startLocation.timeNeeded);
			map.setDestinationMarker(tsp.startLocation.location);				
		}else{
			updateDestination(language.target + " " + counter + ": " + item.name, item.location, item.street, item.timeNeeded);
			map.setDestinationMarker(item.location);
			directions.currentDestination = item.location;	
		}

		if (directions.currentItem + 1 < targets.targetItems.length ){
			directions.currentItem = directions.currentItem+1;				
		}
		directions.reached = false;
	}
}
