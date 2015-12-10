<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=SignageTemp user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());
	
	
	$location = $_POST['loc'];
	$destination = ($_POST['dest']);	
	
	$location = json_encode($location);
	$location = json_decode($location);
	
	$destination = json_encode($destination);
	$destination = json_decode($destination);
	
	
	//$checkSignage=pg_query($dbconn,"select * from Signage where ST_Contains(Signage.polygonSign, ST_GeomFromText('POINT(".$location->{'lat'}." ".$location->{'lng'}.")', 4326)) AND ST_Contains(Signage.polygonDirection, ST_GeomFromText('POINT(".$destination->{'lat'}." ".$destination->{'lng'}.")', 4326));");
	$checkSignage=pg_query($dbconn,"select * from \"Signage\" where ST_Contains(\"polygonSign\", ST_GeomFromText('POINT(".
									$location->{'lat'}." ".$location->{'lng'}.")')) AND ST_Contains(\"polygonDirection\", ST_GeomFromText('POINT(".
									$destination->{'lat'}." ".$destination->{'lng'}.")'));");
	$resultArray = pg_fetch_all($checkSignage);
	$json = json_encode($resultArray);
	echo $json;

?>