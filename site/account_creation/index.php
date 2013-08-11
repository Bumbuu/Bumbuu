<?php
//the general account creation script that conducts SQL queries to update the DB with a new user
include "../files/apis/general.php";
if (!isset($_SESSION))
	session_start(); //start php session

ini_set('error_reporting', E_ALL);
$xml_data = simplexml_load_file("../server_info/server.conf.xml");
$db_passwords = array();
//populate array with user, password iznformation
foreach ($xml_data->children() as $user)
	foreach ($user->children() as $user_attr)
		if ($user_attr->getName() == 'password')
			$db_passwords[((string)$user['name'])] = $user_attr;
			
//temporary: check for a valid alpha code
if ( isset($_GET['code']) && !empty($_GET['code']) ) {
	$alpha_con = mysql_connect("localhost", "bumbuuco_usrdata", $db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to server.");
	mysql_select_db("bumbuuco_users", $alpha_con) or die("Unable to select DB.");
	if (mysql_num_rows( mysql_query(sprintf("SELECT Code FROM alpha_codes WHERE Code='%s'", mysql_real_escape_string($_GET['code']))) ) == 0) {
		header("Location: http://bumbuu.com"); //alpha code not in db
		exit;
	} elseif (mysql_num_rows( mysql_query(sprintf("SELECT Code FROM alpha_codes WHERE Code='%s' AND Usable=1", mysql_real_escape_string($_GET['code']))) ) == 0) {
		header("Location: http://bumbuu.com"); //alpha code already in use
		exit;
	}
	mysql_close($alpha_con);
} elseif ( !isset($_GET['activate']) && !isset($_GET['validate']) ) {
	//if page is neither the activate nor validate page
	header("Location: http://bumbuu.com"); //no alpha code provided
	exit;
}
//---------------------------------------

if ( isset($_GET['activate']) && !empty($_GET['activate']) && !empty($_GET['u']) ) {
	//activate account
	header("Cache-Control: no-store, no-cache, must-revalidate");
	$response_text = "";
	$success = false;
	$con = mysql_connect("localhost","bumbuuco_usrdata",$db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to server");
	mysql_select_db("bumbuuco_users", $con) or die("Unable to select DB.");
	if ( mysql_num_rows(mysql_query(sprintf("SELECT Active FROM userlist WHERE UserID=%u AND ActivationCode='%s'", intval(mysql_real_escape_string($_GET['u'])), mysql_real_escape_string($_GET['activate'])))) == 0 ) {
		$response_text = "That account does not exist.";
		$success = false;
	} elseif ( mysql_num_rows(mysql_query(sprintf("SELECT Active FROM userlist WHERE UserID=%u AND Active=0", intval(mysql_real_escape_string($_GET['u']))))) == 0 ) {
		$response_text = "That account has already been activated";
		$success = true;
	} else {
		mysql_query( sprintf("UPDATE userlist SET Active=1 WHERE UserID=%u AND ActivationCode='%s'", intval(mysql_real_escape_string($_GET['u'])), mysql_real_escape_string($_GET['activate'])) ) or die(mysql_error());
	
		mysql_close($con);
		$response_text = "Your account has been successfully activated.";
		$success = true;
	}
?>
<!DOCTYPE html>
<html lang="en">
<head>
<title>Account Activation</title>
<meta charset="utf-8">
<link rel="StyleSheet" type="text/css" href="alpha.css" />
<style type="text/css">
#activation_container {
	width: 400px;
	height: 14px;
	padding: 10px;
	position: absolute;
	margin: auto;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	font-family: Arial;
	font-size: 14px;
	color: #444;
	text-shadow: 0px 1px 0px #f0f0f0;
	text-align: center;
}
#activation_container span::selection {
	background-color: #d7d7d7;
}
#activation_container span::-moz-selection {
	background-color: #d7d7d7;
}
a:link, a:visited {
	color: #446f7f;
	text-decoration: none;
}
a:active {
	color: #244f5f;
	text-decoration: underline;
}
a:hover {
	color: #648f9f;
	text-decoration: underline;
}
</style>
</head>
<body>
<div id="background"></div>
<div class="main_title">
	<span>Closed Alpha</span>
	<span><br><?php echo $response_text; ?></span>
