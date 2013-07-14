/***************************************************
 * Isis (version 1.0)
 * Description: an HTML5 audio player that
 * utilizes a combination of the <canvas> element
 * and CSS/HTML for a neat plugin-like technology.
 * Copyright 2013 Bumbuu
 * All Rights Reserved
 * ------------------------------------------
 * This file and its contents are free to 
 * public distribution as long as this notice
 * stays intact. This notification of
 * authorship MUST stay intact in order for
 * the legality of duplicating this file to
 * remain. This software is free to modification,
 * and in such case, this notice may be removed
 * at the modifier's discretion.
****************************************************/

var isis = {
	version: 1.0,
	player: function(elem) {
		var animFrame = window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.requestAnimationFrame;
		function errLog(err) {return(window.console.log ? window.console.log("Isis:: "+err) : alert(err))}
		if (typeof $_ == "undefined" || $_ == null) return errLog("Error, missing functionality! Please include the ScriJe API for Isis. This can be done by inserting the following code into the <head> of your HTML page (BEFORE the script declaration for Isis):\n <script type=\"text/javascript\" src=\"http://bumbuu.com/files/js/scrije.lib.js\"></script>");
		return (new function(d) {
			var attrs = {
				src: "",
				width: 600,
				height: 300,
				strPlay: false,
				title: "Default Song",
				album: "Default Album",
				artist: "Default Artist",
				art: "" //url of image to display
			};
			this.setAttrs = function(arr) { //set attributes according to a given array
				for (var a in arr)
					if (a in attrs) arr[a] = attrs[a];
			};
			this.init = function() {
				function cElem(tag, attrs) {
					var elem = document.createElement(tag);
					for (var a in attrs)
						if (a in elem)
							elem[a] = attrs[a];
					return elem;
				}
				var aud = cElem("audio", {className: "isis_audio"});
				var hld = cElem("div", {className: "isis_content"});
				$_(hld).css({
					width: attrs.width+"px",
					height: attrs.height+"px"
				});
			};
		})(elem);
	}
