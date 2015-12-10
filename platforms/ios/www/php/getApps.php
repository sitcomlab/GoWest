<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=SignageTemp user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
	
	
	$location = $_POST['loc'];	
	
	$location = json_encode($location);
	$location = json_decode($location);	
	
	//$checkSignage=pg_query($dbconn,"select * from Signage where ST_Contains(Signage.polygonSign, ST_GeomFromText('POINT(".$location->{'lat'}." ".$location->{'lng'}.")', 4326)) AND ST_Contains(Signage.polygonDirection, ST_GeomFromText('POINT(".$destination->{'lat'}." ".$destination->{'lng'}.")', 4326));");
	$getApps=pg_query($dbconn,"select name,granularity,url,\"downloadLink\" from \"Apps\" where ST_Contains(\"polygons\", ST_GeomFromText('POINT(".
									$location->{'lat'}." ".$location->{'lng'}.")',4326)) order by \"granularity\";");
	$resultArray = pg_fetch_all($getApps);
	$json = json_encode($resultArray);
	echo $json;

?>