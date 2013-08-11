<?php
//alter "Country" column in userlist of bumbuuco_users
header("Cache-Control: no-store, no-cache, must-revalidate");
$xml_data = simplexml_load_file("server_info/server.conf.xml");
$db_passwords = array();
//populate array with user, password information
foreach ($xml_data->children() as $user)
	foreach ($user->children() as $user_attr)
		if ($user_attr->getName() == 'password')
			$db_passwords[((string)$user['name'])] = $user_attr;

	$query = "ALTER TABLE userlist MODIFY COLUMN Country ENUM("; 
	
	$con_sd = mysql_connect("localhost", "bumbuuco_sendata", $db_passwords["bumbuuco_sendata"]) or die("Unable to connect to server.");
	mysql_select_db("bumbuuco_miscInfo", $con_sd) or die("unable to select DB: " . mysql_error());
	$result = mysql_query("SELECT Fullname FROM country_list", $con_sd);
	while ($row = mysql_fetch_assoc($result))
		$query .= "'".mysql_real_escape_string($row["Fullname"])."',";
	$query = substr($query, 0, -1) . ")";
	
	mysql_close($con_sd);
	
	$con = mysql_connect("localhost", "bumbuuco_usrdata", $db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to server.");
	mysql_select_db("bumbuuco_users", $con);

	mysql_query($query, $con) or die(mysql_error());
	mysql_close($con);
exit("Done!");
?>
