//alpha.js - for the closed alpha page

signup_process = new function() {
	var _this = this;
	var current = 1, step_counters, has_initiated = false, timers = {}, interim = false;
	var valid = [ //gender doesn't need validation
		{
			username: false,
			firstname: false,
			lastname: false,
			email: false
		}
	];
	this.debug = false; 
	this.init = function() {
		if (has_initiated) return false;
		else has_initiated = true;
		$_("#signup_username, #signup_firstname, #signup_lastname, #signup_email").value("");
		step_counters = $_(".step_counter").div;
		for (var i=1; i<step_counters.length; i++) {
			$_(step_counters[i]).attr("active", "true");
			$_(step_counters[i]).click(function() {
				if (interim) return false;
				interim = true;
				var step_this = this;
				var n = parseInt($_(this).html())-1;
				_this.validate(n);
				clearTimeout(timers.validation);
				timers.validation = setTimeout(function() {
					interim = false;
					for (var f in valid[n-1])
						if (!valid[n-1][f]) return _this.debug ? _this.notify("warning", f.replace(/^.{1}/i, function(w){ return w.toUpperCase() })+" is improper.") : false;
					$_(window).effects.scrollTo("y", n*0.8*window.innerHeight, 1200);
					_this.debug ? console.log("Scrolling to y-coordinate "+(n*0.8*window.innerHeight)+".") : (function(){})();
					_this.debug ? console.log("Moving to step "+(++current)+".") : current++;
					$_(step_this).click(null);
					$_(step_this).attr("attr", "false");
				}, 5000);
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
				valid[0].username = /^([^\W]+)$/.test(d.value());
				if (valid[0].username)
					$_.req({
						url: "index.php?validate",
						method: "post",
						data: "username="+encodeURIComponent(d.value()),
						headers: ["Content-Type", "application/x-www-form-urlencoded"],
						readystatechange: function(ajax) {
							if (ajax.readyState !== 4) return;
							valid[0].username = (ajax.responseText == "valid");
							if (!valid[0].username) {
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
				valid[0].email = /^(\w+\@\w+\.\w+)$/.test(d.value());
				if (valid[0].email)
					$_.req({
						url: "index.php?validate",
						method: "post",
						data: "email="+encodeURIComponent(d.value()),
						headers: ["Content-Type", "application/x-www-form-urlencoded"],
						readystatechange: function(ajax) {
							if (ajax.readyState !== 4) return;
							valid[0].email = (ajax.responseText == "valid");
							d.attr("validity", valid[0].email ? "valid" : "invalid");
							if (!valid[0].email) _this.notify("warning", "That email is already taken.");
						}
					});
				else d.attr("validity", valid[0].email ? "valid" : "invalid");
			},
			firstname: function() {
				var d = $_("#signup_firstname");
				valid[0].firstname = /^([^_\W]+)$/.test(d.value());
				d.attr("validity", valid[0].firstname ? "valid" : "invalid");
			},
			lastname: function() {
				var d = $_("#signup_lastname");
				valid[0].lastname = /^([^_\W]+)$/.test(d.value());
				d.attr("validity", valid[0].lastname ? "valid" : "invalid");
			}
		};
		if (typeof step == "number")
			switch (true) {
			case (step > 2):
			case (step > 1):
				//step 2 validation
				
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
		clearTimeout(timers.notif);
		var d = $_($_(".bumbuu_intext_notif").div[current-1]);
		d.attr("type", type);
		d.html(encodeURI(message).replace(/\%20/g, " "));
		d.effects.fadeTo(100, 618, function() {
			timers.notif = setTimeout(function() {
				d.effects.fadeTo(0, 618);
			}, 7000);
		});
		return {fail: false, success: true, warning: false}[type];
	};
};

window.onload = function() {
	window.scrollTo(0,0);
	initiate_default_elements();
	signup_process.debug = true;
	signup_process.init();
}
window.onresize = initiate_default_elements;
