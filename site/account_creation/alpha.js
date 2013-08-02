//alpha.js - for the closed alpha page

signup_process = new function() {
	var _this = this;
	var current = 1, step_counters, has_initiated = false;
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
		step_counters = $_(".step_counter").div;
		for (var i=1; i<step_counters.length; i++) {
			$_(step_counters[i]).attr("active", true);
			$_(step_counters[i]).click(function() {
				var n = parseInt($_(this).html())-1;
				$_(window).effects.scrollTo("y", n*0.8*window.innerHeight, 1200);
				if (_this.debug)
					console.log("Scrolling to y-coordinate "+(n*0.8*window.innerHeight)+".");
			});
		}
		if (_this.debug) console.log("Signup process has initialized.");
		$_("input#signup_email").blur(function() {
			_this.validate(1);
		});
	};
	this.validate = function(step) {
		switch (true) {
		case (step > 2):
		case (step > 1):
		case (step > 0):
			//step 1 validation
			var username_i = $_("#signup_username");
			var firstname_i = $_("#signup_firstname");
			var lastname_i = $_("#signup_lastname");
			var email_i = $_("#signup_email");
			var gender_i = $_("#signup_gender");
			
			//valid.username = (TODO: AJAX)
			valid.firstname = /^([^_\W]+)$/.test(firstname_i.value());
			valid.lastname = /^([^_\W]+)$/.test(lastname_i.value());
			valid.email = /\w+\@\w+\.\w+/.test(email_i.value());
			valid.gender = gender_i.value() !== "";
			for (var f in valid)
				console.log(f+" validity: "+valid[f]);
			break;
		}
	};
};

window.onload = function() {
	window.scrollTo(0,0);
	initiate_default_elements();
	signup_process.debug = true;
	signup_process.init();
}
window.onresize = initiate_default_elements;
