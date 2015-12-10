//responsible for updating the current position of the user and 
// the compass with respect of the heading of the device and the next destination

var destinationPosition;
var destinationBearing;

var positionTimerId;
var currentPosition;
var prevPosition;
var prevPositionError;      

var compassTimerId;
var currentHeading;
var prevHeading;
var prevCompassErrorCode;

function watchPosition(){
    if(positionTimerId) navigator.geolocation.clearWatch(positionTimerId); 
    positionTimerId = navigator.geolocation.watchPosition(onPositionUpdate, onPositionError, {
        enableHighAccuracy: true,
        timeout: 1000,
        maxiumumAge: 0
    });
}

function watchCompass(){
    if(compassTimerId) navigator.compass.clearWatch(compassTimerId);
    compassTimerId = navigator.compass.watchHeading(onCompassUpdate, onCompassError, {
        frequency: 1 // Update interval in ms
    });
}

function onPositionUpdate(position){
    if(position.coords.accuracy > minPositionAccuracy) return;

    prevPosition = currentPosition;
    currentPosition = new LatLon(position.coords.latitude, position.coords.longitude);
    if(prevPosition && prevPosition.distanceTo(currentPosition)*1000 < minUpdateDistance) return;

	checkForSignage();
    updatePositions();
}

function onPositionError(error){
    watchPosition();

    if(prevPositionError && prevPositionError.code == error.code && prevPositionError.message == error.message) return; 

    $error.html("Error while retrieving current position. <br/>Error code: " + error.code + "<br/>Message: " + error.message);

    if(!$error.is(":visible")){
        $error.show();
        $results.hide();
    }

    prevPositionError = {
        code: error.code,
        message: error.message
    };
}

function onCompassUpdate(heading){
    prevHeading = currentHeading;
    currentHeading = heading.trueHeading >= 0 ? Math.round(heading.trueHeading) : Math.round(heading.magneticHeading);

    if(currentHeading == prevHeading) return;

    updateHeading();
}


function onCompassError(error){
    watchCompass();

    if(prevCompassErrorCode && prevCompassErrorCode == error.code) return; 

    var errorType;
    switch(error.code){
        case 1:
            errorType = "Compass not supported";
            break;
        case 2:
            errorType = "Compass internal error";
            break;
        default:
            errorType = "Unknown compass error";
    }

    $error.html("Error while retrieving compass heading: "+errorType);

    if(!$error.is(":visible")){
        $error.show();
        $results.hide();
    }

    prevCompassErrorCode = error.code;
}


//Triggered everytime a new destination is chosen.
//fills destination section with values. Future improvement: Create destination object instead...
function updateDestination(name, location, street, time){
	$destinationName.html(name);
	$destinationStreet.html(street);
	$('#timeNeeded').html(time);
	map.setDestinationMarker(location);
    destinationPosition = new LatLon(location.lat, location.lng);
    updatePositions();
}       

//Triggered after every update of the GPS-based location of the user.
//Potential improvement: Enhance update frequency.
function updatePositions(){
    if(!currentPosition) return;

    if(!$results.is(":visible")){
        $results.show();
        $error.hide();
    }

    destinationBearing = Math.round(currentPosition.bearingTo(destinationPosition));
    var distance = Math.round(currentPosition.distanceTo(destinationPosition)*1000);
    $('#distance').html(distance);
    if (distance < 15 && !directions.reached) {
    	createArrivalPopup();
    	directions.reached = true;
    }
    $bearing.html(destinationBearing);

    updateDifference(); 
}


function updateHeading(){
    updateDifference();
}

//responsible for rotating the compass with respect of the current heading of the device and the direction of the destination.
//Potential improvement: Filter which smooting the movement of the arrow.
function updateDifference(){
    var diff = destinationBearing - currentHeading;
    $difference.html(diff);         
    $arrow.css("-webkit-transform", "rotate("+diff+"deg)");         
}

