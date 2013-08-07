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
		<div class="signup_holder" style="height: 390px">
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
								<option value="" selected="selected">Select a country</option><option value="AF">Afghanistan</option><option value="AX">Aland Islands</option><option value="AL">Albania</option><option value="DZ">Algeria</option><option value="AS">American Samoa</option><option value="AD">Andorra</option><option value="AO">Angola</option><option value="AI">Anguilla</option><option value="AQ">Antarctica</option><option value="AG">Antigua and Barbuda</option><option value="AR">Argentina</option><option value="AM">Armenia</option><option value="AW">Aruba</option><option value="AU">Australia</option><option value="AT">Austria</option><option value="AZ">Azerbaijan</option><option value="BS">Bahamas</option><option value="BH">Bahrain</option><option value="BD">Bangladesh</option><option value="BB">Barbados</option><option value="BY">Belarus</option><option value="BE">Belgium</option><option value="BZ">Belize</option><option value="BJ">Benin</option><option value="BM">Bermuda</option><option value="BT">Bhutan</option><option value="BO">Bolivia</option><option value="BA">Bosnia and Herzegovina</option><option value="BW">Botswana</option><option value="BV">Bouvet Island</option><option value="BR">Brazil</option><option value="IO">British Indian Ocean Territory</option><option value="VG">British Virgin Islands</option><option value="BN">Brunei</option><option value="BG">Bulgaria</option><option value="BF">Burkina Faso</option><option value="BI">Burundi</option><option value="KH">Cambodia</option><option value="CM">Cameroon</option><option value="CA">Canada</option><option value="CV">Cape Verde</option><option value="KY">Cayman Islands</option><option value="CF">Central African Republic</option><option value="TD">Chad</option><option value="CL">Chile</option><option value="CN">China</option><option value="CX">Christmas Island</option><option value="CC">Cocos (Keeling) Islands</option><option value="CO">Colombia</option><option value="KM">Comoros</option><option value="CG">Congo (Brazzaville)</option><option value="CD">Congo (Kinshasa)</option><option value="CK">Cook Islands</option><option value="CR">Costa Rica</option><option value="HR">Croatia</option><option value="CU">Cuba</option><option value="CW">Curaçao</option><option value="CY">Cyprus</option><option value="CZ">Czech Republic</option><option value="DK">Denmark</option><option value="DJ">Djibouti</option><option value="DM">Dominica</option><option value="DO">Dominican Republic</option><option value="EC">Ecuador</option><option value="EG">Egypt</option><option value="SV">El Salvador</option><option value="GQ">Equatorial Guinea</option><option value="ER">Eritrea</option><option value="EE">Estonia</option><option value="ET">Ethiopia</option><option value="FK">Falkland Islands</option><option value="FO">Faroe Islands</option><option value="FJ">Fiji</option><option value="FI">Finland</option><option value="FR">France</option><option value="GF">French Guiana</option><option value="PF">French Polynesia</option><option value="TF">French Southern Territories</option><option value="GA">Gabon</option><option value="GM">Gambia</option><option value="GE">Georgia</option><option value="DE">Germany</option><option value="GH">Ghana</option><option value="GI">Gibraltar</option><option value="GR">Greece</option><option value="GL">Greenland</option><option value="GD">Grenada</option><option value="GP">Guadeloupe</option><option value="GU">Guam</option><option value="GT">Guatemala</option><option value="GG">Guernsey</option><option value="GN">Guinea</option><option value="GW">Guinea-Bissau</option><option value="GY">Guyana</option><option value="HT">Haiti</option><option value="HM">Heard Island and McDonald Islands</option><option value="HN">Honduras</option><option value="HK">Hong Kong S.A.R., China</option><option value="HU">Hungary</option><option value="IS">Iceland</option><option value="IN">India</option><option value="ID">Indonesia</option><option value="IR">Iran</option><option value="IQ">Iraq</option><option value="IE">Ireland</option><option value="IM">Isle of Man</option><option value="IL">Israel</option><option value="IT">Italy</option><option value="CI">Ivory Coast</option><option value="JM">Jamaica</option><option value="JP">Japan</option><option value="JE">Jersey</option><option value="JO">Jordan</option><option value="KZ">Kazakhstan</option><option value="KE">Kenya</option><option value="KI">Kiribati</option><option value="KW">Kuwait</option><option value="KG">Kyrgyzstan</option><option value="LA">Laos</option><option value="LV">Latvia</option><option value="LB">Lebanon</option><option value="LS">Lesotho</option><option value="LR">Liberia</option><option value="LY">Libya</option><option value="LI">Liechtenstein</option><option value="LT">Lithuania</option><option value="LU">Luxembourg</option><option value="MO">Macao S.A.R., China</option><option value="MK">Macedonia</option><option value="MG">Madagascar</option><option value="MW">Malawi</option><option value="MY">Malaysia</option><option value="MV">Maldives</option><option value="ML">Mali</option><option value="MT">Malta</option><option value="MH">Marshall Islands</option><option value="MQ">Martinique</option><option value="MR">Mauritania</option><option value="MU">Mauritius</option><option value="YT">Mayotte</option><option value="MX">Mexico</option><option value="FM">Micronesia</option><option value="MD">Moldova</option><option value="MC">Monaco</option><option value="MN">Mongolia</option><option value="ME">Montenegro</option><option value="MS">Montserrat</option><option value="MA">Morocco</option><option value="MZ">Mozambique</option><option value="MM">Myanmar</option><option value="NA">Namibia</option><option value="NR">Nauru</option><option value="NP">Nepal</option><option value="NL">Netherlands</option><option value="AN">Netherlands Antilles</option><option value="NC">New Caledonia</option><option value="NZ">New Zealand</option><option value="NI">Nicaragua</option><option value="NE">Niger</option><option value="NG">Nigeria</option><option value="NU">Niue</option><option value="NF">Norfolk Island</option><option value="MP">Northern Mariana Islands</option><option value="KP">North Korea</option><option value="NO">Norway</option><option value="OM">Oman</option><option value="PK">Pakistan</option><option value="PW">Palau</option><option value="PS">Palestinian Territory</option><option value="PA">Panama</option><option value="PG">Papua New Guinea</option><option value="PY">Paraguay</option><option value="PE">Peru</option><option value="PH">Philippines</option><option value="PN">Pitcairn</option><option value="PL">Poland</option><option value="PT">Portugal</option><option value="PR">Puerto Rico</option><option value="QA">Qatar</option><option value="RE">Reunion</option><option value="RO">Romania</option><option value="RU">Russia</option><option value="RW">Rwanda</option><option value="BL">Saint Barthélemy</option><option value="SH">Saint Helena</option><option value="KN">Saint Kitts and Nevis</option><option value="LC">Saint Lucia</option><option value="MF">Saint Martin (French part)</option><option value="PM">Saint Pierre and Miquelon</option><option value="VC">Saint Vincent and the Grenadines</option><option value="WS">Samoa</option><option value="SM">San Marino</option><option value="ST">Sao Tome and Principe</option><option value="SA">Saudi Arabia</option><option value="SN">Senegal</option><option value="RS">Serbia</option><option value="SC">Seychelles</option><option value="SL">Sierra Leone</option><option value="SG">Singapore</option><option value="SK">Slovakia</option><option value="SI">Slovenia</option><option value="SB">Solomon Islands</option><option value="SO">Somalia</option><option value="ZA">South Africa</option><option value="GS">South Georgia and the South Sandwich Islands</option><option value="KR">South Korea</option><option value="ES">Spain</option><option value="LK">Sri Lanka</option><option value="SD">Sudan</option><option value="SR">Suriname</option><option value="SJ">Svalbard and Jan Mayen</option><option value="SZ">Swaziland</option><option value="SE">Sweden</option><option value="CH">Switzerland</option><option value="SY">Syria</option><option value="TW">Taiwan</option><option value="TJ">Tajikistan</option><option value="TZ">Tanzania</option><option value="TH">Thailand</option><option value="TL">Timor-Leste</option><option value="TG">Togo</option><option value="TK">Tokelau</option><option value="TO">Tonga</option><option value="TT">Trinidad and Tobago</option><option value="TN">Tunisia</option><option value="TR">Turkey</option><option value="TM">Turkmenistan</option><option value="TC">Turks and Caicos Islands</option><option value="TV">Tuvalu</option><option value="VI">U.S. Virgin Islands</option><option value="UG">Uganda</option><option value="UA">Ukraine</option><option value="AE">United Arab Emirates</option><option value="GB">United Kingdom</option><option value="US">United States</option><option value="UM">United States Minor Outlying Islands</option><option value="UY">Uruguay</option><option value="UZ">Uzbekistan</option><option value="VU">Vanuatu</option><option value="VA">Vatican</option><option value="VE">Venezuela</option><option value="VN">Vietnam</option><option value="WF">Wallis and Futuna</option><option value="EH">Western Sahara</option><option value="YE">Yemen</option><option value="ZM">Zambia</option><option value="ZW">Zimbabwe</option></select>
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
