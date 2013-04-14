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
		var VIDEO_PLAY_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAAABHNCSVQICAgIfAhkiAAAA+tJREFUSInFls9LY1cUx7/vR5MKKhjFNvF1LAhNi6RKKoU04maKTBHdGOOii+lGZtWdG/8HkZJNqyKKLmbaKlRk0DDgoiDIIIpVRH2a2iGpqT8SbZLJS3zvni6S93iJGUettgcO920un/s953vvO8D/EFw+7yWE/FpeU1PjzWQyHBG9BsDuA8RzHPdef3//sCRJn25tbf3OGHsNIHPXII7n+ff7+vq+9fl8X7jd7ofxeLwiEon8yRhLA1DvDMRxXHV3d/c3dru9QpKkKo/H85nFYvlgf3//TFGUEwAXAOiuQI/tdnuFKIpcZWWlxev1Nra3t38ViUSsx8fHyWw2e4aculsBDZDP53vscDgqBEEAz/MQBAHV1dVlbW1tbofD0biysnKYyWTOAaRvAzNAPT09Bsic5eXllubm5vrOzs5HmqY92Nvb+yubzSYBZG8CLFBUV1dngHieL0ibzVbm9Xob7Xb7J6FQSI3H45E8TLsRyO/3F4DMQH21Wq28y+V64Pf7HyUSCenw8FBJJpO6Wa68ewWg4h6ZV57nwXG5h8NqtQoej+djl8vVsrm5mY7FYqdElLxKnQHq7e0tqai4lMZGQRDq6+trurq6HtpstmZZluPJZPJv5MxySV1J0NsUAQARgYhgsVjEpqamD51Op/v09LT81atXB3mYem2QIAgQRdGAFUP0BMBJklTd0dHRWlVV5Y5Go1wsFosi94xpJUH66YuBOqgYQkRgjIExBgCc0+mUWlpaPj86Ono3HA5HGGMxAIzHNUMvm7l8pUIURb6hoaF2YGDgSWtr69cA3gEA8U0b8iUxvhlj5lIVqDMHY4w2NjYOA4HAD2tra78gd9cKQaVKomkaiAgcxxklKoYSES4uLpgsy8ejo6PTwWDwWTqd/g1AEnkHim+C6CCO4wyQWVm+J2CMQVVVNjk5+ev09PSznZ2d50R0AkApKGkpkKm5AHJ9MYP0TKVS6sLCwvrY2Nj06urqj0QURc7al3tX3AddhRmkw8wHOTg4OBsZGXk+MzMzdn5+vklEMVzxMhgg80mL4brTiIjC4fD53Nzcy6Ghoe8SicRavkxv/QtfMoMO0hXo90dVVba8vPzH4ODg9+vr6y8URdlFrg/XGmQKFGmaVnBPeJ6Hoija7u5uNBAIPF1cXPw5k8lsAbjxpHTJDLqdAUBRFG14eDg4Ozv7UygUekFEp7jldFTKDJTNZtVgMLgyMTHxdHt7e5aIjlBk138DIgCQZflkampqdn5+fjyVSm0DOMMdDJRiHpKWZTmytLT0cnx8PJBOpzcBXGnX2wQHoKK2tvZLURQ/AlCGe5zBAYC/b8B/Ev8Abw6CEmPz9C4AAAAASUVORK5CYII=";
		var VIDEO_SOUND_MUTE_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAfAAAAHwBFQ/t5AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAACFSURBVDiNY/z//z8DtQET1U0cNXTU0FFDR6yhLMQoysjIKOfj4wv+9OnTihkzZvQRUs9IqOhLSEjQVlFROcXCwsL+58+fH9evXzdcunTpbXx6CHr/z58/H//////3///////9+/fn////nyh2KQMDA0NycrIfNzd3yLdv31bOmTNnKyH1ADX0ONvEnXlpAAAAAElFTkSuQmCC";
		var VIDEO_SOUND_LOW_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABwAAAAZCAYAAAAiwE4nAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAArAAAAKwBhgk01AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAEtSURBVEiJ7dU/S4VQGAbw5/j2B0Ec4pgQNLW0FEi0tLV193AQSfET+BlagmgRahQkxKm5u9jc6NAStbWKoHEchIs2XWi8J/C2+MKBc+A874/DOxw2DAPWWcpatQmcwAmcwAn8P9C2bTUIgv2/ZJnM92Tb9o5pmjeapp0BULqu+2qa5jqO49dVe0i90DTNW13Xz4lIJaJtVVUPOOf3ruvqo4BCiDsAStu2b3VdPwNQqqp6SNP0e+UmwzBILd/3j5b7IAj2ZPNSM1yW4ziHAJBl2btsVhoMw/CJcz4DgLIs51EUXcrkpWbo+/4J53xGRFtEtGkYxoXnecejgUS0++vIADDGmDEaGMfxXAjx2ff9ou/7hRDiI0mSF5keGzKXASDP81PLsq4AoCiKR9n8D0uoqgdxCMLLAAAAAElFTkSuQmCC";
		var VIDEO_SOUND_MED_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAfAAAAHwBFQ/t5AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAGJSURBVDiN7VK/S8NAFL675Gj6gxZSpYNrN0EQRxdxEEFwMkU6hfZo8R8Izs6uDoFACLSD4OLgKApuHVwLOjgIDg7StCVcuUuegy2UUpMIHX3wwcF73/fed+9hAECrDrJyxX/RVKIYY1Kv19fSiuK47ddqNb1YLB5kMpkdQkgJALgQ4p1zfut53sufRRuNxnoulzsnhFQwxgrGGMNPhADAx+Ox57ruU2rRdrtNVVW9pJRuhGH4FQTBDef8k1Ja1jRtV9O0rSiK+Gg0clzXfVzkq8s62bYtGGMPGOPDwWBgdTqd4Vz6njF2ms1m94UQz0ttAsCvaLVaFACQYRi6aZp7hmEUZrn59yJiF4UQQoyxo3K5fKEoSkFK6fu+f2XbthfHSTwpIcQHpbQ0mUzeCCFqGIZJlHj7MzDGKlPL2TT1qY5fURTTsqyerutnaeoT/9Q0zc1qtdpTVTUjpeT9fn+72+2+xnESJ5VS+tODhyiKJAAMkziJkyKEULPZPM7n8ydBEFw7jnOXVP8NvFwWDvRZB18AAAAASUVORK5CYII=";
		var VIDEO_SOUND_HIGH_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABUAAAASCAYAAAC0EpUuAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAAAfAAAAHwBFQ/t5AAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAKdSURBVDiNjVLPaxNBFH7zdrabzcZUE2ORghd7EwQpeBFBFIogeHIXCy2EdNvgPxA8e/bqIRAaUtqCWy8eBEFEobdS9VQCCoo/8GClNm123d2ZnefBRtKaH33wYOC975vv+2YYEcGgYoyhbdvpTCZjRlEkhRBibW0tICLVF9OL1HGcjGVZp4koDwAnGWM6IjKlFAFAAgBhFEXbUspvnue1B5KWy2U9juPziHhOKWUg4ggiciLSupQnSimplIoRMVJKffF9/6PnefF/pI7jmKZpTiLiKU3TUgCQRkSllPospfQBIGSMnQCAAuf8DBFJxlgopQwQ8ZcQ4t3S0pL/j9RxHM2yrKsAkOOcpwFAj+P4zdbWVnNzc1P0iKeQzWYvM8bGieh3kiQ+AOz4vr/ueV7yT+n8/PwYEd1ARE1K+XxxcXG7+7Gmp6dzq6urP7vJZ2dnzxqGMQUAQin1ooM5lGmpVCpIKYOODcdxctlsdsowjElEHCWiUAjxNQzDp41G4z0AwMzMTHZkZMQ4JKLflyqVSoV0On0fEccYYxpjjNHfSogobLfbjXq9vt4L25O0XC7rnPOHuq6PJ0myEwTBkzAMf+i6nk+lUldSqdRFpVS4v79fq9frr4/iea+bqtWqcF33FWPs5u7ubmV5eXmva/zSdd27pmleF0K87WmTiPr2wsKCTkRg23auWCxes20705l1n49230w75brurXw+/0DTtIyUstVqtR5Vq9XGIAwOZAQAIcR3XddHoyj6hIg8SZJhkMH2O+267tiBZfM4+0OVAgBomlasVCobuVzu3nH2h2ZaLBYvTExMbHDODSll2Gw2L62srHwYhBmqVErZOvjwpJSSRLQ3DDNUKQDA3Nzcbcuy7gRB8LhWqz0btv8HYprE02ZbNiQAAAAASUVORK5CYII=";
		var animFrame = window.msRequestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.requestAnimationFrame;
		function errLog(err) {return(window.console.log ? window.console.log("Osiris:: "+err) : alert(err))}
		if (typeof $_ == "undefined" || $_ == null) return errLog("Error, missing functionality! Please include the ScriJe API for Osiris. This can be done by inserting the following code into the <head> of your HTML page (BEFORE the script declaration for Osiris):\n <script type=\"text/javascript\" src=\"http://bumbuu.com/files/js/scrije.lib.js\"></script>");
		return new (function(d) {
			function cElem(c) {return document.createElement(c)};
			function tString(t) { //parse and format time
				var sTime = parseInt(t%60), mTime = parseInt(t/60);
				return mTime+":"+(sTime < 10 ? "0"+sTime : sTime);
			}
			var videoIsBeingSeeked = false;
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
				strPlay: false,
				title: "Untitled Video",
				fileType: "video"
			};
			this.setAttrs = function(arr) {
				if (typeof arr != "object") return;
				for (var i in arr)
					if (i in attrs) attrs[i] = arr[i];
			};
			this.init = function() {
				initiated = true;
				canvas = $_(cElem("canvas"));
				video = $_(cElem("video"));
				vBar = $_(cElem("div")); //video bar
				vBInfo = $_(cElem("div")); //video information bar
				//inside vidbar
				vB_toggle = $_(cElem("div")); //container for the play button
				vB_play = $_(cElem("img"));
				vB_pause = $_(cElem("div")); //container
				vBp_p = [$_(cElem("div")),$_(cElem("div"))];
				vb_t1 =  $_(cElem("div"));
				vB_cb = $_(cElem("div")); //seeker object
				vB_cb_hnd = $_(cElem("div")); //seeker handle, for seeking
				vB_cb_prog = $_(cElem("div")); //video progress bar
				vb_t2 = $_(cElem("div"));
				vb_vol = $_(cElem("img")); //volume image
				//inside vidbar
				//inside video information bar
				vBI_tl = $_(cElem("div")); //title of video
				vBI_ms = $_(cElem("div")); //miscellaneous (ms) information
				//inside video information bar
				div.add(canvas.div); //the main canvas
				div.add(video.div); //video element
				div.add(vBInfo.div); //video information bar
				div.add(vBar.div); //video bar; main source of interaction
				vBar.add(vB_toggle.div); //play container
				vB_toggle.add(vB_play.div); //video play button (SVG data)
				vB_toggle.add(vB_pause.div);
				vB_pause.add(vBp_p[0].div);
				vB_pause.add(vBp_p[1].div);
				vBar.add(vb_t1.div);
				vBar.add(vB_cb.div);
				vBar.add(vb_t2.div);
				vBar.add(vb_vol.div);
				vB_cb.add(vB_cb_prog.div);
				vB_cb.add(vB_cb_hnd.div);
				vBInfo.add(vBI_tl.div);
				vBInfo.add(vBI_ms.div);
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
				vBInfo.attr({
					className: "osiris_vidInfoBar"
				});
				vBInfo.css({
					width: attrs.width+"px"
				});
				vB_toggle.attr({
					className: "ovB_pd"
				});
				vB_play.attr({
					className: "ovB_play",
					src:"data:image/png;base64,"+VIDEO_PLAY_IMG_DATA //svg data for image
				});
				vB_pause.attr({
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
				vB_cb.css({
					width: (parseInt(vBar.css("width"))-2*parseInt(vBar.css("padding-left"))-24*8)+"px"
				});
				vB_cb_prog.attr({
					className: "ovB_cb_prog"
				});
				vB_cb_hnd.attr({
					className: "ovB_cb_handle"
				});
				vb_t2.attr({
					className: "ovB_t1"
				});
				vBI_tl.attr({
					className: "ovIB_title"
				});
				vBI_tl.css({
					width: attrs.width-2*parseInt(vBI_tl.css("margin-left"))+"px"
				});
				vBI_ms.attr({
					className: "ovIB_misc"
				});
				vBI_ms.css({
					width: attrs.width-2*parseInt(vBI_ms.css("margin-left"))+"px"
				});
				vb_vol.attr({
					className: "ovB_vol",
					src: "data:image/png;base64,"+VIDEO_SOUND_MUTE_IMG_DATA //default
				});
				video.volume = 1; //highest value
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
					attrs.fileType = $_(nElem).attr("type");
					video.add(nElem);	
				}
				video = video.div;
				oDivs.t1 = vb_t1.div;
				oDivs.t2 = vb_t2.div;
				if (animFrame) animFrame(draw); //visual update
				else setInterval(draw, 1); //for Opera and other browsers
				setInterval(update, 5); //mechanical update
				vB_play.div.addEventListener("click", function() {video.play()}, true);
				vB_pause.div.addEventListener("click", function() {video.pause()}, true);
				if (attrs.strPlay) {
					vB_play.css("display", "none"); //make play button hidden by default
					video.play();
				} else { 
					vB_pause.css("display", "none");
					vB_play.css("display", "block");
				}
				//events...
				vB_cb.mousedown(function(event) { //dragging video
					var oOff_x = (event.clientX || event.pageX)-vB_cb.offset().x;
						oOff_x = oOff_x > vB_cb.offsetWidth() ? vB_cb.offsetWidth() : (oOff_x < 0 ? 0 : oOff_x);
					vB_cb_prog.css("width", oOff_x+"px");
					vB_cb_hnd.css("margin-left", oOff_x-7+"px");
					video.currentTime = ((vB_cb_prog.offsetWidth()-7)/(vB_cb.offsetWidth()-14) * video.duration);
					videoIsBeingSeeked = true;
					vBar.mousemove(function(event2) {
						var off_x = (event2.clientX || event2.pageX)-vB_cb.offset().x;
							off_x = off_x > vB_cb.offsetWidth() ? vB_cb.offsetWidth() : (off_x < 0 ? 0 : off_x);
						vB_cb_prog.css("width", off_x+"px");
						vB_cb_hnd.css("margin-left", off_x-7+"px");
						video.currentTime = ((vB_cb_prog.offsetWidth()-7)/(vB_cb.offsetWidth()-14) * video.duration);
						return false;
					});
					return false;
				});
				vBar.mouseup(function() {
					vBar.mousemove(null);
					videoIsBeingSeeked = false;
					return false;
				});
				vBI_tl.html(attrs.title);
				div.mousemove(function(event) {
					var off_y = event.clientY || event.pageY;
						off_y = off_y < 0 ? 0 : (off_y > attrs.height ? attrs.height : off_y);
					if (off_y < 200 && vBInfo.css("display") == "none")
						vBInfo.effects.fadeTo(100, 700);
					else if (vBInfo.css("opacity") == 1 && off_y >= 200)
						vBInfo.effects.fadeTo(0, 700);
				});
			}; // <-------------- end of initialization code -------------->
			function update() {
				oDivs.t1.innerHTML = tString(video.currentTime);
				oDivs.t2.innerHTML = tString(video.duration);
				if (video.paused && vB_play.css("display")=="none") {
					vB_play.effects.fadeTo(100, 200);
					vB_pause.effects.fadeTo(0, 200);
				} else if (!video.paused && vB_pause.css("display")=="none") {
					vB_play.effects.fadeTo(0, 200);
					vB_pause.effects.fadeTo(100, 200);
				}
				//change positions of seeker and current info, accordingly
				if (!videoIsBeingSeeked) {
					var pos = Math.round(video.currentTime/video.duration * (vB_cb.offsetWidth()-14));
					vB_cb_prog.css("width", 7+pos+"px");
					vB_cb_hnd.css("margin-left", pos+"px");
				}
				vBI_ms.html("Dimensions: "+video.videoWidth+"x"+video.videoHeight+"p"+" \
					&nbsp;&nbsp;&nbsp;&nbsp;Video Source: "+(video.currentSrc.length > 50 ? video.currentSrc.substr(0,17)+"..."+video.currentSrc.substr(video.currentSrc.length-30,30) : video.currentSrc)+" \
					&nbsp;&nbsp;&nbsp;&nbsp;Content Type: "+attrs.fileType);
			}
			function draw() { //draw on the canvas
				var cx = canvas.ctx("2d+");
				var width = canvas.attr("width");
				var height = canvas.attr("height");
				//refresh the canvas
				canvas.attr({
					width: width,
					height: height
				});
				cx.fillStyle = "rgb(0, 0, 0)";
				cx.strokeStyle = "rgb(0, 0, 0)";
				cx.clearRect(0, 0, width, height);
				if (!video.ended) {
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
				}
				if (animFrame) animFrame(draw);
			}
		})(elem);
	}
};
