<?php
//the general account creation script that conducts SQL queries to update the DB with a new user
//ini_set('error_reporting', E_ALL);
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
	$timezone_api_dir = "http://bumbuu.com/files/apis/timezone_picker";
	$timezone_api_dir_relative = "../files/apis/timezone_picker";
	date_default_timezone_set('UTC');
	include "$timezone_api_dir_relative/includes/parser.inc";
	//get remote image map
	$scaled_timezone_image = "$timezone_api_dir/images/custom.php?w=400&base=gray";
	list($map_width, $map_height) = getimagesize($scaled_timezone_image);
	$timezones = timezone_picker_parse_files($map_width, $map_height, "$timezone_api_dir_relative/tz_world.txt", "tz_islands.txt");
?>

<!DOCTYPE html>
<html lang="en">
<head>
<title>Bumbuu - Alpha</title>
<meta charset="utf-8">
<link rel="StyleSheet" type="text/css" href="http://bumbuu.com/files/apis/default_elements/style.css" />
<link rel="StyleSheet" type="text/css" href="alpha.css" />
<script type="text/javascript" src="http://bumbuu.com/files/js/scrije.lib.js"></script>
<script type="text/javascript" src="http://bumbuu.com/files/apis/default_elements/elements.js"></script>
<!-- APIs for timezone usage, including JQuery -->
<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.5.2/jquery.min.js"></script>
<script type="text/javascript" src="http://bumbuu.com/files/apis/timezone_picker/lib/jquery.maphilight.min.js"></script>
<script type="text/javascript" src="http://bumbuu.com/files/apis/timezone_picker/lib/jquery.timezone-picker.min.js"></script>
<!-- page js -->
<script type="text/javascript" src="alpha.js"></script>
</head>
<body>
<div id="background"></div>
<div id="main">
	<div class="main_title">
		<span>Closed Alpha</span>
		<span><br>Signing up is as easy as...</span>
	</div>
	<div class="signup_holders_holder">
		<div class="step_counter">1</div>
		<div class="signup_holder">
			<div>
				<div class="signup_info_title">User Credentials</div>
				<div class="signup_info_description">
					This information will serve to identify you on Bumbuu as a unique user. In addition, your email shall be useful in providing a safety for your account, in the event of a forgotten password or a compromised account. It is advisable to use your dominant email, if you have multiple, perhaps so that the chances of losing your Bumbuu account's credentials to a terminated or forgotten email account are less likely.
				</div>
			</div>
			<div>
				<div class="bumbuu_intext_notif" type="warning"></div>
				<div class="signup_interaction_inside" style="margin-top: 60px;">
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<input class="bumbuu_input_light" type="text" id="signup_username" placeholder="Username" isvalidated />
							<div class="bumbuu_input_light_right_label" id="signup_username_label">
								<div></div>
							</div>
						</div>
					</div>
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<input class="bumbuu_input_state_light" type="text" id="signup_firstname" placeholder="First Name" maxlength="20" />
						</div>
						<div class="bumbuu_input_holder">
							<input class="bumbuu_input_state_light" type="text" id="signup_lastname" placeholder="Last Name" maxlength="20" />
						</div>
					</div>
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<input class="bumbuu_input_state_light" type="text" id="signup_email" placeholder="Email Address" />
						</div>
					</div>
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<select class="bumbuu_selectarea_light" id="signup_gender">
								<option value="Unspecified" selected>Unspecified</option>
								<option value="Male">Male</option>
								<option value="Female">Female</option>
							</select>
						</div>
					</div>
					<div class="signup_interaction_row" type="bottom">
						<span></span>
						<button class="bumbuu_button_dark signup_advancer" step="1">Next</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="signup_holders_holder">
		<div class="step_counter">2</div>
		<div class="signup_holder" style="height: 410px">
			<div>
				<div class="signup_info_title">Localization</div>
				<div class="signup_info_description">
					<span>
					Location and timezone information is crucial for localization of times and content in Bumbuu. Due to the inherent importance of privacy, however, if you wish not to reveal any potentially sensitive information then you are provided with the option of leaving these fields as unspecified. For more information on Bumbuu's ideals of privacy, please consult the
					</span>
					<div class="bumbuu_labeled_item" id="privacy_policy_labeled_item" to="privacy_policy_label">
						<span>privacy policy.</span>
					</div>
					Language information is useful in customizing content on Bumbuu to a preferred language. Support for languages other than English on Bumbuu is currently non-existent, although it is a planned feature. For now, the option has no effect.
					<div class="bumbuu_label" id="privacy_policy_label" for="privacy_policy_labeled_item" type="above">Privacy Policy</div>
				</div>
			</div>
			<div>
				<div class="bumbuu_intext_notif" type="warning"></div>
				<div class="signup_interaction_inside">
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<select class="bumbuu_selectarea_light" id="signup_country">
								<option value="" selected>Choose a country</option>
								<?php
									$con = mysql_connect("localhost","bumbuuco_sendata",$db_passwords["bumbuuco_sendata"]) or die("Unable to connect to SQL server");
									mysql_select_db("bumbuuco_miscInfo", $con) or die("Unable to SELECT DB.");
									$query = mysql_query("SELECT * FROM country_list ORDER BY Fullname ASC");
									$tabs = "\t\t\t\t\t\t\t\t\t";
									while ($row = mysql_fetch_array($query))
										echo $tabs.'<option value="'.$row["Shortname"].'">'.$row["Fullname"].'</option>'."\n";
								?>
							</select>
						</div>
					</div>
					<div class="signup_interaction_row" style="height: 16px;">
						<p class="checkbox_label">Reveal timezone information</p>
						<div class="bumbuu_checkbox_light" value="checked"><div></div><div></div></div>
					</div>
					<div id="signup_timezone_holder">
						<img id="signup_timezone_img" usemap="#timezone-map" src="<?php print $scaled_timezone_image; ?>" />
						<img class="timezone-pin" src="http://bumbuu.com/files/apis/timezone_picker/images/pin.png" />
						<map name="timezone-map" id="timezone-map">
							<?php foreach ($timezones as $timezone_name => $timezone): ?>
							<?php foreach ($timezone['polys'] as $coords): ?>
							<area data-timezone="<?php print $timezone_name; ?>" data-country="<?php print $timezone['country']; ?>" data-pin="<?php print implode(',', $timezone['pin']); ?>" data-offset="<?php print $timezone['offset']; ?>" shape="poly" coords="<?php print implode(',', $coords); ?>" />
							<?php endforeach; ?>
							<?php foreach ($timezone['rects'] as $coords): ?>
							<area data-timezone="<?php print $timezone_name; ?>" data-country="<?php print $timezone['country']; ?>" data-pin="<?php print implode(',', $timezone['pin']); ?>" data-offset="<?php print $timezone['offset']; ?>" shape="rect" coords="<?php print implode(',', $coords); ?>" />
							<?php endforeach; ?>
							<?php endforeach; ?>
						</map>
					</div>
					<div id="signup_timezone_label"></div>
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<select class="bumbuu_selectarea_light" id="signup_language">
								<option value="" selected>Select a language</option>
								<option value="English">English</option>
							</select>
						</div>
					</div>
					<div class="signup_interaction_row" type="bottom" style="margin-top: 0px;">
						<button class="bumbuu_button_dark signup_retreater" step="2">Back</button>
						<button class="bumbuu_button_dark signup_advancer" step="2">Next</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="signup_holders_holder">
		<div class="step_counter">3</div>
		<div class="signup_holder">
			<div>
			</div>
			<div>
				<div class="bumbuu_intext_notif" type="warning"></div>
				<div class="signup_interaction_inside">
					<div class="signup_interaction_row" type="bottom">
						<button class="bumbuu_button_dark signup_retreater" step="3">Back</button>
						<span></span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</body>
</html>

<?php } ?>
