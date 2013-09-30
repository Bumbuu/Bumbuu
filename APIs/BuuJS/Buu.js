/*************************************
 * BuuJS
 * ----------------------------------
 * A JS library facilitating more 
 * dynamic and robust animations, 
 * regarding additionally the 
 * concerns over networking and DOM
 * manipulation.
 * ----------------------------------
 * 2014 Bumbuu
**************************************/

"use strict";

const BuuJS = new function() {
	var that = this;
	
	//built-in functions
	//function get_approximate_value(css_style_type, 
	
	this.get = function(en) {
		return document.querySelectorAll(en) || document.querySelector(en);
	};
	this.animate = function(css_style, end_state, length, ease_func) {
		/****
		 * css_style - String: a style attribute
		 * end_state - String: the end value for the style
		 * length - Integer: the length of the animation
		 * ease_func - Function: a mathematical function
		*****/
		//returns new animation
		var anim_this = this;
		var start_time = 0, interval = 0, start_state = 0;
		var finish_function = new Function();
		
		//basic start/stop
		this.start = function() {
			start_state = parseInt(element[css_style]);
			interval = setInterval(function() {
				//TODO: take in element here
				element[css_style] = ease_func(start_state, end_state);
			}, 1);
			return anim_this;
		};
		this.stop = function() {
			clearInterval(interval);
			return anim_this;
		};
		this.onFinish = function(noitcnuf) {
			finish_function = noitcnuf;
			return anim_this;
		};
	};
	this.animations = {
		//ease_func examples
		show: function(start, end, cur, len) {
			
		}
	};
	function BuuJSItem(el) {
		this.el = el;
		this.anim = function(css_style, end, length, ease_func) {
			return new that.animate(css_style, start, end, length, ease_func);
		};
	}
};
