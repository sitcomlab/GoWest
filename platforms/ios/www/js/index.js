
var app = {
    initialize: function() { 
    	language.init(); 	//German or English available.
        this.bindEvents();
        this.createMenu();
    },


    bindEvents: function() {
    	//check if kiosk or mobile device
    	mobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());

		document.addEventListener('deviceready', this.onDeviceReady, false);
		//context menu not used at the moment.
		document.addEventListener('menubutton', this.contextMenu, false);
		
		$(document).ready(function () {
					
			$(document).delegate('.ui-navbar ul li > a', 'click', function() {
			  	//search the navbar to deactivate the active button
			  	$(this).closest('.ui-navbar').find('a').removeClass('ui-btn-active');
			
			  	//change the active tab
			  	$(this).addClass('ui-btn-active');
			
			  	//hide the siblings
			  	$('#' + $(this).attr('data-href')).show().siblings('.tab-content').hide();
			
				return false;
			});			
						
			map = new Map('map').setView([cfg.extentLat, cfg.extentLng], cfg.zoomLevel);
			      var googleLayer = new L.Google('ROADMAP');
      map.addLayer(googleLayer);			
			map.initMap();
			if ( !mobileDevice ){
				currentPosition = new LatLon(cfg.displayPositionLat, cfg.displayPositionLng);
	        	L.marker([cfg.displayPositionLat, cfg.displayPositionLng]).
								bindPopup(language.currentPosition).addTo(map);
				$('#tab3').append($('<div id = "qrcode"></div>'));	
				$('#qrcode').append($('<p id = "intro">'+language.qrcodeIntro+'</p>'));										
				backtomapButton('#qrcode');
			}
		
			if (mobileDevice){
				$('#targets').append($('<p id = "intro">'+language.tourIntroMobile+'</p>'));				
			}else{
				$('#targets').append($('<p id = "intro">'+language.tourIntro+'</p>'));	
			}
			
			backtomapButton('#targets');
			
			//call for openstreetmap data bars, shops...
			call1(map);
			
			if (mobileDevice){
				$('#tab3').append($('<p id = "introDirections">'+language.introdirections+'</p>'));				
				backtomapButton('#tab3');
			}
		});
	},
	
	createMenu: function(){
		$("<li>", {
			text: language.help
		}).buttonMarkup({
			mini: true
		}).css({
			'margin-left':'1%',
			'margin-right':'1%'
		}).on("click", function () {
			help();
		}).appendTo($('#layerSwitcher'));			
		
		if (mobileDevice){
			scanner.init(); 
		}		
		
		$showApps = $('<div>');
		$("<li>", {
			text: language.showapps
		}).buttonMarkup({
			mini: true
		}).css({
			'margin-left':'1%',
			'margin-right':'1%'
		}).on("click", function () {
			map.setView(L.latLng(currentPosition._lat, currentPosition._lon),16);
			proposeApps(currentPosition);
		}).appendTo($('#layerSwitcher'));

		$("<li>", {
			text: language.timeframe
		}).buttonMarkup({
			mini: true
		}).css({
			'margin-left':'1%',
			'margin-right':'1%'
		}).on("click", function () {
			timeSlider();
		}).appendTo($('#layerSwitcher'));
		
		$layerSwitcher = $('<fieldset data-role="controlgroup" data-type="vertical" id = ""></fieldset>');
		$layerSwitcher.append($('<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2b" value="barsLayerGroup" checked="true">'));
		$layerSwitcher.append($('<label for="radio-choice-h-2b"></label>').html('<b>Bars</b>'));
		$layerSwitcher.append($('<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2c" value="shopsLayerGroup">'));
		$layerSwitcher.append($('<label for="radio-choice-h-2c"></label>').html('<b>Shops</b>'));
		$layerSwitcher.append($('<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2a" value="foodLayerGroup">'));
		$layerSwitcher.append($('<label for="radio-choice-h-2a"></label> ').html('<b>'+language.food+'</b>'));
		$layerSwitcher.append($('<input type="radio" name="radio-choice-h-2" id="radio-choice-h-2d" value="sightsLayerGroup">'));
		$layerSwitcher.append($('<label for="radio-choice-h-2d"></label> ').html('<b>'+language.sights+'</b>'));		
		$('#layerSwitcher').append($('<h1></h1>'));
		$('#layerSwitcher').append($layerSwitcher);			
	},
	
	contextMenu: function(){
		if(menuOpen) {
			menu.style.display="none";
			menuOpen = false;
		} else {
			menu.style.display="block";
			$('#configure').bind("click",function(e){
				navigator.app.exitApp();
			});
			menuOpen = true;
		}
	},
	
    onDeviceReady: function() {     
    	    //only on mobile device   
            minPositionAccuracy = 50; // Minimum accuracy in metres to accept as a reliable position
            minUpdateDistance = 1; // Minimum number of metres to move before updating distance to destination

            $targetLat = $('#target-lat');
            $targetLon = $('#target-lon');
            $error = $('#error');           
            $results = $('#results');
            $distance = $('#distance');
            $bearing = $('#bearing');
            $destinationName = $('#destinationName');
            $destinationStreet = $('#destinationStreet');
            $heading = $('#heading');
            $difference = $('#difference');
            $arrow = $('#arrow');
            
            watchPosition();            
            watchCompass();    
               
    }
};

app.initialize();

//support section within the mnu
function help(){
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
		'height': '450px',
		'padding': '3px'
	});
	
	//create a message for the popup
	$("<p/>", {
		text: language.support1
	}).appendTo($popUp);
	
	//create a message for the popup
	$("<p/>", {
		text: language.support2
	}).appendTo($popUp);
	
	//create a message for the popup
	$("<p/>", {
		text: language.support3
	}).appendTo($popUp);		

	$("<img/>", {
		src: "css/locator.png"
	}).css({
		'background-color':'white'
	})
	.appendTo($popUp);	
	
	//create a message for the popup
	$("<p/>", {
		text: language.support5
	}).appendTo($popUp);	
	
	$("<img/>", {
		src: "css/geocoder.png"
	}).css({
		'background-color':'white'
	})
	.appendTo($popUp);	
	
	//create a message for the popup
	$("<p/>", {
		text: language.support4
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
}
