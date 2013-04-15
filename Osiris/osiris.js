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
		var VIDEO_SOUND_MUTE_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAASXSURB\
VEiJnZVNaFRXFMf/9306iclMqyF+LENQgi6SLLISBb/arprAOHQTKEMrXZZuS43ttlBpWlrpTqFR\
tFZMnZRkNLNwFUiXujBCBSEpL7bz5t25M+/de8/tIvOmGjJM7IHDu5x77/ndc88598EYgzdUZozZ\
L4S4YYwZM8a43fb8LwDn/Jcoiowx5rAxxuq2z8LuhQHYxzm/qrWeEkIAwF8AqNtGZweb1XK4HfBW\
rVb7kYimGo0GlFIAoHZzuhTCAPgAegHkANjb1vnVavUyEU0KIaCU2rrrXYrTAvRVq9VPAHwI4DAR\
7d2+UGuNer3+xoAU0lur1S5KKb8SQrhJkuzoxBgDoq7XvzNESjkcx/HnYRi6cRzv2pExBowxt3VQ\
wlZ+0s1Wy24BUE4YhgXOeX+9XofWGoxtz/nOQkQ4f/78/vHx8Z+ePXt2+ebNm48BxK1pv1AojAwN\
DV1aXV39yCGid6IoQpIkICIwxnYFIiJkMhnftu2h8fHxe77vT127du0xAExPT48cO3bsThRF1Uwm\
4ztJkgw2Gg1IKWHb/xVVNxAR4e7duxuc86nJyclfz549e8fzvA8A4OTJk3O1Wi1cXFycKpfLGw7n\
vEcIsdWZltUGdYO0ikOWy+Xnnufli8Xi7UKhcAMAarVaODc3ly+Xy88BSGtjYyPTaDQQxzGklEiS\
BEopSCmhlOqoWmuglfBSqbS+srJyKZvNDmaz2cGVlZVLpVJpHa1isIIg+EcIgWaz2QalgHT8qi1V\
KSWw1bResVg8MjExcWVzc/Pp5ubm04mJiSvFYvEIAA+AbXHO1+M4RpIkbd3uVGv9GjS1A/Dy+fzx\
0dHR22EYhrOzs4XZ2dlCGIbh6Ojo7Xw+fxyAZ587d+5dxtiRtNnSLxFBa93+puN0XkoJIvr56NGj\
940xtVKpNLWwsPDn2tra30mSLBw8ePD9bDY7PTg4eM8eGxvb19fX957WGsaYtsNXNY0mBaXg69ev\
fzk8PHy4Uql8+uDBg+etPlFra2uRlPL3AwcOvL28vPwbO3HixPELFy4sM8b2pdVl2/Zr/ZKO03nL\
smBZFp48eWLPzMwY0+Uxc7TW4sWLF18cOnToitbaVUq1nTLG0ufjNYDrumCMYX5+3p6ZmdGtdR1B\
ljGmWalUltbX1z9LkuQPKWU1LeVU4zhGHMdISz1tXgDu/Py8vRVs58ZyADQcxzGPHj26b4xZVErZ\
tm1bxhhGRMx1XaaUss+cOXMxl8t9TESwbTvNi5fL5ejUqVOmUqnojpEkSdKs1+uCMRYBiIgoAhAZ\
YyLXdbmUUgBoLC0tfV+tVq9KKduR9fT0eACcIAisfD5vdYrGAiBzuVwzk8kIpRTv7e2NjDEREUWM\
sYiIIs/zuGVZYmlp6dswDH9IK44x5gBwBgYGrCAIOl6Xtbq6qgcGBuTLly8Tznkzk8k0fN8Xtm0L\
IUTd87y6lLKulOKMMVEul7/hnH/XKmemlGJxHKeAHXPjADC3bt0yAAwAjIyMsL17t/6+QRCwIAis\
/v5+RUR6z549WinlPXz48OvTp09LIlK+75vWO9ZR/gXCcsF0W4w5AgAAAABJRU5ErkJggg==";
		var VIDEO_SOUND_LOW_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAOwSURB\
