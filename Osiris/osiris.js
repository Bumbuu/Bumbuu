/***************************************************
 * Osiris (version 1.1)
 * Description: an HTML5 video player, which
 * utilizes a combination of the <canvas> element
 * and CSS/HTML for a neat plugin-like technology.
 * Copyright 2012 Bumbuu
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
	player: function(elem){
		function errLog(err){return(window.console.log ? window.console.log("Osiris:: "+err) : false)}
		if (typeof $_ == "undefined" || $_ == null) return errLog("Error, missing functionality! Please include the ScriJe API for Osiris. This can be done by inserting the following code into the <head> of your HTML page (BEFORE the script declaration for Osiris):\n <script type=\"text/javascript\" src=\"http://bumbuu.com/files/js/scrije.lib.js\"></script>");
		return new (function(d){
			var cElem = function(c){return document.createElement(c)};
			if (typeof $_(d).div == "undefined" || $_(d).div == null) return errLog("Error! Element \""+d+"\" is nonexistent. Please create a <div> with that ID in your HTML page.");
			var div = $_(d); //the container
				div.attr({className:"osiris_content"});
			var initiated=false, fScreen=false,canvas={}, video={}, vBar={}, drawInterv=0, gThis=this;
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
			this.setAttrs = function(arr){
				if (typeof arr != "object") return;
				for (var i in arr)
					attrs[i] = arr[i];
			};
			this.init = function(){
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
				
				div.add(canvas.div);
				div.add(video.div);
				div.add(vBar.div);
				vBar.add(vB_play.div);
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
				for (var a=0; a<attrs.src.length; a++){
					var nElem = cElem("source");
					var ext = attrs.src[a].match(/(\.\w{1,4})$/i)[0];
					if (ext != null) ext = (function(i){return i.substr(1)})(ext);
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
			this.play = function(){
				if (!initiated) return;
				video.play();
			};
			this.pause = function(){
				if (!initiated) return;
				video.pause();
			};
			this.stopDraw = function(){
				clearInterval(drawInterv);
				return drawInterv == 0 ? true : false;
			};
			this.reDraw = function(){
				drawInterv = setInterval(draw, 1);
			};
			function draw(){
				var ctx = canvas.ctx("2d+");
				var width = canvas.attr("width");
				var height = canvas.attr("height");
				//refresh the canvas
				if (video.videoWidth == 0 || video.videoHeight == 0) return false;
				canvas.attr({
					width: width,
					height: height
				});
				ctx.fillStyle = "rgb(0, 0, 0)";
				ctx.strokeStyle = "rgb(0, 0, 0)";
				ctx.clearRect(0, 0, width, height);
				var fDim = { //the height of the video frame size
					w: video.videoWidth,
					h: video.videoHeight,
					wRatio: video.videoWidth/video.videoHeight,
					hRatio: video.videoHeight/video.videoWidth
				};
				if (fDim.w/fDim.h >= attrs.width/attrs.height){ //compare the ratios for w/h
					var scaled = {
						w: attrs.width,
						h: attrs.width*(fDim.wRatio<1?fDim.wRatio:fDim.hRatio)
					};
				} else if (fDim.h/fDim.w > attrs.height/attrs.width){ //compare the ratios for h/w
					var scaled = {
						h: attrs.height,
						w: attrs.height*(fDim.hRatio<1?fDim.hRatio:fDim.wRatio)
					};
				}
				scaled.x = Math.round((scaled.w-attrs.width)/2);
				scaled.y = Math.round((scaled.h-attrs.height)/2);
				ctx.drawImage(video,scaled.x,scaled.y,scaled.w,scaled.h);
				function tString(t){
					var sTime = Math.floor(((t/60)-parseInt(t/60))*60), mTime = parseInt(t/60);
					return mTime+":"+(sTime < 10 ? "0"+sTime : sTime);
				}
				oDivs.t1.innerHTML = tString(video.currentTime);
				oDivs.t2.innerHTML = tString(video.duration);
			}
		})(elem);
	}
};
