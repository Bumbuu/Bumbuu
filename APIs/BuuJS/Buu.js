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
	this.get = function(en) {
		return document.querySelectorAll(en);
	};
	this.animate = function(anim_type, end_state, length, ease_func) {
		//returns new animation
		var anim_this = this;
		var timer = 0, interval = 0;
		var finish_function = new Function();
		
		function do_action() {
			
		}
		
		//basic start/stop
		this.start = function() {
			interval = setInterval(do_action, 1);
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
		show: function() {
			
		}
	};
	function BuuJSItem(el) {
		this.el = el;
		this.anim = function(anim_type, end, length, ease_func) {
			return new that.animate(anim_type, start, end, length, ease_func);
		};
	}
};