VEiJnZU9bCNVEMf/83bXju0QORwOUa6miUAI+kiRkoKWk5Jrg0AEOiQow9kILhUSHwLBFUgpkSIq\
i+YcBRdpQ0ORhgYpknNaRdje57fe9zUUji0utz4nN9Jopd157/fm/2Zmwcy4pRMzv6KU+pWZ32bm\
aNaaFwJIKX9LkoSZ+S4zi1nrBG5uBOCOlPKRc+6eUgoAngDwsxaGOe/E1YbXAYv9fv9n7/29NE1h\
rQUAe5PTjSEEoAigAqAKILgWV+x2u194799VSsFaO9L6hhZeAV7qdrsfA3gPwF3v/fz1QOccBoPB\
rQFjSKXf7+8aY75USkVa69xNmBnez5Q/H2KMeS3Lsr1erxdlWfbCGz0X0uv17kspFwaDAZxzILp+\
58+3hw8fflIul1/v9/sf1ev13EIIvffvJEkCrTW89yCiW4GYeQnA+8vLy38B+C4vRmitX03TFGOp\
nHOw1sI5N9MBwDm3B6AJ4MHBwUE1FyKlLCuloLVGlmWw1t7YAaBer3tm/gzAy0KIt3Lluri4KKVp\
CiJCGIZwzkGI0SC4qWxJkvxdqVSGeLa/RpA4jv8loqUgCBBFEcIwhBAiFzANuri4uApgbtohQill\
p1AoLIVhOOmFIAieKgAieqp3rsO893sAnnjvT3IhaZr+w8xvji8ziiIEQZArWV7l7e/vf14qle4D\
+GBnZ2eYBxGdTuextRZZliHLMqRpOvHhcDjx8XetNYwxsNaCiIiZEwBf7e7u/jJNLlpbW3tje3v7\
DyK6I4RAEAS5chERxt+FEBBC4OzsLGg0GswzhlnonFPn5+cPVlZWvnXORVcnnDgzPwOIoghEhGaz\
GTQaDXcVNxUkmHnYbrdbnU7nU631n8aYrjEGWuuJ/1/K8dMYAwBRs9kMRslOr/cQQBqGIZ+cnPzO\
zI+ttUEQBIKZyXtPURSRtTbY3NzcrVarH46r72o6FKrVql9fX+d2u+2mZqK1Hg4GA0VECYDEe58A\
SJg5iaJIGmMUgLTVav3Y7XYfGWMmmZXL5QJGvSa2trbEtGwEAFOtVoelUklZa2WlUkmYOfHeJ0SU\
eO+TQqEghRCq1Wp93+v1fhrPNyIKAYS1Wk3EcTxVLnF6eupqtZq5vLzUUsphqVRKi8WiCoJAKaUG\
hUJhYIwZWGslEamjo6NvpJQ/OOfgvSdrLWVZNgbk3k0IgA8PDxkAA8Dq6irNz4/+vnEcUxzHYmFh\
wXrv3dzcnLPWFo6Pj7/e2Ngw3ntbLBZ5PJGn2X8dFwwQ8Yn9CAAAAABJRU5ErkJggg==";
		var VIDEO_SOUND_MED_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAQ/SURB\
