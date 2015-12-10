//Coordinates for all signs. Probably not needed anymore

var signs = {
	
	signage: new Array(
						51.965241,7.617490,
						51.963423, 7.617833,
						51.963952, 7.621846,
						51.964381, 7.623435,
						51.963099,7.624519,
						51.965297, 7.626252,
						51.964007, 7.626416,
						51.964573, 7.628854,
						51.963834, 7.627524,
			////51.963129, 7.628396,
			////		51.964116, 7.630394,
			////		51.961349, 7.632244,
			////		51.962042, 7.630388,
			////		51.962591, 7.628520,
						51.961707, 7.627974,
			////		51.960635, 7.625945,
			////		51.960398, 7.626137, nicht da
						51.959476, 7.626093,
						51.957598, 7.627470,
						51.959148, 7.629111,
						51.959155, 7.627413,
			////		51.959912, 7.629153,
						51.957304, 7.630054,
			////		51.963865, 7.625501,
						51.957488, 7.631680,
						51.959777, 7.634904,
						51.960166, 7.633572
			////		51.961958, 7.635429,
			////		51.962001, 7.634623
						),
	
	drawSigns: function(){
		for (var i = 0; i < this.signage.length-1; i+=2){
			L.marker([this.signage[i],this.signage[i+1]]).bindPopup("h"+i).addTo(map);
		}	
	}/*,
	
	calculateDistance: function(){
		for ( var i = 0; i < this.signage.length-1; i+=2 ){
			console.log(new LatLon(this.signage[i], this.signage[i+1]).distanceTo(new LatLon(51.970242, 7.616415)));
			if ( new LatLon(this.signage[i], this.signage[i+1]).distanceTo(new LatLon(currentPosition)) < 60){
				console.log("whoho")
			}
		}		
	}*/					
	
};