</div> 
<?php if ($success) { ?>
<div id="activation_container">
	<span>Well, what are you waiting for? 
		<a href="http://bumbuu.com">Start using Bumbuu today.</a>
	</span>
</div>
<?php } ?>
</body>
</html>
<?php
} elseif (isset($_GET['create'])) {
	//check for session and prevent remote POST requests
	header("Cache-Control: no-store, no-cache, must-revalidate");
	if (!isset($_POST['session_id']) || intval($_POST['session_id']) !== $_SESSION['form_number']) {
		header("No remote access allowed.", true, 400);
		exit;
	}
	$username = urldecode($_POST['username']);
		!empty($username) or die("No username specified.");
	$password = urldecode($_POST['password']);
		!empty($password) or die("No password specified.");
	$email = urldecode($_POST['email']);
		!empty($email) or die("No email specified.");
	$country_code = urldecode($_POST['country']);
		!empty($country_code) or die("No country specified.");
	$gender = urldecode($_POST['gender']);
		!empty($gender) or die("No gender information specified.");
	$firstname = urldecode($_POST['firstname']);
		!empty($firstname) or die("No first name given.");
	$lastname = urldecode($_POST['lastname']);
		!empty($lastname) or die("No last name given.");
	$language = urldecode($_POST['language']);
		!empty($language) or die("No language given.");
	$time_offset = urldecode($_POST['timezone']);
		!empty($time_offset) or die("No timezone information specified.");
	$pref_show_timezone = $_POST['reveal_timezone'];
		!empty($pref_show_timezone) or die("No timezone privacy specified.");
	$pref_show_buzzes = $_POST['show_buzzes'];
		!empty($pref_show_buzzes) or die("No buzz privacy specified.");
	$pref_show_email = $_POST['show_email'];
		!empty($pref_show_email) or die("No email privacy specified.");
	$pref_show_buzz_location = $_POST['show_buzz_location'];
		!empty($pref_show_buzz_location) or die("No buzz location privacy specified.");
	
	//preferences
	$preferences = array(
		'ShowTimezone'	=>	($pref_show_timezone == 'true' ? 'Everyone' : 'None'),
		'ShowBuzzes'	=>	($pref_show_buzzes == 'true' ? 'Everyone' : 'None'),
		'ShowEmail'		=>	($pref_show_email == 'true' ? 'Everyone' : 'None'),
		'ShowLocation'	=>	($pref_show_buzz_location == 'true' ? 'Everyone' : 'None')
	);
	
	//generate random salt
	$salt = Bumbuu::generate_salt();
	$activation_code = Bumbuu::generate_salt();
	
	$con_sd = mysql_connect("localhost", "bumbuuco_sendata", $db_passwords["bumbuuco_sendata"]) or die("Unable to connect to server.");
	mysql_select_db("bumbuuco_miscInfo", $con_sd) or die("unable to select DB.");
	$res = mysql_query(	sprintf("SELECT Fullname FROM country_list WHERE Shortname='%s' LIMIT 1", mysql_real_escape_string($country_code)), $con_sd );
	$row = mysql_fetch_assoc($res);
	$country = $row["Fullname"];
	mysql_close($con_sd);
	
	$con = mysql_connect("localhost","bumbuuco_usrdata",$db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to server");
	mysql_select_db("bumbuuco_users", $con) or die("Unable to select DB.");
	mysql_query(
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
			Pref_ShowTimeOffset,
			Pref_ShowEmail,
			Pref_ShowBuzzes,
			Pref_ShowBuzzLocation,
			ActivationCode,
			AlphaCode,
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
			'%s',
			'%s',
			'%s',
			'%s',
			'%s',
			'%s',
		 	NOW()
		 )", mysql_real_escape_string($username), hash("sha256", $password.$salt), mysql_real_escape_string($email), mysql_real_escape_string($firstname), mysql_real_escape_string($lastname), $country, mysql_real_escape_string($language), $salt, mysql_real_escape_string($gender), mysql_real_escape_string($time_offset), $preferences['ShowTimezone'], $preferences['ShowEmail'], $preferences['ShowBuzzes'], $preferences['ShowLocation'], $activation_code, mysql_real_escape_string($_GET['code']) /* temporary: alpha code */)
	) or die("There was an error while creating a new user: ".mysql_error());
	
	$u_id = mysql_query( sprintf("SELECT UserID FROM userlist WHERE Email='%s'", mysql_real_escape_string($email)) );
	$row = mysql_fetch_assoc($u_id);
	
	mysql_close($con);
	
	//temporary: set old alpha code to used
	$alpha_con = mysql_connect("localhost", "bumbuuco_usrdata", $db_passwords["bumbuuco_usrdata"]) or die("Unable to connect to DB.");
	mysql_select_db("bumbuuco_users", $alpha_con) or die("Could not select DB.");
	mysql_query( sprintf("UPDATE alpha_codes SET Usable=0 WHERE Code='%s'", mysql_real_escape_string($_GET['code'])) );
	mysql_close($alpha_con);
	//-------------------------------------
	
	//send email to user notifying them of an activation necessity
	//TODO: specify $message as HTML
	$message = "Congratulations, $firstname $lastname, on successfully registering for Bumbuu. In order to activate your account, you must visit this link: http://bumbuu.com/alpha/?activate=$activation_code&u=".$row['UserID']; //separate with \r\n for each line; no longer than 70 chars
	
	$headers  = 'MIME-Version: 1.0' . "\r\n"; //separate with \r\n for each header
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
	$headers .= 'To: '. $username .' <'. $email .'>' . "\r\n";
	$headers .= 'From: Bumbuu <bumbuu.com>' . "\r\n";
	
	mail($email, "Bumbuu Alpha - Activation Required", $message, $headers);
	exit("Registration successful.");
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
	if (!isset($_SESSION['form_number']))
		$_SESSION['form_number'] = rand(0, 3600000);
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
<?php
	echo "<script type=\"text/javascript\">\n";
	echo "bumbuu_alpha_code = \"" . isset($_GET['code']) . "\";\n"; 
	echo "</script>\n";
?>
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
							<input type="hidden" id="signup_session_id" value="<?php echo $_SESSION['form_number']; ?>" />
							<input class="bumbuu_input_light" type="text" id="signup_username" placeholder="Username" isvalidated />
							<div class="bumbuu_input_light_right_label" id="signup_username_label">
								<div></div>
							</div>
						</div>
						<div class="bumbuu_input_label_light" style="float: right; clear: none; margin-top: 2px;" orientation="left">Unique and alphanumeric.</div>
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
						<div class="bumbuu_input_label_light" style="float: right; clear: none; margin-top: 2px;" orientation="left">Email cannot be taken.</div>
					</div>
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<select class="bumbuu_selectarea_light" id="signup_gender">
								<option value="" selected>Choose a gender</option>
								<option value="Unspecified">Unspecified</option>
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
					Location and timezone information is crucial for localization of times and content in Bumbuu. Due to the inherent importance of privacy, however, if you wish not to reveal any potentially sensitive information then you are provided with the option of leaving certain fields as unspecified. For more information on Bumbuu's ideals of privacy, please consult the
					</span>
					<div class="bumbuu_labeled_item" id="privacy_policy_labeled_item" to="privacy_policy_label">
						<span>privacy policy.</span>
					</div>
					Language information is useful in customizing content on Bumbuu to a preferred language. Support for languages other than English on Bumbuu is currently non-existent, although it is a planned feature. For now, the option has no effect.
					<div class="bumbuu_label" id="privacy_policy_label" for="privacy_policy_labeled_item" type="above">Not available yet. Sorry!</div>
				</div>
			</div>
			<div>
				<div class="bumbuu_intext_notif" type="warning"></div>
				<div class="signup_interaction_inside">
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<select class="bumbuu_selectarea_light" id="signup_country">
								<option value="" selected=>Select a country</option>
								<option value="Unspecified">Unspecified</option>
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
						<div class="bumbuu_input_label_dark" style="float: right; clear: none; margin-top: 3px;" orientation="left">May be unspecified.</div>
						<input type="hidden" id="signup_timezone" />
					</div>
					<div class="signup_interaction_row" style="height: 12px; padding: 2px 2px 2px 10px;">
						<p class="checkbox_label">Publicly display timezone information</p>
						<div class="bumbuu_checkbox_light" id="signup_reveal_timezone" value="checked"><div></div><div></div></div>
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
				<div class="signup_info_title">Security and Privacy</div>
				<div class="signup_info_description">
					Some information we need to protect your account from impersonation and theft, as well as provide any personally-preferred privacy options. Bumbuu takes privacy very seriously. As such, unlike other social networks, any options set here will be honored in their most literal respect, without disregard to the user's preference. 
				</div>
			</div>
			<div>
				<div class="bumbuu_intext_notif" type="warning"></div>
				<div class="signup_interaction_inside" style="margin-top: 10px;">
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<input class="bumbuu_input_light" type="password" id="signup_password" placeholder="Password" isvalidated />
							<div class="bumbuu_input_light_right_label" id="signup_password_label">
								<div></div>
							</div>
						</div>
						<div class="bumbuu_input_label_light" style="float: right; clear: none; margin-top: 2px;" orientation="left">At least 12 characters.</div>
					</div>
					<div class="signup_interaction_row">
						<div class="bumbuu_input_holder">
							<input class="bumbuu_input_light" type="password" id="signup_password_again" placeholder="Password (Again)" isvalidated />
							<div class="bumbuu_input_light_right_label" id="signup_password_again_label">
								<div></div>
							</div>
						</div>
					</div>
					<div class="signup_interaction_row">
						<div class="signup_interaction_row" style="height: 12px; padding: 2px 2px 2px 10px;">
							<p class="checkbox_label">Show buzzes publicly</p>
							<div class="bumbuu_checkbox_light" id="signup_show_buzzes" value="checked"><div></div><div></div></div>
						</div>
					</div>
					<div class="signup_interaction_row">
						<div class="signup_interaction_row" style="height: 12px; padding: 2px 2px 2px 10px;">
							<p class="checkbox_label">Show email publicly</p>
							<div class="bumbuu_checkbox_light" id="signup_show_email" value="checked"><div></div><div></div></div>
						</div>
					</div>
					<div class="signup_interaction_row">
						<div class="signup_interaction_row" style="height: 12px; padding: 2px 2px 2px 10px;">
							<p class="checkbox_label">Display location publicly in buzzes</p>
							<div class="bumbuu_checkbox_light" id="signup_show_buzz_location" value="checked"><div></div><div></div></div>
						</div>
					</div>
					<div class="signup_interaction_row" type="bottom">
						<button class="bumbuu_button_dark signup_retreater" step="3">Back</button>
						<button class="bumbuu_button_radioactive" id="signup_finish">Finish</button>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="signup_holders_holder">
		<div id="signup_epilogue">
			<div>
				<span>We've sent you a confirmation message. Check your	</span>
				<div class="bumbuu_labeled_item" id="labeled_item_final_email" to="item_final_email_lbl" style="display: inline-block;">
					<span>email</span>
				</div>
				<div class="bumbuu_label" id="item_final_email_lbl" for="labeled_item_final_email" type="above"></div>
				<span>to activate your account.</span>
			</div>
		</div>
	</div>
</div>
</body>
</html>

<?php } ?>