VEiJnVVNaFxVFP7OfT+Tea8JE2OqkJ2ilBAouiu4SGkXXVTQprG7olgs0oUuXMY0/rQrQbG1pm7c\
iTi4CkJpSsgiBTdxI5Us3IiFpAylM3l37vu79xwXmRmSSdKkHjibd8+93z3f/c73ICJ4xiQRed4Y\
87OIvC4iwUF7/heA1vrXJElERMZERB20T+HwQQBGtNa3nXPnjDEA8AgAH7TR3+Ob6hzYDzC8ubk5\
z8zn0jSFtRYA7GFu1wUhABUAMYAaAK+vrtJsNj9j5reNMbDWbnF9yPA7AIPNZvNDAO8BGGPmI/2F\
zjm02+1nBuiCxJubm5fLsvzCGBMURbHnISIC5v3pn5+fn4uiaP3ixYu3+9dUWZav5Hk+02q1Aq01\
sixDnue7sigKWGt3ZF+MEdGNer3+xq5OWq3WBa31ULvdhnMORP1v/vS4du3ax1EUTTjnPorj+LhS\
6pd6vf7y9PR02gNh5jNJkqAoCjAziOiZgETkKID3BwcH/7TWThHRH1EUXQJwo0dXURQvpGmKPM/B\
zHDOwVoL59yBCQDOuRkACwBmiSgB8AMRXdl+EaW1jowxKIoCeZ7v4v1pCQBXr15lEfkEwHNKqdcA\
PADw6v379wd7dG1sbFTTNAURwfd9OOeg1JYRHJa2JEn+juM4A+A55/4CQM65FwEkAOA3Go0nRHTU\
8zwEQQDf96GU2hNgP9Dh4eFxAAOdmhoAYeZ/e51ordfDMDzq+35vFjzP2yEAItoxO/1gzDwD4BEz\
rxDRTSK6Ozk5mfVA0jT9R0SOdx8zCAJ4nrcnZXsp7/r1659Wq9ULAC7FcewDOO+ce2t7jVpfX79r\
re0NXZqmvcyyrJfbh7IsS1hrQUQkIgmALzc2Nn7MsuwnAGtnz55d3g7iiUh27Nixd5g5cs6BmcHM\
PQV1D+zKursuIpiYmPh8dnb29zt37iytra19E4bh+SAI3hwfH2/s6MQ5Zx4+fDjrnCvLstzVjTEG\
xpheZ2ma9uS+sLDgzc3NEW1x+ATAlampqQf9wqATJ06MMXN08uTJMyMjI+8qpV7qKGTHg3cV5/s+\
ukq8detWDKBcXV11AET2sWcfQOr7vqysrPwmInettZ7neUpEiJkpCAKy1nqnT5++XKvVPuiqr+MO\
Ya1W48nJSVleXnZ7AQBbtpK1223TsYSEmRMAiYgkQRDosiwNgHRxcfG7ZrN5u0tpnueIoijE1qyp\
6elpRfsMkgJQ1mq1rFqtGmutjuM4EZGEmRMiSpg5CcNQK6XM4uLit61W6/uuvxGRD8AfHR1VjUZj\
X3tQq6urbnR0tHz8+HGhtc6q1WpaqVSM53nGGNMOw7BdlmXbWquJyNy7d+9rrfXNjtLIWkt5nncB\
aK9ufABSr9cFgADA+Pg4HTmy9fdtNBrUaDTU0NCQZWY3MDDgrLXh0tLSV6dOnSqZ2VYqFek68n7x\
H52DfZNJ68iaAAAAAElFTkSuQmCC";
		var VIDEO_SOUND_HIGH_IMG_DATA = "iVBORw0KGgoAAAANSUhEUgAAABkAAAAZCAYAAADE6YVjAAAABHNCSVQICAgIfAhkiAAAAAlwSFlz\
AAAN1wAADdcBQiibeAAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAATVSURB\
VEiJnVVdaBxVFP7OnZndZGcTNsZUIW8VpU0j0hb62m2TgoX4YG0tgg+KYokFFRTFWtNETCmoKKI0\
+qCgWMQ0IAahNCXsQ1oKkiJIS/AH2lpIylKazczO773n+JDM0qZpk/rBYYYz95xv7nfOPRcigvs0\
EpEHgyD4UUS2iIizWsz/IvB9f8zzPBGRThFRq8UprB0EoN33/a+MMXuCIACA6wB4tUB7BZ9aSric\
oG1hYWGEmfeEYQitNQDotfxdRkIA8gBcACUA1rJ1+fn5+SFmfjoIAmitF7VeASdPnhx0Xffq7t27\
v7mVhAC0zM/P9wN4EUAnMxeXBxtjUK/X70kAAES0XkTeqVQqF8rl8u8AQCJSXFhY6I/jeDgIAidJ\
khWTiAiYb5d/48aNDVlHRkYGC4XCbKlUOmFZ1oVisaiKxeLjW7duDew0TR+N4/hwrVZz4ji+I9F9\
oJOIDsVxfNF13edE5BwzvwbgmF2r1fb7vt9ar9dhjAHR8prfG8PDw28UCoVuY8zrrus+oZT6qV6v\
P+K67kci8vb09PRxm5mf9DwPSZKAmUFE90UkIusAvNTS0vKH1voZIrpQKBRe1lr/AOBQLpfbo5Ik\
eSgMQ2RSGWOgtYYxZlUDAGPMYQDjAAaIyAPwNREd7OnpuQTgL6VUr/J9vxAEAZIkQRzH0Fqv2QDg\
yJEjLCJvAXhAKbUZwEUAj509e7YFwM8issWem5trDsMQRATbtmGMgVKLg2Ctsnme97fruhEAyxhz\
CQAZYx52HOdPAAW7Wq3eJKJ1lmXBcRzYtg2l1IoEdyNta2vrAtC0tKYEQJj53yVfqHzfn43jGEmS\
NCxNU6Rp2pAlq9NyfwZmPgzgOjNPEdHzRHS6XC5HADYD+EWFYXgljmPEcYwoipC9ZzW69ZkRZGQA\
cPTo0fdFZD+A91zXtQHsNcYcGxoaUgD6iGhUzc7OntZaN5KHYdiwKIoadit5RkZEJCIegA/n5ua+\
jaLoBICZvr6+yvbt298FEGzatOk3S0SiDRs2PMvMBWMMmBnM3JBkuWzZdxFBd3f3BwMDA+dPnTo1\
OTMz81kul9vrOM5Tly9fXu84zneO4xzr7Ow8p4wxwbVr1waMMWmapnfsJggCBEHQ2FkYhg0Jx8fH\
rcHBQaLFjrgJ4KDjOFcBnABwftu2bZ8AgC0iUaVSmdixY8eb7e3tLyil1i91CIioMSyzjrNtG1pr\
OI4DAM74+DgAmP7+/iERkbGxse9t225n5p1YutBsAKFt2zI1NfWriJzWWluWZSkRIWYmx3FIa231\
9vYeKJVKrzAzLMvKpkOuVCpxuVyWSqViAEBE/gHw6s6dO69k3WcnSRIZY7ilpSUVEYeZGySO46g0\
TS0isicmJr7ctWuXtLa2HsjqUygUcgB0tVrlffv2CRGxiAwuP0cKQFoqlaLm5uZAa+27ruuJiMfM\
HhF5zOzlcjlfKRVMTEx8XqvVjmfnhohsAHZHR4eqVqt3HQ9qenradHR0pDdu3Eh834+am5vDfD4f\
WJYVBEFQz+Vy9TRN61prn4iCM2fOfOr7/hdLnUZaa4rjOCPImuA22ABkdHRUAAgAdHV1UbG4ePtW\
q1WqVquqtbVVM7NpamoyWuvc5OTkxz09PSkz63w+L9lEvhv+A2C37kOrrtYjAAAAAElFTkSuQmCC";
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
				vb_vol_ctrl = $_(cElem("div")); //volume controller
				vb_vol = $_(cElem("img")); //volume image
				vb_vol_hnd = $_(cElem("div")); //volume handle
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
				vB_cb.add(vB_cb_prog.div);
				vB_cb.add(vB_cb_hnd.div);
				vBInfo.add(vBI_tl.div);
				vBInfo.add(vBI_ms.div);
				vb_vol_ctrl.add(vb_vol_hnd.div);
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
						oOff_x = oOff_x > vb_vol_ctrl.offsetWidth()-6 ? vb_vol_ctrl.offsetWidth()-6 : (oOff_x < 6 ? 0 : oOff_x);
					vb_vol_hnd.css("margin-left", oOff_x-6+"px");
					video.volume = parseInt(vb_vol_hnd.css("margin-left"))/(vb_vol_ctrl.offsetWidth()-6);
					vBar.mousemove(function(event2) {
						var off_x = (event2.clientX || event2.pageX)-vb_vol_ctrl.offset().x;
							off_x = off_x > vb_vol_ctrl.offsetWidth()-6 ? vb_vol_ctrl.offsetWidth()-6 : (off_x < 6 ? 6 : off_x);
						vb_vol_hnd.css("margin-left", off_x-6+"px");
						video.volume = parseInt(vb_vol_hnd.css("margin-left"))/(vb_vol_ctrl.offsetWidth()-6);
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
				if (video.volume > 2/3)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_HIGH_IMG_DATA);
				else if (video.volume > 1/3)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_MED_IMG_DATA);
				else if (video.volume > 0)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_LOW_IMG_DATA);
				else if (video.volume == 0 || video.muted)
					vb_vol.attr("src", "data:image/png;base64,"+VIDEO_SOUND_MUTE_IMG_DATA);
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
