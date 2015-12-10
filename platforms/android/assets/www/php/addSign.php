<?php
$dbconn = pg_connect("host=giv-konkol.uni-muenster.de port=5432 dbname=Signage user=postgres password=navigeo1")
	or die('Verbindungsaufbau fehlgeschlagen: ' . pg_last_error());

	header("Content-Type: text/html; charset=utf-8");  


	$signContent = $_POST['signContent'];
	$tags = ($_POST['tags']);
	$coordinates = $_POST['coordinates'];
	$direction = $_POST['direction'];
	$coordinates = explode("," , $coordinates);
	$tags = explode(" ",$tags);
	$tags = createArrayText($tags);
	
	$SignQuery=pg_query($dbconn,"insert into \"Signs\" values (default,'".$signContent."',".$direction.", POINT(".$coordinates[0].", ".$coordinates[1]."),".$tags.");");

	function createArrayText($array){
	$arraytext = "ARRAY[";
	for ( $i = 0; $i < count($array); $i++){
		$arraytext = $arraytext."'".$array[$i]."',";
	}
	$arraytext = substr($arraytext, 0, -1);
	$arraytext = $arraytext."]";
	return $arraytext;
	}

echo "check";
?>