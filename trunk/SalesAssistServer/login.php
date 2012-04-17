<?php

header('Cache-Control: no-cache, must-revalidate');
//header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
header('Content-type: application/json');

ob_start();
$db_host="mysql1.000webhost.com"; // Host name 
$db_username="a1886827_s3"; // Mysql username 
$db_password="xyz123"; // Mysql password 
$db_name="a1886827_s3"; // Database name 
$db_tbl_name="User_data"; // Table name
$db_tbl_loc="Emp_curr_loc"; //Employee current location table
$db_tbl_loc_hist="Emp_loc_history";

// Connect to server and select databse.
$mysql_con = mysql_connect("$db_host", "$db_username", "$db_password");
if(!$mysql_con)
{
	die("cannot connect"); 
}
mysql_select_db("$db_name")or die("cannot select DB");

// username and password sent from form 
$username=$_POST['username']; 
$password=$_POST['password'];
$lat=$_POST['lat'];
$long=$_POST['long'];

// To protect MySQL injection 
$username = stripslashes($username);
$password = stripslashes($password);
$lat = stripslashes($lat);
$long = stripslashes($long);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);
$long = mysql_real_escape_string($long);
$lat = mysql_real_escape_string($lat);


$sql="SELECT * FROM $db_tbl_name WHERE Employee_Id='$username' and password='$password'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1)
{
	$select_sql="SELECT * FROM $db_tbl_loc WHERE Employee_Id='$username'";
	$result=mysql_query($select_sql);
	$count=mysql_num_rows($result);
	if($count==1)
	{	
		$update_sql="UPDATE $db_tbl_loc SET latitude=$lat, longitude=$long
					WHERE Employee_Id='$username'";
		$result=mysql_query($update_sql);
	}
	else
	{	
		$insert_sql="INSERT INTO $db_tbl_loc (Employee_Id, latitude, longitude) VALUES ('$username' , $lat, $long)";
		$result=mysql_query($insert_sql);
	}
	$insert_sql="INSERT INTO $db_tbl_loc_hist (Employee_Id, latitude, longitude) VALUES ('$username' , $lat, $long)";
	$result=mysql_query($insert_sql);
	// Register $myusername, $mypassword and redirect to file "login_success.php"
	//session_register("myusername");
	//session_register("mypassword"); 
	//header("location:login_success.php");
	$response = array('login' => 'true');
}
else 
{	
	$response = array('login' => 'false');
}
$response = json_encode($response);
echo $response;
mysql_close($mysql_con);
?>