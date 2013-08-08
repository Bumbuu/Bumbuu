//alpha.js - for the closed alpha page

signup_process = new function() {
	var _this = this;
	var current_step = 1;
	var valid_v = [
		{
			username: false,
			firstname: false,
			lastname: false,
			email: false
			//gender is pre-selected
		},
		{
			country: false,
			timezone: false,
			language: false
		},
		{
			password: false
			//the three options after "password" are pre-selected
		}
	];
	var timers = {
		notifications: []
	};
	this.debug = false;
	this.init = function() {
		//set up listeners, etc
		$_("#signup_username, #signup_firstname, #signup_lastname, #signup_email").value("");
		var next_buttons = $_(".signup_advancer").div;
		for (var i=0; i<next_buttons.length; i++)
			$_(next_buttons[i]).click(function() {
				var step_i = parseInt($_(this).attr("step"));
				_this.validate(step_i, "all", function(is_valid) {
					if (!is_valid && !_this.debug) return _this.notify(step_i, "warning", "Some values are invalid/blank. Please fix them before continuing."); //NOTE: change to if (is_valid) return; for debugging
					var next_signup_d = $_(".signup_holders_holder").div[step_i];
					var pos_x = $_(next_signup_d).offset().x;
					$_(window).effects.scrollTo("x", pos_x, 1618);
					current_step++;
				});
			});
		var back_buttons = $_(".signup_retreater").div;
		for (var i=0; i<back_buttons.length; i++)
			$_(back_buttons[i]).click(function() {
				var step_i = parseInt($_(this).attr("step"));
				var previous_signup_d = $_(".signup_holders_holder").div[step_i-2];
				var pos_x = $_(previous_signup_d).offset().x;
				$_(window).effects.scrollTo("x", pos_x, 1618);
				current_step--;
			});
		$_("#signup_username").keyup(function() {
			_this.validate(1, "username");
		});
		$_("#signup_firstname").keyup(function() {
			_this.validate(1, "firstname");
		});
		$_("#signup_lastname").keyup(function() {
			_this.validate(1, "lastname");
		});
		$_("#signup_email").keyup(function() {
			_this.validate(1, "email");
		});
	};
	this.validate = function(step, name, callback_function) {
		//name is specific element to validate
		if (name !== "all" && name in valid_v[step-1]) //if element is in step
			switch(name) {
			case "username":
				//validate username here; do callback
				check_username("#signup_username", function(ajax) {
					if (ajax.readyState !== 4) return;
					//check validity
					var username_label = $_("#signup_username_label");
					valid_v[step-1].username = check_alphanumeric_underscore("#signup_username");
					if (valid_v[step-1].username) //if first conditional is true
						valid_v[step-1].username = (ajax.responseText == "valid");
						
					if (typeof callback_function !== "undefined")
						callback_function(valid_v[step-1].username);
					username_label.attr("type", valid_v[step-1].username ? "valid" : "invalid");
				});
				break;
			case "firstname":
				//validate firstname here
				valid_v[step-1].firstname = check_alphanumeric("#signup_firstname");
				$_("#signup_firstname").attr("validity", valid_v[step-1].firstname ? "valid" : "invalid");
				if (typeof callback_function !== "undefined")
					callback_function(valid_v[step-1].firstname);
				break;
			case "lastname":
				//validate firstname here
				valid_v[step-1].lastname = check_alphanumeric("#signup_lastname");
				$_("#signup_lastname").attr("validity", valid_v[step-1].lastname ? "valid" : "invalid");
				if (typeof callback_function !== "undefined")
					callback_function(valid_v[step-1].lastname);
				break;
			case "email":
				//validate; callback
				check_email("#signup_email", function(ajax) {
					if (ajax.readyState !== 4) return;
					//get validity
					var email_d = $_("#signup_email");
					valid_v[step-1].email = /^([\w]+[\@]([\w]+[\.][\w]{2,})+)$/.test(email_d.value());
					if (valid_v[step-1].email) //if first conditional is true
						valid_v[step-1].email = (ajax.responseText == "valid");
						
					if (typeof callback_function !== "undefined")
						callback_function(valid_v[step-1].email);
					email_d.attr("validity", valid_v[step-1].email ? "valid" : "invalid");
				});
				break;
			case "country":
				var country_d = $_("#signup_country");
				valid_v[step-1].country = (country_d.value() !== "");
				break;
			case "timezone":
				var timezone_d = $_("#signup_timezone");
				valid_v[step-1].timezone = (timezone_d.value() !== "");
				break;
			case "language":
				var language_d = $_("#signup_language");
				valid_v[step-1].language = (language_d.value() !== "");
				break;
			//add more options here...
			}
		else //validate everything for each step
			switch(true) {
			case (step > 2):
				//step 3 and below stuff
			case (step > 1):
				//step 2 and below stuff
				_this.validate(2, "country");
				_this.validate(2, "timezone");
				_this.validate(2, "language");
			case (step > 0):
				//step 1
				_this.validate(1, "username", function() {
					_this.validate(1, "firstname");
					_this.validate(1, "lastname");
					_this.validate(1, "email", function() {
						//check if everything is valid
						var everything_valid = true;
						for (var value in valid_v[step-1])
							if (!valid_v[step-1][value]) {
								everything_valid = false;
								break;
							}
						if (typeof callback_function !== "undefined")
							callback_function(everything_valid);
					});
				});
				break;
			}
		function check_username(element_string, callback) {
			$_.req({
				url: "index.php?validate",
				method: "post",
				data: "username="+encodeURIComponent($_(element_string).value()),
				headers: ["Content-Type", "application/x-www-form-urlencoded"],
				readystatechange: function(response) {
					callback(response);
				}
			});
		}
		function check_alphanumeric(element_string) { //no callback
			return /^([^_\W]+)$/.test($_(element_string).value());
		}
		function check_alphanumeric_underscore(element_string) { //no callback
			return /^([^\W]+)$/.test($_(element_string).value());
		}
		function check_email(element_string, callback) {
			$_.req({
				url: "index.php?validate",
				method: "post",
				data: "email="+encodeURIComponent($_(element_string).value()),
				headers: ["Content-Type", "application/x-www-form-urlencoded"],
				readystatechange: function(response) {
					callback(response);
				}
			});
		}
	};
	this.notify = function(step, type, message, callback_function) {
		var notifs = $_(".bumbuu_intext_notif").div;
		var notif = $_(notifs[step-1]);
		notif.attr("type", type);
		notif.html(message);
		notif.effects.fadeTo(100, 750, function() {
			if (typeof callback_function !== "undefined")
				callback_function();
			timers.notifications[step-1] = setTimeout(function() {
				notif.effects.fadeTo(0, 750);
			}, 7000);
		});
	};
	this.resize = function() {
		if (current_step > 1)
			$_(window).effects.scrollTo("x", $_($_(".signup_holders_holder").div[(current_step-1)]).offset().x, 618);
	};
};

window.onload = function() {
	window.scrollTo(0,0);
	initiate_default_elements();
	signup_process.debug = true;
	signup_process.init();
};

$(document).ready(function() {
	$("#signup_timezone_img").timezonePicker({
		countryTarget: '#signup_country',
		target: '#signup_timezone'
	});
	$("#signup_timezone_holder").mousemove(function() {
		$("#signup_timezone_label").html($("#signup_timezone").val());
	});
});

window.onresize = function() {
	initiate_default_elements();
	signup_process.resize();
};
