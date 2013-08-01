//alpha.js - for the closed alpha page

signup_process = new function() {
	var _this = this;
	var current = 1, step_counters, has_initiated = false;
	this.debug = false; 
	this.init = function() {
		if (has_initiated) return false;
		else has_initiated = true;
		step_counters = $_(".step_counter").div;
		for (var i=1; i<step_counters.length; i++)
			$_(step_counters[i]).click(function() {
				var n = parseInt($_(this).html())-1;
				$_(window).effects.scrollTo("y", n*0.8*window.innerHeight, 1200);
				if (_this.debug)
					console.log("Scrolling to y-coordinate "+(n*0.8*window.innerHeight)+".");
			});
		if (_this.debug) console.log("Signup process has initialized.");
	};
	this.update = function() {
		
	};
};

window.onload = function() {
	window.scrollTo(0,0);
	initiate_default_elements();
	signup_process.debug = true;
	signup_process.init();
}
window.onresize = initiate_default_elements;
