var sliderIsVisible = false;

function timeSlider(){
	if (sliderIsVisible){
		$('#timeslider').remove();
		map.removeLayer(circle);
		sliderIsVisible = false;			
	}else{
		$div = $('<div data-role="fieldcontain" id = "timeslider"></div>');
		$label = $('<label for="timeSlider" style = "background-color: white; width:35%;">'+language.timeframe+'</label>');
		$input = $('<input type="range" name="timeSlider" id="timeSlider" value="0" min="0" max="120" data-theme="a" data-track-theme="b" step="5" />');
		$div.append($label);
		$div.append($input);
		$('#tab1').append($div);
		$('#timeslider').trigger('create');
		bindChangeEvent();
		sliderIsVisible = true;
	}
}

function bindChangeEvent(){
	$( "#timeSlider" ).bind( "change", function(event, ui) {
		position = currentPosition;
		if (circle === ""){
			
		}else{
			map.removeLayer(circle);				
		}			
		if (parseInt(event.target.value) > 0 ){
			if (typeof currentPosition != 'undefined'){
				position = [currentPosition._lat, currentPosition._lon];
			} 					
			circle = L.circle(position, event.target.value*50, {
			    color: 'green',
			    fillColor: 'green',
			    fillOpacity: 0.2
			}).addTo(map); 	 		
		}			
	}); 
}