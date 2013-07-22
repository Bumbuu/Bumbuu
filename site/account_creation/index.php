<?php
//the general account creation script that conducts SQL queries to update the DB with a new user
if ($_SERVER['REMOTE_ADDR'] !== $_SERVER['SERVER_ADDR']) {
	//prevent remote POST/GET requests
	header("No remote access allowed.", true, 400);
	exit;
}
if (isset($_GET['create'])):
	header("Cache-Control: no-store, no-cache, must-revalidate");
	$xml_data = simplexml_load_file("../server_info/server.conf.xml");
	$db_passwords = array();
	//populate array with user, password iznformation
	foreach ($xml_data->children() as $user)
		foreach ($user->children() as $attr)
			if ($pass->getName() == 'password')
				$db_passwords[$user] = $pass;
	$username = $_POST['username'] or die("No username specified.");
	$password = $_POST['password'] or die("No password specified.");
	$email = $_POST['email'] or die("No email specified.");
	$country = $_POST['country'] or die("No country specified.");
	$gender = $_POST['gender'] or die("No gender information specified.");
else: //display normal page
?>

<!--webpage goes here-->
<!DOCTYPE html>
<html lang="en">
</html>

<?php endif; ?>
