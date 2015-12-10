GoWest

based on the Apache Cordova platform



index.html
Startpage of the application, allows to choose between English or German and to have a look at the About-section

app_de.html
German version of the system

app_en.html
English version of the system

Folder:

css
contains the photographs of the brown signs.

php

checkSignage:
checkSignage triggered by "checkForSignage()" in general.js: checks if the location of a user is within the square of a signage (see thesis) and returns the ID of the signage. Based on this ID, "checkForSignage()" in general.js searches for the corresponding photograph.

getApps.php:
triggered by proposeApps() in appControl.js.
Searches for appropriate apps based on the location of the user.

js

index.js
initializes map. Differentiates between laptop version and mobile device version. Initializes context menu, support, and menu in the upper right corner. Listens to watchposition (see compass.js) in case of mobile usage. 

compass.js
responsible for localization and the orientation of the device.

map.js
responsible for everything on the map: heatmaps and the corresponding markes, geocoder, zooming, functionality in the context menu.

targets.js
responsible for the tour section. Triggers functionality in tsp.js

tsp.js
generates tour based on (open) travelling salesman problem.

appControl.js
sends request for location-based apps and initializes the sidebar.

configuration.js
contains coordinates and further values for defining the map extent.

directions.js
responsible for the Directions section in the appControl

general.js
contains requests for the heatmaps, signage. Creates signage- and arrival popups. Creates "back to map"-buttons.

generateQRcode.js
generates qr codes if the system is used on a kiosk system or on a laptop.

scanner.js
initializes the qr code scanner and processes the qr code.

timeslider.js
responsible for the time frame in the map section.

sign.js
form for collecting signage (currently not included in the app)

language.js
contains translations.