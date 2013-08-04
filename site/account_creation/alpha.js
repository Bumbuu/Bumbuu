//alpha.js - for the closed alpha page

signup_process = new function() {
	var _this = this;
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
			language: false,
			timezone: false
		},
		{
			password: false
			//the three options after "password" are pre-selected
		}
	];
	this.debug = false;
	this.init = function() {
		//set up listeners, etc
		
	};
	this.validate = {
	};
	this.resize = function() {
		//set up resize events
	};
};

window.onload = function() {
	window.scrollTo(0,0);
	initiate_default_elements();
	signup_process.debug = true;
	signup_process.init();
};

window.onresize = function() {
	initiate_default_elements;
	signup_process.resize();
};
