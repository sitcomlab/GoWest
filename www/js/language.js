var language = {
	
	init: function(){
		if (languageSelection === "german"){
			this.currentPosition = "Aktuelle Position";
			this.currentTarget = "Aktuelles Ziel";
			this.takemethere = "Bring mich dahin";
			this.addtotour = "Zur Tour hinzufügen";
			this.showapps = "Zeige Apps";
			this.timeframe = "Zeitrahmen";
			this.food = "Essen";
			this.backtomap = "Zurück zur Karte";
			this.time = "Zeit";
			this.timeunit = " Minuten";
			this.target = "Ziel";
			this.distance = "Distanz bis zum Ziel: ";
			this.distanceunit = " Meter";
			this.tourIntro = "Keine Punkte ausgewählt. </br> Erstellen Sie eine Tour, indem Sie mit einem Rechts-Klick auf der Karte Punkte hinzufügen.";
			this.tourIntroMobile = "Keine Punkte ausgewählt. </br>Halten Sie eine Position auf der Karte gedrückt und fügen Sie diese anschließend hinzu, um hier eine Tour zu erstellen.";			
			this.qrcodeIntro = "Keine Tour ausgewählt. </br> Erstellen Sie eine Tour und holen Sie sich hier den QR code ab.";
			this.introdirections = 'Keine Positionen ausgewählt. </br>Wählen Sie eine Position mit der Funktion "Bring mich dahin" oder erstellen Sie eine Tour und erhalten Sie anschließend hier die Navigationshilfe.';
			this.relatedapps = 'Apps <p style = "font-size:70%">für Ihre aktuelle Position</p>';
			this.website = "Webseite";
			this.deleteItem = "Löschen";
			this.generatetour = "Tour berechnen";
			this.deletetour = "Tour löschen";
			this.starttour = "Tour starten";
			this.selectedlocations = "Ausgewählte Standorte (Name, Adresse)";
			this.totaltimeneeded = "Benötigte Gesamtzeit: ";
			this.preferredtravelmode = "Wie möchten Sie die Tour durchführen?";
			this.roundtrip = "Rundtour und zurück";
			this.lastlocation = "Letzte Position ist das Ziel";
			this.maintainorder = "Reihenfolge beibehalten";
			this.close = "Schließen";
			this.scancode = "Scannen Sie den folgenden QR code mit der App GoWest und erhalten Sie so die ausgewählte Route.";
			this.scannerpopup = "Sie können den Scanner nutzen, um Routen zu erhalten.";
			this.startscan = "Scan starten";
			this.scanner = "Scanner";
			this.origin = "Herkunft";
			this.timeneeded = "Benötigte Zeit: ";
			this.successfullygenerated = "Tour erfolgreich berechnet. Drücken Sie Tour starten.";			
			this.limitedtour = "Eine Tour ist auf 8 Standorte begrenzt.";
			this.destinationadded = "Ziel hinzugefügt";
			this.destinationnotadded = "Ziel konnte nicht hinzugefügt werden!";
			this.nextdestination = "Nächstes Ziel";
			this.previousdestination = "Vorheriges Ziel";
			this.arrived = "Hey, Sie sind angekommen";
			this.signage1 = "Hey, ein braunes Schild mit dem Inhalt ";
			this.signage2 = " steht in der Nähe von Ihnen und zeigt die richtige Richtung an. Sie können dem Schild folgen.";	
			this.sights = "Attraktion";	
			this.help = "Hilfe";	
			this.support1 = "Zeige Apps: Zeigt Apps, die für Ihren Standort relevant sind.";
			this.support2 = "Zeitrahmen: Zeigt den Bereich an, den Sie in einer vorgegebenen Zeit erreichen können.";
			this.support3 = "Rote Bereiche: Die roten Bereiche zeigen für die jeweils aktive Kategorie (Bars, Shops..) an, wo Ballungsräume existieren.";
			this.support4 = "Ermöglicht die Suche nach Orten, wie Straßennamen oder Gebäudenamen.";
			this.support5 = "Zeigt Ihre aktuelle Position an.";
			
		}else if(languageSelection === "english"){
			this.currentPosition = "Current location";
			this.currentTarget = "Current target";
			this.takemethere = "Take me there";
			this.addtotour = "Add to tour";
			this.showapps = "Show Apps";
			this.timeframe = "Timeframe";
			this.food = "Food";
			this.backtomap = "Back to map";
			this.time = "Time";
			this.timeunit = " Minutes";			
			this.target = "Target";	
			this.distance = "Distance to destination: ";	
			this.distanceunit = " Meters";	
			this.tourIntro = "No locations selected. </br> Create a tour by right-clicking on the map and adding locations.";
			this.tourIntroMobile = "No locations selected. </br>Keep pressing on the map and add the location to the list in order to create a tour.";
			this.qrcodeIntro = "No tour available. </br>Create and generate a tour and grap the Qr code here.";
			this.introdirections = 'No location or tour selected. </br>Select a region by using "Take me there" or create a tour and grab directions here. ';			
			this.relatedapps = 'Apps <p style = "font-size:70%">related to your current location</p>';
			this.website = "Website";
			this.deleteItem = "Delete";
			this.generatetour = "Generate tour";
			this.deletetour = "Delete tour";
			this.starttour = "Start Tour";		
			this.selectedlocations = "Selected locations (Name, Address)";	
			this.totaltimeneeded = "Total time needed: ";
			this.preferredtravelmode = "Which travel mode do you prefer?";
			this.roundtrip = "Roundtour back to origin";
			this.lastlocation = "Tour stops at last location";
			this.maintainorder = "Maintain selected order";
			this.close = "close";
			this.scancode = "Scan the following QR code using GoWest and take the route with you.";
			this.scannerpopup = "You can use the scanner to receive routes from QR codes.";
			this.startscan = "Start scan";
			this.scanner = "Scanner";
			this.origin = "Origin";
			this.timeneeded = "Time needed: ";
			this.successfullygenerated = "Tour generated successfully. Press Start Tour.";
			this.limitedtour = "A tour is limited to 8 locations.";
			this.destinationadded = "Destination added";
			this.destinationnotadded = "Could not add target!";
			this.nextdestination = "Next target";
			this.previousdestination = "Previous target";
			this.arrived = "Hey, you arrived";
			this.signage1 = "Hey, the brown signage with the content ";
			this.signage2 = " is around you and shows the right direction. You can follow it.";
			this.sights = "Sight";
			this.help = "Support";
			this.support1 = "Show Apps: Show apps relevant to your current position.";
			this.support2 = "Timeframe: Shows the region you can reach within a period of time.";
			this.support3 = "Red areas: The red areas show hotspots for the corresponding category (Bars, Shops...).";
			this.support4 = "Allows to search for locations like street names or building names.";
			this.support5 = "Shows your current position.";			
		}
	}
};