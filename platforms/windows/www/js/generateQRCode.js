//Generates a QR Code only if kiosk system is used

var generateQR = {
	
	mode: null,
	singleLocation:null,
			
	createQRCodeTour: function(){
		$('#qrcode').append($('<p id = "qrcodeIntro">'+language.scancode+'</p>'));
		var qrcode = new QRCode("qrcode", {
		    text: this.getData(),
		    width: 512,
		    height: 512,
		    colorDark : "#000000",
		    colorLight : "#ffffff",
		    correctLevel : QRCode.CorrectLevel.H
		});		
	},

	//returns json out of the tour attached by the tour mode 0,1,2, or 3. 
	getData: function(){
		if (parseInt(this.mode) === 0){
			var json = JSON.stringify(this.singleLocation);	
			json = json + ";" + this.mode;
			return json;			
		}else{
			var json = JSON.stringify(targets.targetItems);	
			json = json + ";" + this.mode;
			return json;				
		}

	},
	
	clear: function(){
		$('#qrcode').empty();
		this.mode = null;
		$('#qrcode').append($('<p id = "intro">'+language.qrcodeIntro+'</p>'));
		backtomapButton('#qrcode');
	},

	init: function(mode, name, location, address, time){
		this.mode = mode;
		if (parseInt(this.mode) === 0){
			this.singleLocation = new Array({name:name,location:location,address:address,time:time});
		}
		$('#qrcode').empty();
		this.createQRCodeTour();
	}
};
