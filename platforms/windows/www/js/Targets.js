//responsible for the section Tour.

var targets = {
	
	targetItems: new Array(),
	markers: new Array(),
	
	icons: new Array(L.icon({iconUrl: 'css/eins.png', iconSize:[20, 25]}),L.icon({iconUrl: 'css/zwei.png', iconSize:[20, 25]}),
	L.icon({iconUrl: 'css/drei.png', iconSize:[20, 25]}),L.icon({iconUrl: 'css/vier.png', iconSize:[20, 25]}),
	L.icon({iconUrl: 'css/fuenf.png', iconSize:[20, 25]}),L.icon({iconUrl: 'css/sechs.png', iconSize:[20, 25]}),
	L.icon({iconUrl: 'css/sieben.png', iconSize:[20, 25]}),L.icon({iconUrl: 'css/acht.png', iconSize:[20, 25]})),
	
	tourGenerated: false,
	
	//triggered by the function: add to tour. Fills array targetItems 
	addTarget: function(name, selection){
		var that = this;
		$.mobile.loading('show');
		$.ajax({
			type: "GET",
			url: 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + selection.lat + ',' + selection.lng + '&key=AIzaSyCmGfbyXgyQviltRiEU-qVBOY3AM7liH7k',
			dataType: "json",
			success: function (data){
				$.mobile.loading('hide');
				$.rustaMsgBox({ 
					"content" : language.destinationadded,
					"mode": 'success', 
				});
				var street = data.results[0].address_components[1].long_name;
				var number = data.results[0].address_components[0].long_name;
				if (typeof street === "undefined"){
					street = "";
					number = "";
				}
				if (typeof number === "undefined"){
					number = "";
				}

				that.targetItems.push({name:name, location:selection, street:street + " " + number, timeNeeded:""});
				that.showTargets();
				if (name === "Unbekannt"){
					popupName = "";
				}else{
					popupName = name;					
				}
				
				that.drawMarker(targets.targetItems);
			},
			error: function(){
				$.rustaMsgBox({ 
					"content" : language.destinationnotadded,
					"mode": 'error', 
				});				
				$.mobile.loading('hide');
			}
		});		
			
	},
	
	addToTargets: function(selection){
		selection = JSON.parse(decodeURI(selection));
		this.addTarget(selection.name, selection.location);
	},
	
	//Popup after clicking on Generate tour 
	askForOptimization: function(){
		var that = this;
		var mode = false;
		var $popUp = $("<div/>").popup({
			dismissible: false,	theme: "b",
			overlyaTheme: "e", transition: "pop"
		}).on("popupafterclose", function () {
			//remove the popup when closing
			    $(this).remove();
		}).css({'width': '270px',
				'height': '250px',
				'padding': '3px'
		});
		
		//create a message for the popup
		$("<p/>", {
			text: language.preferredtravelmode
		}).appendTo($popUp);
		
		$("<a>", {
			text: language.roundtrip
		}).buttonMarkup({
		}).on("click", function () {
			optimize = 1;
			$popUp.popup("close");
			$.mobile.loading('show');
			that.generateTour(optimize);		
		}).appendTo($popUp);		
		
		$("<a>", {
			text: language.lastlocation
		}).buttonMarkup({
		}).on("click", function () {
			optimize = 2;
			$popUp.popup("close");
			that.generateTour(optimize);
		}).appendTo($popUp);			    

		$("<a>", {
			text: language.maintainorder
		}).buttonMarkup({
		}).on("click", function () {
			optimize = 3;
			$popUp.popup("close");
			that.generateTour(optimize);
		}).appendTo($popUp);		

		$("<a>", {
			text: language.close
		}).buttonMarkup({
		}).on("click", function () {
			$popUp.popup("close");
		}).appendTo($popUp);		
		
		$popUp.popup('open').trigger("create");			
	},
	
	//optimize is the mode of the tour
	generateTour: function(optimize){
		$.mobile.loading('show');
		map.deleteTourFromMap();
		map.deleteDestinationMarker();
		tsp.generateTour(optimize);
		this.tourGenerated = true;
		if (!mobileDevice){
			generateQR.init(optimize);
		}	
	},
	
	//deletes item out of targets.targetItems
	deleteItem: function(index){
		targets.targetItems.splice(index, 1);  
		targets.showTargets();
	},
	
	//deletes all selected items out of the list in the section tour
	clearSelection: function(){
		$('#targets').empty();
		map.deleteDestinationMarker();
		this.tourGenerated = false;
		this.targetItems = new Array();
		map.deleteTourFromMap();
		generateQR.clear();
		tsp.clear();
		if (mobileDevice){
			directions.clear();			
		}
		this.drawMarker();
		this.showTargets();
		if (mobileDevice){
			$('#targets').append($('<p id = "intro">'+language.tourIntroMobile+'</p>'));				
		}else{
			$('#targets').append($('<p id = "intro">'+language.tourIntro+'</p>'));	
		}
		
		backtomapButton('#targets');

	},
	
	//shows all targets selected as a list including name (if available), address, time needed (if already generated), 
	//take me there and delete button.
	showTargets: function(){
		var that = this;
		$('#targets').empty();
		$list = $('<ul data-role="listview" data-inset="true" style = "margin-left:1%;margin-right:1%;margin-bottom:20%;"></ul>');
		$header = $('<li data-role="list-divider">'+language.selectedlocations+'</li>');
		$list.append($header);
		for (var i = 0; i < that.targetItems.length; i++){
			var dataSet = encodeURI(JSON.stringify(that.targetItems[i]));
			var name = that.targetItems[i].name;
			var address = "";
			var timeNeeded = that.targetItems[i].timeNeeded;
			if ( timeNeeded.trim() != ""){
				timeNeeded = ". <b>" + timeNeeded + " Min.</b>";
			}
			if (that.targetItems[i].street.trim() != ""){
				address = that.targetItems[i].street;				
			}
			if (that.targetItems[i].name.trim() != ""){
				name = name + ", ";				
			}			
			$list.append($('<li>'+ name + address + timeNeeded +  
						'<div><button data-inline="true" data-mini="true" onclick=showDirection2("'+dataSet+'");>'+language.takemethere+'</button>'+
						'<button data-inline="true" data-icon="delete" data-mini="true" onclick="targets.deleteItem('+i+')" >'+language.deleteItem+'</button></div></li>'));
		}
		if ( tsp.startLocation != null) {
			$list.append($('<li>'+ tsp.startLocation.name + ", " +  tsp.startLocation.street + ". <b>" + 
							tsp.startLocation.timeNeeded  + " Min.</b>" + '</li>'));
		}
		if ( tsp.totalTime != null && that.targetItems.length > 1 ) {
			$list.append($('<p>' + language.totaltimeneeded + Math.round(tsp.totalTime/60) + ' Min.<p>'));
		}
		if ( that.targetItems.length > 1 ){
			$list.append($('<button data-inline="true" data-theme="a" data-mini="true" onclick="targets.askForOptimization()">'+language.generatetour+'</button>'));
			$list.append($('<button data-inline="true" data-theme="a" data-mini="true" onclick="targets.clearSelection()">'+language.deletetour+'</button>'));	
			if (that.tourGenerated && mobileDevice){
				$list.append($('<button data-inline="true" data-theme="a" data-mini="true" onclick="directions.startTour()" style="background: #66FF66; color: #black;">'+language.starttour+'</button>'));							
			}
		}
		$('#targets').append($list).trigger('create');
	},
	
	//draws marker including number...
	drawMarker: function(list){
		var that = this;
		for ( var i = 0; i < that.markers.length; i++ ){
			map.removeLayer(that.markers[i]);
		}
		for ( var i = 0; i < that.targetItems.length; i++ ){
			var marker = L.marker([that.targetItems[i].location.lat,that.targetItems[i].location.lng],{icon: that.icons[i]}).
							bindPopup(that.targetItems[i].name + " " + that.targetItems[i].street);
				marker.addTo(map);
				that.markers.push(marker);
		}
	}
};