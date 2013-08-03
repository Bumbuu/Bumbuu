<?php
//the general account creation script that conducts SQL queries to update the DB with a new user
/*if ($_SERVER['HTTP_REFERER'] !== $_SERVER['HTTP_HOST']) {
	//prevent remote POST/GET requests
	header("No remote access allowed.", true, 400);
	exit;
} TODO: fix */
$xml_data = simplexml_load_file("../server_info/server.conf.xml");
$db_passwords = array();
//populate array with user, password iznformation
foreach ($xml_data->children() as $user)
	foreach ($user->children() as $user_attr)
		if ($user_attr->getName() == 'password')
			$db_passwords[((string)$user['name'])] = $user_attr;
if (isset($_GET['create'])) {
	header("Cache-Control: no-store, no-cache, must-revalidate");
	$username = $_POST['username'] or die("No username specified.");
	$password = $_POST['password'] or die("No password specified.");
	$email = $_POST['email'] or die("No email specified.");
	$country = $_POST['country'] or die("No country specified.");
	$gender = $_POST['gender'] or die("No gender information specified.");
	$firstname = $_POST['firstname'] or die("No first name given.");
	$lastname = $_POST['lastname'] or die("No last name given.");
	$language = $_POST['language'] or die("No language given.");
	$time_offset = $_POST['timezone'] or die("No timezone information specified.");
	
	$con = mysql_connect("localhost","bumbuuco_usrdata",$db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to SQL server");
	mysql_select_db("bumbuuco_users", $con) or die("Unable to SELECT DB.");
	$results = mysql_query(
		sprintf(
		"INSERT INTO userlist(
			Username,
			Password,
			Email,
			FirstName,
			LastName,
			Country,
			Language,
			PSalt,
			Gender,
			Pref_TimeOffset,
			JoinDate
		 ) 
		 VALUES(
		 	'%s', 
		 	'%s', 
		 	'%s', 
		 	'%s', 
		 	'%s', 
		 	'%s', 
		 	'%s',
		 	'%s',
		 	'%s',
		 	'%s',
		 	NOW()
		 )", mysql_real_escape_string($username), mysql_real_escape_string($password), mysql_real_escape_string($email), mysql_real_escape_string($firstname), mysql_real_escape_string($lastname), mysql_real_escape_string($country), mysql_real_escape_string($language)/*, TODO: add PSalt*/, mysql_real_escape_string($gender), mysql_real_escape_string($timezone))
	) or die ("There was an error while creating a new user: ".mysql_error());
	//TODO: send email to user for confirmation and activation
} elseif (isset($_GET['validate'])) {
	header("Cache-Control: no-store, no-cache, must-revalidate");
	header("Content-Type: text/plain");
	$con = mysql_connect("localhost","bumbuuco_usrdata",$db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to SQL server");
	mysql_select_db("bumbuuco_users", $con) or die("Unable to SELECT DB.");
	if (isset($_POST['username']))
		$results = mysql_query(
			sprintf("SELECT * FROM userlist where Username='%s' LIMIT 1", mysql_real_escape_string($_POST['username']))
		) or die("SQL error.");
	elseif (isset($_POST['email']))
		$results = mysql_query(
			sprintf("SELECT * FROM userlist where Email='%s' LIMIT 1", mysql_real_escape_string($_POST['email']))
		) or die("SQL error.");
	else exit("No options provided.");
	if (mysql_num_rows($results) > 0) exit("invalid");
	elseif (mysql_num_rows($results) == 0) exit("valid");
} else { //display normal page
?>

<!-- main page goes here -->
<!DOCTYPE html>
<html lang="en">
</html>

<?php } ?>
