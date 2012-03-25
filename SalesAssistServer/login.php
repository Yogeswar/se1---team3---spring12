<?php

//header('Cache-Control: no-cache, must-revalidate');
//header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
//header('Content-type: application/json');

ob_start();
$db_host="localhost"; // Host name 
$db_username="root"; // Mysql username 
$db_password=""; // Mysql password 
$db_name="SalesAssist"; // Database name 
$db_tbl_name="User_data"; // Table name

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

// To protect MySQL injection (more detail about MySQL injection )
$username = stripslashes($username);
$password = stripslashes($password);
$username = mysql_real_escape_string($username);
$password = mysql_real_escape_string($password);

$sql="SELECT * FROM $db_tbl_name WHERE Employee_Id='$username' and password='$password'";
$result=mysql_query($sql);

// Mysql_num_row is counting table row
$count=mysql_num_rows($result);
// If result matched $myusername and $mypassword, table row must be 1 row

if($count==1){
	// Register $myusername, $mypassword and redirect to file "login_success.php"
	//session_register("myusername");
	//session_register("mypassword"); 
	//header("location:login_success.php");
	echo "true";
}
else 
{
	echo "false";
}
mysql_close($mysql_con);
?>