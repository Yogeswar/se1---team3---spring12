<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Frameset//EN">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=Cp1252">
<title>SalesPerson Location</title>

<script type="text/javascript"
    src="http://maps.googleapis.com/maps/api/js?key=AIzaSyDRvz81e1wi89bR_lnNWIbH6KzuLLyQfdE&sensor=false">
  </script>
<?php 
ob_start();
$db_host="mysql1.000webhost.com"; // Host name 
$db_username="a1886827_s3"; // Mysql username 
$db_password="xyz123"; // Mysql password 
$db_name="a1886827_s3"; // Database name 
$db_tbl_loc="Emp_curr_loc"; //Employee current location table
$db_tbl_name="User_data"; // Table name
?>
<script type="text/javascript">
// <![CDATA[


var map;
var marker = new Array(); 
var mapLocation = new Array();
var Emp_details = new Array();
var fname, lname, eid;
	//Initialize and set the initial Map
    function initialize() {


<?php 

	$mysql_con = mysql_connect("$db_host", "$db_username", "$db_password");
	if(!$mysql_con)
	{
		die("cannot connect"); 
	}
	mysql_select_db("$db_name")or die("cannot select DB");

	$sql="SELECT * FROM $db_tbl_loc";
	$result=mysql_query($sql);
	$count=mysql_num_rows($result);
	
	$i = 0;
	
	while($i < $count)
	{
		$lat = mysql_result($result,$i,"latitude");
		$long = mysql_result($result,$i,"longitude");
		$Emp = mysql_result($result,$i,"Employee_Id");
		
		$sql_select="SELECT * FROM $db_tbl_name WHERE Employee_Id='$Emp'";
		$sub_result=mysql_query($sql_select);
		$ret=mysql_num_rows($sub_result);
		if($ret==1)
		{ ?>
			fname = "<?php echo mysql_result($sub_result,0,"First_Name")?>";
			lname = "<?php echo mysql_result($sub_result,0,"Last_Name")?>";
			eid = "<?php echo mysql_result($sub_result,0,"Employee_Id")?>";
			Emp_details[<?php echo $i ?>] = new Emp_dataobject(fname,lname,eid);
				
	<?php	}
		
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
	
	function Emp_dataobject(firstname, lastname, emp_id)
	{
		this.firstname = firstname;
		this.lastname = lastname;
		this.emp_id = emp_id;
	}
    
    //place a marker on the map
    function placeMarker(Loc) {
          var i = marker.length;
		  
		  var info_data = '<div id="info"><b>' + 
						Emp_details[i].firstname +
						'   '  +
						Emp_details[i].lastname +
						'</b><br/><a href="Location_emp.php?Emp=' +
						Emp_details[i].emp_id +
						'">Previous Locations</a></div>';

		var infowindow = new google.maps.InfoWindow({
						content: info_data});
		  
		  
		  marker[i] = new google.maps.Marker({
          position: Loc,
		  title: Emp_details[i].firstname + ' ' + Emp_details[i].lastname,
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
<h4 style="text-align: center">Current Location of Salesperson</h4>
</div>
<div id="map" style="width:600px; height:500px;"></div>
</body></html>