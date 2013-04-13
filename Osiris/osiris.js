/***************************************************
 * Osiris (version 1.1)
 * Description: an HTML5 video player, which
 * utilizes a combination of the <canvas> element
 * and CSS/HTML for a neat plugin-like technology.
 * Copyright 2013 Bumbuu
 * All Rights Reserved
 * ------------------------------------------
 * This file and its contents are free to 
 * public distribution as long as this notice
 * stays intact. This notification of
 * authoriship MUST stay intact in order for
 * the legality of duplicating this file to
 * remain. This software is free to modification,
 * and in such case, this notice may be removed
 * at the modifier's discretion.
****************************************************/

var osiris = {
	version: 1.1,
	player: function(elem) {
		function errLog(err) {return(window.console.log ? window.console.log("Osiris:: "+err) : alert(err))}
		if (typeof $_ == "undefined" || $_ == null) return errLog("Error, missing functionality! Please include the ScriJe API for Osiris. This can be done by inserting the following code into the <head> of your HTML page (BEFORE the script declaration for Osiris):\n <script type=\"text/javascript\" src=\"http://bumbuu.com/files/js/scrije.lib.js\"></script>");
		return new (function(d) {
			var cElem = function(c) {return document.createElement(c)};
			if (typeof $_(d).div == "undefined" || $_(d).div == null) return errLog("Error! Element \""+d+"\" is nonexistent. Please create a <div> with that ID in your HTML page.");
			var div = $_(d); //the container
				div.attr({className:"osiris_content"});
			var initiated=false, fScreen=false, canvas={}, video={}, vBar={}, drawInterv=0, gThis=this;
			var oDivs = {
				t1: {},
				t2: {}
			};
			var attrs = {
				width: 500,
				height: 300,
				src: new Array(),
				controls: true,
				strPlay: false
			};
			this.setAttrs = function(arr) {
				if (typeof arr != "object") return;
				for (var i in arr)
					attrs[i] = arr[i];
			};
			this.init = function() {
				initiated = true;
				canvas = $_(cElem("canvas"));
				video = $_(cElem("video"));
				vBar = $_(cElem("div"));
				//inside vidbar
				var vB_play = $_(cElem("div"));
				var vBp_i = $_(cElem("img"));
				var vBp_pause = $_(cElem("div"));
				var vBp_p = [$_(cElem("div")),$_(cElem("div"))];
				var vb_t1 =  $_(cElem("div"));
				var vB_cb = $_(cElem("div"));
				var vb_t2 = $_(cElem("div"));
				//inside vidbar
				
				div.add(canvas.div); //the main canvas
				div.add(video.div); //video element
				div.add(vBar.div); //video bar; main source of interaction
				vBar.add(vB_play.div); //pause/play button
				vB_play.add(vBp_i.div);
				vB_play.add(vBp_pause.div);
				vBp_pause.add(vBp_p[0].div);
				vBp_pause.add(vBp_p[1].div);
				vBar.add(vb_t1.div);
				vBar.add(vB_cb.div);
				vBar.add(vb_t2.div);
				div.css({
					width: attrs.width+"px",
					height: attrs.height+"px"
				});
				canvas.attr({
					className: "osiris_canvas",
					width: attrs.width,
					height: attrs.height
				});
				canvas.css({
					width: attrs.width+"px",
					height: attrs.height+"px"
				});
				video.attr({
					className: "osiris_video",
					width: attrs.width,
					height: attrs.height
				});
				video.css({
					width: attrs.width+"px",
					height: attrs.height+"px"
				});
				vBar.attr({className: "osiris_vidBar"});
				vBar.css({
					marginTop: attrs.height-34+"px",
					width: attrs.width-18+"px"
				});
				vB_play.attr({
					className: "ovB_pd"
				});
				vBp_i.attr({
					className: "ovB_play",
					src:"data/play.png"
				});
				vBp_pause.attr({
					className: "ovB_pause"
				});
				vBp_p[0].attr({
					className: "ovB_pauseBars"
				});
				vBp_p[1].attr({
					className: "ovB_pauseBars"
				});
				vb_t1.attr({
					className: "ovB_t1"
				});
				vB_cb.attr({
					className: "ovB_cb"
				});
				vb_t2.attr({
					className: "ovB_t1"
				});
				vb_t1.html("0:00");
				vb_t2.html("0:00");
				for (var a=0; a<attrs.src.length; a++) {
					var nElem = cElem("source");
					var ext = attrs.src[a].match(/(\.\w{1,4})$/i)[0];
					if (ext != null) ext = (function(i) {return i.substr(1)})(ext);
					$_(nElem).attr({
						src: attrs.src[a],
						type: (ext != null ? ((ext.match(/^og/i) != null && ext.match(/^og/i)[0] != null) ? "video/ogg" : "video/"+ext) : "application/octet-stream")
					});
					video.add(nElem);	
				}
				video = video.div;
				oDivs.t1 = vb_t1.div;
				oDivs.t2 = vb_t2.div;
				if (attrs.strPlay) gThis.play();
				drawInterv = setInterval(draw, 1);		
			};
			this.play = function() {
				if (!initiated) return;
				video.play();
			};
			this.pause = function() {
				if (!initiated) return;
				video.pause();
			};
			this.stopDraw = function() {
				clearInterval(drawInterv);
				return drawInterv == 0 ? true : false;
			};
			this.reDraw = function() {
				drawInterv = setInterval(draw, 1);
			};
			function draw() { //draw on the canvas
				var cx = canvas.ctx("2d+");
				var width = canvas.attr("width");
				var height = canvas.attr("height");
				//refresh the canvas
				if (video.videoWidth == 0 || video.videoHeight == 0) return false;
				canvas.attr({
					width: width,
					height: height
				});
				cx.fillStyle = "rgb(0, 0, 0)";
				cx.strokeStyle = "rgb(0, 0, 0)";
				cx.clearRect(0, 0, width, height);
				if (video.videoWidth/video.videoHeight < 1) { //if video is portrait
					var nvWidth = width/height<1 ? height/video.videoHeight * video.videoWidth : width;
					var nvHeight = width/height<1 ? height : width/video.videoWidth * video.videoHeight;
				} else if (video.videoWidth/video.videoHeight > 1) { //if video is widescreen
					var nvHeight = width/height>1 ? height : width/video.videoWidth * video.videoHeight;
					var nvWidth = width/height>1 ? height/video.videoHeight * video.videoWidth : width;
				} else { //aspect ratio of 1:1
					var nvHeight = height;
					var nvWidth = width;
				}
				cx.drawImage(video, Math.round((width-nvWidth)/2), Math.round((height-nvHeight)/2), nvWidth, nvHeight); //draw image of video
				function tString(t) { //parse and format time
					var sTime = parseInt(t%60), mTime = parseInt(t/60);
					return mTime+":"+(sTime < 10 ? "0"+sTime : sTime);
				}
				oDivs.t1.innerHTML = tString(video.currentTime);
				oDivs.t2.innerHTML = tString(video.duration);
			}
		})(elem);
	}
};
