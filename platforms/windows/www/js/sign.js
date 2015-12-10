//Form for collecting signage
//Probably not needed anymore.

var form = {
	tempMap: map,
    initialize: function() {  	
        this.createForm();
    },
    
    createForm: function(){
    	$form = $('<div style = "width:80%; margin-right:auto; margin-left:auto; margin-top: 1%;"></div>');
    	$('#tab4').append($form);
    	$form.append('<label for="text-1">Sign content:</label>');
    	$form.append('<input type="text" name="text-1" id="text-1" value="">');
    	$form.append('<label for="text-2">Tags:</label>');
    	$form.append('<input type="text" name="text-2" id="text-2" value="">');
    	
    	$form.append('<button class="ui-btn ui-btn-inline" onclick="getValues();">Get values</button>');
    	$form.append('<label for="text-3">Coordinates:</label>');
    	$form.append('<input type="text" name="text-3" id="text-3" value="">');
    	$form.append('<label for="text-4">Direction:</label>');
    	$form.append('<input type="text" name="text-4" id="text-4" value="">'); 
    	$form.append('<button class="ui-btn ui-btn-inline" onclick="saveSign();">Save Sign</button>');   	    	    	
		$('.ui-page').trigger('create');
    },
};

function getValues(){
	$('#text-3').val(currentPosition._lat + ", " + currentPosition._lon);
	$('#text-4').val(currentHeading);
}

function saveSign(){
	$.ajax({
			type: "POST",
	//		url: 'php/addSign.php?',		
			url: 'http://giv-konkol.uni-muenster.de/TIS/php/addSign.php?',
			data:	{	
				signContent: $('#text-1').val(),
				tags: $('#text-2').val(),
				coordinates: $('#text-3').val(),
				direction: $('#text-4').val()
				},
			success:function(data){
					if ( data === "check"){
						alert("Added successfully.");
						clearForm();
					}
					
				},	
			error: function(data){
				console.log("Error");
			}			
		});
}

function clearForm(){
	$('#text-1').val("");
	$('#text-2').val("");
	$('#text-3').val("");
	$('#text-4').val("");
}

