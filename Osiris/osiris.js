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
		var VIDEO_PLAY_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABoAAAAgCAYAAAAMq2gFAAAABHNCSVQICAgIfAhkiAAAA+tJREFU\
SInFls9LY1cUx7/vR5MKKhjFNvF1LAhNi6RKKoU04maKTBHdGOOii+lGZtWdG/8HkZJNqyKKLmba\
KlRk0DDgoiDIIIpVRH2a2iGpqT8SbZLJS3zvni6S93iJGUettgcO920un/s953vvO8D/EFw+7yWE\
/FpeU1PjzWQyHBG9BsDuA8RzHPdef3//sCRJn25tbf3OGHsNIHPXII7n+ff7+vq+9fl8X7jd7ofx\
eLwiEon8yRhLA1DvDMRxXHV3d/c3dru9QpKkKo/H85nFYvlgf3//TFGUEwAXAOiuQI/tdnuFKIpc\
ZWWlxev1Nra3t38ViUSsx8fHyWw2e4aculsBDZDP53vscDgqBEEAz/MQBAHV1dVlbW1tbofD0biy\
snKYyWTOAaRvAzNAPT09Bsic5eXllubm5vrOzs5HmqY92Nvb+yubzSYBZG8CLFBUV1dngHieL0ib\
zVbm9Xob7Xb7J6FQSI3H45E8TLsRyO/3F4DMQH21Wq28y+V64Pf7HyUSCenw8FBJJpO6Wa68ewWg\
4h6ZV57nwXG5h8NqtQoej+djl8vVsrm5mY7FYqdElLxKnQHq7e0tqai4lMZGQRDq6+trurq6Htps\
tmZZluPJZPJv5MxySV1J0NsUAQARgYhgsVjEpqamD51Op/v09LT81atXB3mYem2QIAgQRdGAFUP0\
BMBJklTd0dHRWlVV5Y5Go1wsFosi94xpJUH66YuBOqgYQkRgjIExBgCc0+mUWlpaPj86Ono3HA5H\
GGMxAIzHNUMvm7l8pUIURb6hoaF2YGDgSWtr69cA3gEA8U0b8iUxvhlj5lIVqDMHY4w2NjYOA4HA\
D2tra78gd9cKQaVKomkaiAgcxxklKoYSES4uLpgsy8ejo6PTwWDwWTqd/g1AEnkHim+C6CCO4wyQ\
WVm+J2CMQVVVNjk5+ev09PSznZ2d50R0AkApKGkpkKm5AHJ9MYP0TKVS6sLCwvrY2Nj06urqj0QU\
Rc7al3tX3AddhRmkw8wHOTg4OBsZGXk+MzMzdn5+vklEMVzxMhgg80mL4brTiIjC4fD53Nzcy6Gh\
oe8SicRavkxv/QtfMoMO0hXo90dVVba8vPzH4ODg9+vr6y8URdlFrg/XGmQKFGmaVnBPeJ6Hoija\
7u5uNBAIPF1cXPw5k8lsAbjxpHTJDLqdAUBRFG14eDg4Ozv7UygUekFEp7jldFTKDJTNZtVgMLgy\
MTHxdHt7e5aIjlBk138DIgCQZflkampqdn5+fjyVSm0DOMMdDJRiHpKWZTmytLT0cnx8PJBOpzcB\
XGnX2wQHoKK2tvZLURQ/AlCGe5zBAYC/b8B/Ev8Abw6CEmPz9C4AAAAASUVORK5CYII=";
		var VIDEO_SOUND_MUTE_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAA3XAAAN1wFCKJt4AAAAB3RJTUUH3QQPBAYgpao8VQAABAZJREFUOMt9lE1IXFcUx//3vjsZp8OgbzCodKBkSIYUFVzYVRcuZLDLEvuVFEq7KV3YkkUQCwqFFEfSpIQqCC1YBMmUFhfpol00KaRuKk3URdKNMZs3ombU9ybz5r2ZuR+ni8yEMTE9cLgX7rm/c869/3sBAESE5tjqhUIBjuOgaUEQ/EJEp7a3t3kz5lh7HkREkFK2JopWKpVFz/MIAPb390+8DCgAwHVdFoahJaV8tsAYA2PMIiJTLpcXlVLvB0EAAKhWq7wZ8wLQdV3E43Fu2zYBaAdgNdYsANrzvHml1GgQBFWtdRsA1Ot1MMZARC9AhW3bKJfLb/i+P09EA8aYIwFKKfi+T8e11wprwoXW+jXXdW+Uy+VTQRBIIjLP7YsA4M2KACCdTlfHxsb48vKyAYDR0VHOGDMAIDzPe/fJkyenSqWSamw+tgoiYg1g4tKlS+9cvXp1cXh4WADA3NycGRsbu1AsFv8S9Xr9Q8/zIKW0XnbQrW0NDg5227a9MD4+bl25cuUnABgfH/8gkUj8EATBoKjVaq/6vg/OOeOc43+gZIzB3bt3N0dGRi709/ffyOVyDABSqdT3Gxsb5xYWFjbYvXv3wmKx2CaEgBDiGeyYA68SUdvQ0BAD8Mrly5fPDQ0N/QgAd+7c+WRqaiqfzWYhHMdRRIRIJAIhBCzLeqHC1gtpGI/H47bWugYA8XjcBsB3dnZIuK7rRKPR17XWFIlE2PNVNkGtSSYnJz9OJpPf3bp16z0AOHPmzM8TExPhzMzMopXNZt9ijGWMMSAiprVG05VS0FqDiGCMMVJKy/O8m+l0+ubm5ubotWvXfl9ZWdlMpVJr7e3tS+l0+g+rt7c32tHR8baUUmmtLaUUlFKQUqI5byRQRCRyudwXfX19f8/Nzf2azWbN6dOndT6f/zeTyaxsbW3dF2tra//09PTcj0QifVJKxTk3rS1zzi0hhCWEIMuyAEDOzs7+RkSMMaabGmWM/QkA4vDw0FtfX/+8v7//KyHEm4yxEy1iBuccnHMjhGDRaBQAMDU1FWeMBR0dHSiVSmCM0cWLF/Hw4UOIWCwWOo6ztbq6+tH29jZxzpkxhiWTSeE4jp6cnPzStu1PtdZovHMWhiHv7e1lDx48oFQqhUKhgOvXrz/9HMIwDADos2fPxjKZTIQ/VTeXUvKBgYFYPp//5vz58yaRSHymtQaA6MHBgejq6rL29vaoUCgc1VOpVJJdXV2B4zhevV4/2N/fL+7u7hZd1318eHi419nZWVtaWpoplUrfNoBcSimMMahUKiwWix0RLX/06JG5ffu2Wl9fr8disVp3d3f15MmTQRiGoTHGN8aUU6lUbXp6+mvf9+cB8EqloppyaiR5Zv8Bfo1nWKO+HwsAAAAASUVORK5CYII=";
		var VIDEO_SOUND_LOW_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAALASURBVDiNjZS/a+RGFMe/80MayxzGzTaXpAgcpDjSpE8ab3U45BqliwunyOH/wBBiL8SFCaQIXAguUpk05ggpksOcwa5S+E84DHbjNAKvtKORRjPjNynudjl7vb598EXSm6ePvu9pGMQYMaeypmlexBgfxxj5rLq5YXVd/1lVVYwxLtxXy3Ez2B3KtNZ/OOeeaq0BwOKekG+vHEAC4ME7OQAQZVk+DyE8rev6TUvvCQmA13X9WQjh9xjjx0T04N0C7z201nPBAEBaaz/03v91dXX10Dl3Z9G8MACQdV0/q6rqoTFm7hd3d3e/7vV6L9fX1/UU0Dn3xBgDay0YY2CM3QsbDAbpwsLCoG3bbwB8eXude+8/0lrDOTeR936mtra2HBF9BeCL/f39z6eAZVkujh3eBxoLADY3N18DeEVEn061fHZ2RpxzJEmCJEkghJgsvqf9JsYobyel1vq/JEkepWkKIoKUciZsnNvZ2flgeXn5CWPsxymgMeY8y7JHRIQYI4QQYIyBcz6BjJ9jjBgMBqlS6h/G2A9ra2uvp2ZYFMXfzjlYa2GMQdM0MMZM7pumgbV2MuPt7W3PGPt+Y2Pj17vmwPr9/uPV1dUXnPNPhBA3nAGAEAJCiMl89/b2kpOTk+s4Y9Ny59zo9PT0W2vtv9bacuymbVu0bTtx2TQN2rYFAJnnOWcz/pj03pvz8/OLi4uLtRhjQkRcSsmIiDPGRL/ff7a0tPRdCAFSSmitVZZlMc/zwBij2065UqohIh1CKIlomKbpkIhKIUQFQB8eHv4yHA5/67oOXddBKaUuLy9lURR3OuS9Xs+HENrFxUXDOR9VVTVSSlVt21Zd11VEpI+Ojn4ejUbPnXNgjMksy0RRFBxvzsubLR8cHBAAAnCd5zkDgLdfZ2maSqVU0FqH4+Pjn1ZWVnwI4VpKOfMU+R82zCutQLYbLgAAAABJRU5ErkJggg==";
		var VIDEO_SOUND_MED_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAMzSURBVDiNjVRNaCRFGH1VXd01PQyTRUwOEQUZTxERveWyl4RgPMSAjkFPWTy4kIMXLwExCZhDEPawZMFDMDmJMIh4iBgM5iIKOelJlMBeHC+TzHRP9W91TX0edqedWSZxP3h0d/XHq/de/YCI8JTwkyT5hoheJiJ+Xd9Tk0VR9G0YhkRElZt6OcaLTYCvlPpKa72qlAKADDeUePzkAFwAtZExAHCCIHhgjFmNouiRpf8pAYBHUfS6MeZLInrRWlsbbSiKAkqpiWRHR0eV9fX1McUsTdMX0jT9tdvtzmqtJ846SjY3N8cAYH9///16vX7H9/03ms3mYPifR1F0t9vtzsZxDK31RBRFUQIA9vb23vU87ycimnUcZ3dMYbvd/u3y8vLVLMvAGANj7MaMjo+PZaVS+b1Wq11MTU19XK1Wf/Z9/7Xl5eW/AYAXRfG8UupaRU9ia2tLW2vfAnAbwAyAluM475WWgyCoxnGMLMtuJBq1vLm5+ReAH621rwD4g4huDQnFxcWF5ZzDdV24rgvHcf7L42b7CREJAJcAGqVCpdQ/SZIgTVPkeT5me9LiAMDu7u5zAN5kjP0AYJVz/rBUGMfxQ9/3X7LWgojgOA4YY+CclyqH30SEnZ0dT0r5PWPsU865AjBPRHdKhZ1O51hrjSzLEMcxkiRBHMfle5IkyLKszHh7e7tgjH2S5/khEX3HGLu3tLQUDwkd13WjRqOxMBgMnh0MBjDGlAugtYYxBsYYEBGstbi6uvrs4ODgz5WVlXeklI21tbWPRoPlWuv++fn5B1mW/ZJlWTBUk6Yp0jQtVQ5zBiCazSbf2Nj4OgiCtwGMnUk2Pz//DACfMVYhItday4UQzFrLGWPO4uLi3Xq9/qEQAkIIHB4e3pqZmclqtZpptVqWnjjkXEqZWGuVMSaw1vY8z+tZawPHcUIA6uTk5H6v1/siz3PkeQ4ppWy326LT6UzcU3x6erowxqTVajXmnPfDMOxLKcM0TcM8z0NrrTo9Pb3X7/cfaK3BGBO+7zudTofj0X05VqLValkAFsCg2WwyAHg8O/M8T0gpjVLKnJ2dfb6wsFAYYwZCiGsvxn8BTyKSpXwbwZEAAAAASUVORK5CYII=";
		var VIDEO_SOUND_HIGH_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEwAACxMBAJqcGAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAN/SURBVDiNjVRLaGRFFD23XnW/vEYaI5MBo4LSwY3MLEQCycJNsppFJoy2Mi6E0YUDgaxcGPwkDQYMwghOZhc0GwdDMjRZqEMMxsWYRYYsXIlJIL1y0yb0S/X7VdWr6yJ0k2gS58Ch6hZ1D+feWxSYGU/III7jB8z8CjOL8+49sVi73a6HYcjM3HPRXYHToDMYKKXua63HlVIAkOICiBOrD+AZAJdP8NlWq3U/y7LxMAyhtf6PQL1e/3Btbe1yJ5YARLvdftVa+w0zv+Sce+pkgjEGSqnj/vwLi4uLPeVy+SoR3QXwNgDINE2fN8asHh4e9p/lAMCZYvPz8++Uy+VbQogqMz/e3Ny8Pjw8vCrb7fbtMAz7oyg6M/EszM3NvdXb2/sLM3/snPuIiG4CqG9vb/8qtdbXoihCmqYgIhDRhWK1Wq3Y09NTM8bslUqlGwAeWWvnATSKxeJ7whjzglIKWusujTHncnp6WjvnrgN4HceDW/Y87yaAOjO/LFqtVqnj8CKhDgFgampqB8DPzrkrAP5g5qfzPH9IRANyb2/PCSFQKBRQKBTgeV63vP8pP2ZmCeBvABXP8y4BeFEopf6K4xhJkiDLslNln2xD5wwAZmdnnwNwjYgeAhgXQuwT0RUAj2UURftBEAw458DM8DwPRAQhRNdlJ2Zm1Gq1ou/7PxLRZ0IIBWCImW8x811mfiCazeYPWmukaYooihDHMaIo6u7jOEaapt0ez8zMGCL6JMuyb5l5lYjuOOeuArhhjPnJKxQK7UqlMpLn+aU8z2Gt7Q5Aaw1rLay1YGY453BwcPD5wsLCn2NjY2/6vl8RQnwaBMGa7/tfDA4OPhJa66Otra330zTdTNO01XGTJAmSJOm67PQZgKxWq2JiYuL7Vqv1hud59wDsDQ0NfQ0A0hgT7e/vNxqNxrvMXHDOCSklOecEEXmjo6O3y+XyB9ZaSCmhlPKDIOBqtWonJyf1ysrK70T0HQAGAG9gYICNMblzzgDQxWIxy/M88zxPM7Pd3d3d7u/v96SUrzEzdnZ2vjo4OMiZOW80Gry0tPRbpVJRnbck+vr6jLU2KZVKkRDiKAzDI9/3wyRJwizLQuecWl9fv3N0dHRPaw0ikkEQeM1mU+D4vzwFuby87AA4AHm1WiUAaDabBICKxaL0fd8qpezGxsaXIyMjxlqbSynP/UX+AZdUwAHqlUHTAAAAAElFTkSuQmCC";
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
			var videoVolumeChanging = false;
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
				vb_vol_ctrl = $_(cElem("div")); //volume controller
				vb_vol = $_(cElem("img")); //volume image
				vb_vol_hnd = $_(cElem("div")); //volume handle
				vB_fs = $_(cElem("div")); //fullscreen large div
				vB_fss = $_(cElem("div")); //fullscreen small div
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
				vBar.add(vb_vol_ctrl.div);
				vBar.add(vB_fs.div);
				vB_cb.add(vB_cb_prog.div);
				vB_cb.add(vB_cb_hnd.div);
				vBInfo.add(vBI_tl.div);
				vBInfo.add(vBI_ms.div);
				vb_vol_ctrl.add(vb_vol_hnd.div);
				vB_fs.add(vB_fss.div);
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
					width: (parseInt(vBar.css("width"))-2*parseInt(vBar.css("padding-left"))-24*9)+"px"
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
					src: "data:image/png;base64,"+[VIDEO_SOUND_MUTE_IMG_DATA,
					VIDEO_SOUND_LOW_IMG_DATA,
					VIDEO_SOUND_MED_IMG_DATA,
					VIDEO_SOUND_HIGH_IMG_DATA][Math.ceil(video.volume*3)] //default
				});
				vb_vol_ctrl.attr({
					className: "ovB_vol_control"
				});
				vb_vol_hnd.attr({
					className: "ovB_vc_hnd"
				});
				vB_fs.attr({
					className: "ovB_fs"
				});
				vB_fss.attr({
					className: "ovB_fs_in"
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
						oOff_x = oOff_x > vB_cb.offsetWidth()-7 ? vB_cb.offsetWidth() : (oOff_x < 7 ? 7 : oOff_x);
					vB_cb_prog.css("width", oOff_x+"px");
					vB_cb_hnd.css("margin-left", oOff_x-7+"px");
					video.currentTime = ((vB_cb_prog.offsetWidth()-7)/(vB_cb.offsetWidth()-14) * video.duration);
					videoIsBeingSeeked = true;
					vBar.mousemove(function(event2) {
						var off_x = (event2.clientX || event2.pageX)-vB_cb.offset().x;
							off_x = off_x > vB_cb.offsetWidth()-7 ? vB_cb.offsetWidth()-7 : (off_x < 7 ? 7 : off_x);
						vB_cb_prog.css("width", off_x+"px");
						vB_cb_hnd.css("margin-left", off_x-7+"px");
						video.currentTime = ((vB_cb_prog.offsetWidth()-7)/(vB_cb.offsetWidth()-14) * video.duration);
						return false;
					});
					return false;
				});
				vb_vol_ctrl.mousedown(function(event) { //changing sound
					var oOff_x = (event.clientX || event.pageX)-vb_vol_ctrl.offset().x;
						oOff_x = oOff_x > vb_vol_ctrl.offsetWidth()-6 ? vb_vol_ctrl.offsetWidth()-6 : (oOff_x < 6 ? 6 : oOff_x);
					vb_vol_hnd.css("margin-left", oOff_x-6+"px");
					video.volume = (parseInt(vb_vol_hnd.css("margin-left"))-6)/(vb_vol_ctrl.offsetWidth()-12);
					videoVolumeChanging = true;
					vBar.mousemove(function(event2) {
						var off_x = (event2.clientX || event2.pageX)-vb_vol_ctrl.offset().x;
							off_x = off_x > vb_vol_ctrl.offsetWidth()-6 ? vb_vol_ctrl.offsetWidth()-6 : (off_x < 6 ? 6 : off_x);
						vb_vol_hnd.css("margin-left", off_x-6+"px");
						video.volume = (parseInt(vb_vol_hnd.css("margin-left"))-6)/(vb_vol_ctrl.offsetWidth()-12);
						return false;
					});
					return false;
				});
				vBar.mouseup(function() {
					vBar.mousemove(null);
					videoIsBeingSeeked = false;
					videoVolumeChanging = false;
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
				if (video.volume > 2/3)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_HIGH_IMG_DATA);
				else if (video.volume > 1/3)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_MED_IMG_DATA);
				else if (video.volume > 0)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_LOW_IMG_DATA);
				else if (video.volume == 0 || video.muted)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_MUTE_IMG_DATA);
				if (!videoVolumeChanging)
					vb_vol_hnd.css("margin-left", Math.round(video.volume*(vb_vol_ctrl.offsetWidth()-12))+"px");
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
			this.fullscreen = function() { //fullscreen the video
				
			};
		})(elem);
	}
};
