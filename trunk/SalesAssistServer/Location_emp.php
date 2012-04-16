<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<?php 
	if(isset($_GET["Emp"]))
	{
		$Emp_Id = $_GET["Emp"];
	}
	else
	{
		header( 'Location: Location.php' ) ;
	}
?>

<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Cp1252">
<title>SalesPerson Location</title>

<script type="text/javascript"
    src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDRvz81e1wi89bR_lnNWIbH6KzuLLyQfdE&sensor=false">
  </script>
<?php
 
ob_start();
$db_host="localhost"; // Host name 
$db_username="root"; // Mysql username 
$db_password=""; // Mysql password 
$db_name="SalesAssist"; // Database name 
$db_tbl_loc="Emp_loc_history"; //Employee current location table
$db_tbl_name="User_data"; // Table name
?>
<script type="text/javascript">
// <![CDATA[


var map;
var marker = new Array(); 
var mapLocation = new Array();
var Emp_details = new Array();
var fname, lname, time;
	//Initialize and set the initial Map
    function initialize() {


<?php 

	
	$mysql_con = mysql_connect("$db_host", "$db_username", "$db_password");
	if(!$mysql_con)
	{
		die("cannot connect"); 
	}
	mysql_select_db("$db_name")or die("cannot select DB");

	$sql_select="SELECT * FROM $db_tbl_name WHERE Employee_Id='$Emp_Id'";
		$sub_result=mysql_query($sql_select);
		$ret=mysql_num_rows($sub_result);
		if($ret==1)
		{ ?>
			fname = "<?php echo mysql_result($sub_result,0,"First_Name")?>";
			lname = "<?php echo mysql_result($sub_result,0,"Last_Name")?>";
			//time = "<?php //echo mysql_result($sub_result,0,"UNIX_TIMESTAMP(time)")?>";				
	<?php	}
	
	
	$sql="SELECT * FROM $db_tbl_loc WHERE Employee_Id='$Emp_Id'";
	$result=mysql_query($sql);
	$count=mysql_num_rows($result);
	
	
	
	$i = 0;
	
	while($i < $count)
	{
		$lat = mysql_result($result,$i,"latitude");
		$long = mysql_result($result,$i,"longitude");
		$Emp = mysql_result($result,$i,"Employee_Id");
				
		echo "mapLocation[$i] = new google.maps.LatLng($lat, $long);";
		
		$i++;
	}
	
	mysql_close($mysql_con);
?>

    
      var myOptions = {
        center: mapLocation[0],
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      };
      map = new google.maps.Map(document.getElementById("map"),
          myOptions);
		  
      var i;
	  for(i=0;i<mapLocation.length;i++)
	  {
		placeMarker(mapLocation[i]);	
	  }
      
    }
    
    //place a marker on the map
    function placeMarker(Loc) {
          var i = marker.length;
		  
		  var info_data = '<div id="info"><b>' + 
						fname +
						'   '  +
						lname +
						'</b><br/> Time at Location :' +
						//time +
						'</div>';

		var infowindow = new google.maps.InfoWindow({
						content: info_data});
		  
		  
		  marker[i] = new google.maps.Marker({
          position: Loc,
		  title: fname + ' '  + lname,
          animation: google.maps.Animation.DROP,
          map: map
		 }); 
		  google.maps.event.addListener(marker[i], 'click', function() {
					infowindow.open(map,marker[i]);});  
    }
 
// ]]>
</script>
</head>
<body onload="initialize()">
<div id="ip">
<h2 style="text-align: center">SalesAssist</h2>
<h4 style="text-align: center">Current Location of <?php echo mysql_result($sub_result,0,"First_Name")?>  <?php echo mysql_result($sub_result,0,"Last_Name")?></h4>
</div>
<div id="map" style="width:600px; height:500px;"></div>
</body></html>