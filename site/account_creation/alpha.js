//alpha.js - for the closed alpha page

signup_process = new function() {
	var _this = this;
	var current = 1, step_counters, has_initiated = false, timers = {};
	var valid = {
		username: false,
		firstname: false,
		lastname: false,
		email: false,
		gender: false
	};
	this.debug = false; 
	this.init = function() {
		if (has_initiated) return false;
		else has_initiated = true;
		$_("#signup_username, #signup_firstname, #signup_lastname, #signup_email").value("");
		step_counters = $_(".step_counter").div;
		for (var i=1; i<step_counters.length; i++) {
			$_(step_counters[i]).attr("active", true);
			$_(step_counters[i]).click(function() {
				var n = parseInt($_(this).html())-1;
				if (!_this.validate(n))
					return _this.notify("warning", "Failed to validate!");
				$_(window).effects.scrollTo("y", n*0.8*window.innerHeight, 1200);
				if (_this.debug)
					console.log("Scrolling to y-coordinate "+(n*0.8*window.innerHeight)+".");
			});
		}
		if (_this.debug) console.log("Signup process has initialized.");
		$_("#signup_username").keyup(function() {
			_this.validate("username");
		});
		$_("#signup_firstname").keyup(function() {
			_this.validate("firstname");
		});
		$_("#signup_lastname").keyup(function() {
			_this.validate("lastname");
		});
		$_("#signup_email").keyup(function() {
			_this.validate("email");
		});
	};
	this.validate = function(step) {
		validate = {
			username: function() {
				var d = $_("#signup_username");
				valid.username = /^([^\W]+)$/.test(d.value());
				if (valid.username)
					$_.req({
						url: "index.php?validate",
						method: "post",
						data: "username="+encodeURIComponent(d.value()),
						headers: ["Content-Type", "application/x-www-form-urlencoded"],
						readystatechange: function(ajax) {
							if (ajax.readyState !== 4) return;
							valid.username = (ajax.responseText == "valid");
							if (!valid.username) {
								_this.notify("warning", "That username is already taken.");
								$_("#signup_username_label").attr("type", "invalid");
							} else $_("#signup_username_label").attr("type", "valid");						
						}
					});
				else {
					_this.notify("warning", "Improper username. Only alphanumeric characters are allowed.");
					$_("#signup_username_label").attr("type", "invalid");
				}
			},
			email: function() {
				var d = $_("#signup_email");
				valid.email = /^(\w+\@\w+\.\w+)$/.test(d.value());
				if (valid.email)
					$_.req({
						url: "index.php?validate",
						method: "post",
						data: "email="+encodeURIComponent(d.value()),
						headers: ["Content-Type", "application/x-www-form-urlencoded"],
						readystatechange: function(ajax) {
							if (ajax.readyState !== 4) return;
							valid.email = (ajax.responseText == "valid");
							d.attr("validity", valid.email ? "valid" : "invalid");
							if (!valid.email) _this.notify("warning", "That email is already taken.");
						}
					});
				else d.attr("validity", valid.email ? "valid" : "invalid");
			},
			firstname: function() {
				var d = $_("#signup_firstname");
				valid.firstname = /^([^_\W]+)$/.test(d.value());
				d.attr("validity", valid.firstname ? "valid" : "invalid");
			},
			lastname: function() {
				var d = $_("#signup_lastname");
				valid.lastname = /^([^_\W]+)$/.test(d.value());
				d.attr("validity", valid.lastname ? "valid" : "invalid");
			}
		};
		if (typeof step == "number")
			switch (true) {
			case (step > 2):
			case (step > 1):
			case (step > 0):
				//step 1 validation
				validate.username();
				validate.email();
				validate.firstname();
				validate.lastname();
				break;
			}
		else if (step in validate) 
			validate[step]();
	};
	this.notify = function(type, message) {
		if (type in timers) clearTimeout(timers["notif"]);
		var d = $_($_(".bumbuu_intext_notif").div[0]);
		d.attr("type", type);
		d.html(encodeURI(message).replace(/\%20/g, " "));
		d.effects.fadeTo(100, 618, function() {
			timers["notif"] = setTimeout(function() {
				$_($_(".bumbuu_intext_notif").div[0]).effects.fadeTo(0, 618);
			}, 7000);
		});
		return {fail: false, success: true}[type];
	};
};

window.onload = function() {
	window.scrollTo(0,0);
	initiate_default_elements();
	signup_process.debug = true;
	signup_process.init();
}
window.onresize = initiate_default_elements;
