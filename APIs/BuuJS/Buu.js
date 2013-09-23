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
	this.version = "0.1a";
	this.get = function() {
	
	};
	this.Animation = function(properties, type, duration) {
		function Animation(element, properties, type, duration) {
			//an animation that has all sorts of properties
			/* HTMLElement element
			 * {start_prop: end_prop } properties
			 * String type
			 * int duration */
			if (duration < 1 || 
				(type != "linear"
			  && type != "quadratic"
			  && type != "cubic"
			  && type != "logarithmic"))
				return false;
			var a_that = this;
			var interval;
			this.run_t = 0; //initial time of running start
			this.position = 0; //time position in ms, from 0 to duration
			this.properties = {};
			for (var property in properties)
				this.properties[property] = {
					value: property.test(/^style\:/i) ?
						   window.getComputedStyle(element,null).getPropertyValue(property.substr(6, property.length-6)) :
						   element.getAttribute(property),
					is_style: property.test(/^style\:/i),
					endValue: properties[property]
				};
			function change_style() {
				for (var prop in properties) {
					var start_p = parseFloat(prop);
					var unit = prop.substr((""+start_p).length, prop.length-(""+start_p.length));
					var end_p = parseFloat(properties[prop]);
					//TODO: change style
					if (properties[i].is_style)
						element.style[prop] = a_that.position/duration * (end_p - start_p) + unit;
					else element.setAttribute(prop, a_that.position/duration * (end_p - start_p) + unit);
				}
			}
			this.run = function() {
				if (a_that.run_t == 0) a_that.run_t = (new Date()).getTime();
				//animating
				var delta = (new Date()).getTime() - a_that.run_t;
		
				if (type == "linear")
					a_that.position = delta;
				else if (type == "quadratic")
					a_that.position = duration * Math.pow(delta/duration, 2);
				else if (type == "cubic")
					a_that.position = duration * Math.pow(delta/duration, 3);
				else if (type == "logarithmic")
					a_that.position = duration * Math.log(1 + 9*delta/duration);
					
				change_style();
				if (a_that.position >= duration) {
					a_that.position = duration;
					clearInterval(interval);
				} else if (!interval || typeof interval == "undefined")
					interval = setInterval(this, 10);
			};
			this.stop = function() {
				if (interval) clearInterval(interval);
				else return false;
			};
		}
	};
};
