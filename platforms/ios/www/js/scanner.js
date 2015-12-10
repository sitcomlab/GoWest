//initializes the scanner in the menu in the map section.

//strange error at the moment. 

var scanner = {
	
	processData: function(data){
		scannedTour = data.text.split(";")[0];
		mode = parseInt(data.text.split(";")[1]);
		//strange behavior: revise
		tour = JSON.parse(scannedTour.substring(1,scannedTour.length));
		if ( tour.length > 1 ){
			targets.targetItems = tour;
			targets.generateTour(mode);			
		}else if ( mode === 0 ){
			map.bringMeThere(tour[0].name,tour[0].location,tour[0].street);
		}

	},
	
	//confirmation message before the scanner starts
	showPopupForQR: function(){
		var that = this;
		var $popUp = $("<div/>").popup({
			dismissible: true,
			theme: "b",
			overlyaTheme: "e",
			transition: "pop"
		}).on("popupafterclose", function () {
			//remove the popup when closing
			    $(this).remove();
		}).css({
		    'width': '270px',
			'height': '120px',
			'padding': '3px'
		});
		
		//create a message for the popup
		$("<p/>", {
			text: language.scannerpopup
		}).appendTo($popUp);

		$("<a>", {
			text: language.startscan
		}).buttonMarkup({
			    inline: true
		})
		.css({
			'text-align':'center;'
		})
		.on("click", function () {
			$popUp.popup("close");
			that.scanQR();
		}).appendTo($popUp);
		
		$("<a>", {
			text: language.close
		}).buttonMarkup({
			    inline: true
		}).on("click", function () {
			$popUp.popup("close");
		}).appendTo($popUp);		
		
		$popUp.popup('open').trigger("create");	
	},
	
	scanQR: function(){
		var that = this;
		cordova.plugins.barcodeScanner.scan(
  				function (result) {
  					console.log(result);
  					that.processData(result);
  				}, 
		      	function (error) {
		        	console.log("error");
		      }
		 );		
	},
	
	initializeScanner: function(){
		var that = this;
		$("<button>", {
        	text: language.scanner
    	}).buttonMarkup({
        		mini: true
			}).css({
				'margin-left':'1%',
				'margin-right':'1%'
			}).on("click", function () {
				that.showPopupForQR();
		    })
		    .appendTo($('#layerSwitcher'));
	},
	
	init:function(){
		this.initializeScanner();	
	}
};
