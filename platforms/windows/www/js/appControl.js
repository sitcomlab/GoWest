//Responsible for proposing apps based on the current location of the user.

//No CORS on server.
function proposeApps(location){
	$.ajax({
		type: "POST",
		url: 'http://giv-konkol.uni-muenster.de/TIS/php/getApps.php',
	//	url: 'php/getApps.php',		
		data:{
			loc:{lat:location._lat,lng:location._lon}
		},
		success: function (data){
			data = JSON.parse(data);
			initiateSidebar(data);
		},
		error: function(data){
			console.log("error");
		}
	});
}

//Potential improvement: more fine-grained areas, description for apps (or: leave not self-explaining apps out). 
function initiateSidebar(json){
	$('#myPanel').empty();
	$('#myPanel')
		.append($('<h2>')
		.attr({
			'id': 'panelHeader'
		}).css({
			'margin-left': "1%"
		})
		.html(language.relatedapps));
    $('#myPanel')
        .append($('<div>')
        .attr({
        'data-role': 'collapsible-set',
            'id': 'primary'
    }));
    ///android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase());
    for (i = 0; i < json.length; i++) {
        var download;
        if (/android/i.test(navigator.userAgent.toLowerCase())){
        	download = '<a href='+json[i].downloadLink.split(",")[0]+'><img class = "androidImage" src="css/android.png"></img></a>';
        }else if (/iphone|ipad/i.test(navigator.userAgent.toLowerCase())){
        	download = '<a href='+json[i].downloadLink.split(",")[1]+'><img class = "androidImage" src="css/apple.png"></img></a>';
        }else{
        	download = '<a href='+json[i].downloadLink.split(",")[0]+'><img class = "androidImage" src="css/android.png"></img></a>' +
        				'<a href='+json[i].downloadLink.split(",")[1]+'><img class = "androidImage" src="css/apple.png"></img></a>';
        }
        ($('<div>')
            .attr({
            'data-role': 'collapsible',
                'data-content-theme': 'c',
                'data-collapsed': 'true',
                'data-mini': 'true'
        })
            .html('<h4>' + json[i].name + '</h4><p></p>' + 
            		'<a href = '+json[i].url+'>'+language.website+'</a>' + '</br>' +
            		 download))
            .appendTo('#primary');
    }
    $('#myPanel').collapsibleset().trigger('create');	
    $( "#myPanel" ).panel( "toggle" );
}