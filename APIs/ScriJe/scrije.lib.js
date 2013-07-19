/***************************************************
 * ScriJe
 * Description:   A library of useful Javascript
 * functions intended to ease coding. It's form is 
 * somewhat similar to PHP.
 * %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%
 * Copyright 2010 Bumbuu
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

function $get(div){
	var d = document.getElementById(div);
	return d;
}

function $_(div){
	function divFunction(divID){
		if (typeof(divID) == "object" && ("style" in divID || "setInterval" in divID || "documentElement" in divID || "body" in divID)){
			var d = divID;
		} else if (typeof divID == "string"){
			var eachGroup = divID;
			eachGroup = eachGroup.replace(/^[\s\>]+/, "");
			eachGroup = eachGroup.replace(/([\s]?)[\,]([\s]?)/g, " , ");
			eachGroup = eachGroup.split(" , ");
			var sObjs = [];
			var curGroup = 0;
			for (var z=0; z<eachGroup.length; z++){
				sObjs.push([]); //create a new array
				eachGroup[z] = eachGroup[z].replace(/^[\s\>]+/, "");
				eachGroup[z] = eachGroup[z].replace(/([\s]?)[\>]([\s]?)/g, " > "); //split up the child notifiers accurately
				var eachObj = eachGroup[z].split(" ");
				for (var a=0; a<eachObj.length; a++){
					var ssObjs = sObjs[z];
					if (a == 0){
						var nObj = (eachObj[a] != ">" ? (/^[A-z]*\#/.test(eachObj[a]) ? document.getElementById(eachObj[a].replace(/^[A-z]*\#/, "")) : (/^[A-z]*\./.test(eachObj[a]) ? document.getElementsByClassName(eachObj[a].replace(/^[A-z]*\./, "")) : document.getElementsByTagName(eachObj[a]))) : ">");
						var tag = eachObj[a].match(/^(([A-z]+[^\#\.])?)/)[0];
						if ("length" in nObj && nObj.length > 0 && tag != ""){
							for (var b=0; b<nObj.length; b++){
								if (nObj[b].tagName.toLowerCase() != tag.toLowerCase())
									nObj.splice(b, 1); //remove the invalid element
								if (nObj.length == 0) break; //cancel if there are no valid elements
							}
						} else if (tag != ""){
							if (nObj.tagName.toLowerCase() != tag.toLowerCase()) break; //the element is invalid, so cancel
						}
						sObjs[z].push(("length" in nObj && nObj.length == 1 && !("tagName" in nObj)) ? nObj[0] : nObj);
					} else if (eachObj[a] != ">"){ //only gather data if the current object is not a child notifier and has a parent
						if (ssObjs[(a-1)] == ">"){
							if ("length" in ssObjs[(a-2)]){
								var cur = ssObjs[(a-2)];
								for (var k=0; k<cur.length; k++){
									for (var j=0; j<cur[k].childNodes.length; j++){
										var fChild = cur[k].childNodes[j];
										if (fChild.nodeType == 1){
											var gChild = (/^[A-z]*\#/.test(eachObj[a]) ? (fChild.id == eachObj[a].replace(/^[A-z]*\#/, "") ? fChild : false) : (/^[A-z]*\./.test(eachObj[a]) ? (fChild.className == eachObj[a].replace(/^[A-z]*\./, "") ? fChild : false) : (/^[A-z]/i.test(eachObj[a]) ? (fChild.tagName.toLowerCase() == eachObj[a].replace(/^[A-z]*\./, "").toLowerCase() ? fChild : false) : false)));
											var tag = eachObj[a].match(/^(([A-z]+[^\#\.])?)/)[0];
											if (!gChild) continue;
											if ("length" in gChild && gChild.length > 0 && tag != ""){
												for (var b=0; b<gChild.length; b++){
													if (gChild[b].tagName.toLowerCase() != tag.toLowerCase())
														gChild.splice(b, 1); //remove the invalid element
													if (gChild.length == 0) break; //cancel if there are no valid elements
												}
											} else if (tag != ""){
												if (gChild.tagName.toLowerCase() != tag.toLowerCase()) break; //the element is invalid, so cancel
											}
											if (gChild) sObjs[z].push(gChild);
										}
									}
								}
								ssObjs[(a-2)] = null; //get rid of the old reference, since it is now obsolete
							} else if ("childNodes" in ssObjs[(a-2)] && ssObjs[(a-2)].childNodes.length > 0){
								for (var j=0; j<ssObjs[(a-2)].childNodes.length; j++){
									var fChild = ssObjs[(a-2)].childNodes[j];
									if (fChild.nodeType == 1){
										var gChild = (/^[A-z]*\#/.test(eachObj[a]) ? (fChild.id == eachObj[a].replace(/^[A-z]*\#/, "") ? fChild : false) : (/^[A-z]*\./.test(eachObj[a]) ? (fChild.className == eachObj[a].replace(/^[A-z]*\./, "") ? fChild : false) : (/^[A-z]/i.test(eachObj[a]) ? (fChild.tagName.toLowerCase() == eachObj[a].replace(/^[A-z]*\./, "").toLowerCase() ? fChild : false) : false)));
										var tag = eachObj[a].match(/^(([A-z]+[^\#\.])?)/)[0];
										if (!gChild) continue;
										if ("length" in gChild && gChild.length > 0 && tag != ""){
											for (var b=0; b<gChild.length; b++){
												if (gChild[b].tagName.toLowerCase() != tag.toLowerCase())
													gChild.splice(b, 1); //remove the invalid element
												if (gChild.length == 0) break; //cancel if there are no valid elements
											}
										} else if (tag != ""){
											if (gChild.tagName.toLowerCase() != tag.toLowerCase()) break; //the element is invalid, so cancel
										}
										if (gChild) sObjs[z].push(gChild);
									}
								}
								ssObjs[(a-2)] = null; //get rid of the old reference, since it is now obsolete
							} else return;
						} else if ("length" in ssObjs[(a-1)]){
							var cur = ssObjs[(a-1)];
							for (var j=0; j<cur.length; j++){
								var curElem = cur[j];
								var curElems = curElem.getElementsByTagName("*"); //get all HTML subelements
								for (var k=0; k<curElems.length; k++){
									var fChild = curElems[k];
									var gChild = (/^[A-z]*\#/.test(eachObj[a]) ? (fChild.id == eachObj[a].replace(/^[A-z]*\#/, "") ? fChild : false) : (/^[A-z]*\./.test(eachObj[a]) ? (fChild.className == eachObj[a].replace(/^[A-z]*\./, "") ? fChild : false) : (/^[A-z]/i.test(eachObj[a]) ? (fChild.tagName.toLowerCase() == eachObj[a].replace(/^[A-z]*\./, "").toLowerCase() ? fChild : false) : false)));
									var tag = eachObj[a].match(/^(([A-z]+[^\#\.])?)/)[0];
									if (!gChild) continue;
									if (tag != ""){
										if (gChild.tagName.toLowerCase() != tag.toLowerCase()) break; //the element is invalid, so cancel
									}
									if (gChild) sObjs[z].push(gChild);
								}
							}
							ssObjs[(a-1)] = null; //get rid of the old reference, since it is now obsolete
						} else {
							var curElems = ssObjs[(a-1)].getElementsByTagName("*"); //get all HTML subelements
							for (var j=0; j<curElems.length; j++){
								var fChild = curElems[j];
								var gChild = (/^[A-z]*\#/.test(eachObj[a]) ? (fChild.id == eachObj[a].replace(/^[A-z]*\#/, "") ? fChild : false) : (/^[A-z]*\./.test(eachObj[a]) ? (fChild.className == eachObj[a].replace(/^[A-z]*\./, "") ? fChild : false) : (/^[A-z]+/i.test(eachObj[a]) ? (fChild.tagName.toLowerCase() == eachObj[a].toLowerCase() ? fChild : false) : false)));
								var tag = eachObj[a].match(/^(([A-z]+[^\#\.])?)/)[0];
								if (!gChild) continue;
								if (tag != ""){
									if (gChild.tagName.toLowerCase() != tag.toLowerCase()) break; //the element is invalid, so cancel
								}
								if (gChild) sObjs[z].push(gChild);
								ssObjs[(a-1)] = null; //get rid of the old reference, since it is now obsolete
							}
						}
					} else sObjs[z].push(eachObj[a]);
				}
			}
			var newObjs = [];
			for (var i=0; i<sObjs.length; i++){
				for (var j=0; j<sObjs[i].length; j++){
					if (sObjs[i][j] != ">" && sObjs[i][j] != null) newObjs.push(sObjs[i][j]);
				}
			}
			var d = (newObjs.length == 1 ? newObjs[0] : newObjs);
		} else {
			return $_.newError({
				name: "$_",
				type: "IncompatibilityError",
				description: "The value "+divID+" of type "+(typeof divID)+" was not processed for some reason by Scrije."
			});
		}
			this.div = d;
			this.css = function(prop, val){
				if (typeof prop == "object"){
					for (var a in prop){
						editStyle(a, prop[a]);
					}
				} else if (!$_.isNull(prop) && typeof prop != "object" && !$_.isNull(val)) return editStyle(prop, val);
				  else if (!$_.isNull(prop) && typeof val == "undefined") return getStyle(prop);
				  else return false;
				function getStyle(property){
					var prop1 = $_.toJSCSSValue(property);
					var prop2 = $_.toCSSValue(property);
					if ($_.isArray(d)){
						var info = [];
						for (var i=0; i<d.length; i++){
							var getComputed = (function(){
								try{ 
									var c = document.defaultView.getComputedStyle(d[i],null).getPropertyValue(prop2); 
									return c;
								}
								catch (e){ return false; }
							})();
							var inf = (getComputed == false || getComputed == "" || typeof getComputed == "null") ? (("currentStyle" in d[i] && typeof d[i].currentStyle[prop1] != "undefined") ? d[i].currentStyle[prop1] : d[i].style[prop1]) : getComputed;
							info.push(inf);
						}
					} else {
						var getComputed = (function(){
							try{ 
								var c = document.defaultView.getComputedStyle(d,null).getPropertyValue(prop2); 
								return c;
							}
							catch (e){ return false; }
						})();
						var info = (getComputed == false || getComputed == "" || typeof getComputed == "null") ? (("currentStyle" in d && typeof d.currentStyle[prop1] != "undefined") ? d.currentStyle[prop1] : d.style[prop1]) : getComputed;
					}
					return info;
				}
				function editStyle(property, value){
					var prop1 = $_.toJSCSSValue(property);
					var prop2 = $_.toCSSValue(property);
					if ($_.browser().agent == 1){
						if ($_.isArray(d)){
							for (var i=0; i<d.length; i++){
								d[i].style.setAttribute(prop1, value);
							}
						} else {
							d.style.setAttribute(prop1, value);
							d.style[prop1] = value;
						}
					} else {
						if ($_.isArray(d)){
							for (var i=0; i<d.length; i++){
								d[i].style.setProperty(prop2, value, '');
							}
						} else
							d.style.setProperty(prop2, value, '');
					}
				}
			};
			this.deleteStyle = function(property){
				if ($_.browser().agent == 1){
					property = property.replace(/[a-z]\-([a-z])/g,
					function (w){
						return w.charAt(0) + w.charAt(2).toUpperCase();
					});
					property = property.replace(/\-/g, "");
				} else {
					property = property.replace(/([a-z][A-Z])/g, function(w){
						return w.charAt(0)+"-"+w.charAt(1);
					});
					property = property.toLowerCase();
					if (/^(webkit|khtml|moz|ms|o)/.test(property))
						property = "-"+property;
				}
				
				if ($_.browser().agent == 1){
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							d[i].style.removeAttribute(property);
						}
					} else
						d.style.removeAttribute(property);
				} else {
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							d[i].style.removeProperty(property);
						}
					} else
						d.style.removeProperty(property);
				}
			};
			this.newEvent = function(event, func, bool){
				if ($_.isNull(bool) == true)
					bool = false;
					if (window.addEventListener){
						if (/on/i.test(event))
							event = event.replace(/^on/, "");
						if ($_.isArray(d)){
							for (var i=0; i<d.length; i++){
								d[i].addEventListener(event, func, bool);
							}
						} else
							d.addEventListener(event, func, bool);
					} else if (window.attachEvent){
						if (!/^(on)/i.test(event))
							event = "on"+event;
						if ($_.isArray(d)){
							for (var i=0; i<d.length; i++){
								d[i].attachEvent(event, func, bool);
							}
						} else
							d.attachEvent(event, func, bool);
					} else {
						$_.newError({
							"description": "No event attachment supported",
							"type": "CompatabilityError",
							"name": "$_.newEvent"
						});
						return false;
					}
			};
			this.deleteEvent = function(event){
				if (window.removeEventListener){
					if (/on/i.test(event))
						event = event.replace(/^on/, "");
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							d[i].removeEventListener(event);
						}
					} else
						d.removeEventListener(event);
				} else if (window.detachEvent){
					if (!/^(on)/i.test(event))
						event = "on"+event;
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							d[i].detachEvent(event);
						}
					} else
						d.detachEvent(event);
				} else {
					$_.newError({
						"description": "No event detachment supported.",
						"type": "CompatabilityError",
						"name": "$_.deleteEvent"
					});
					return false;
				}
			};
			this.attr = function(attr, val){
				if (typeof attr == "object"){
					for (var a in attr)
						editAttr(a, attr[a]);
					return true;
				} else if (typeof attr == "string" && typeof val == "undefined") return getAttr(attr);
				  else if (typeof attr == "string" && typeof val != "undefined") return editAttr(attr, val);
				function getAttr(attr){
					if (document.body.getAttribute){
						if ($_.isArray(d)){
							var info = [];
							for (var i=0; i<d.length; i++){
								info[i] = d[i].getAttribute(attr);
								if (info[i] != d[i][attr] && attr in d[i]) info[i] = d[i][attr];
							}
						} else {
							var info = d.getAttribute(attr);
							if (info != d[attr] && attr in d) info = d[attr];
						}
					} else {
						$_.newError({
							"description": "No attribute retaining supported.",
							"type": "CompatabilityError",
							"name": "$_.getAttr"
						});
					}
					return info;
				}
				function editAttr(attr, property){
					if (document.body.setAttribute){
						if ($_.isArray(d)){
							for (var i=0; i<d.length; i++){
								d[i].setAttribute(attr, property);
								if (d[i][attr] != property && attr in d[i]) d[i][attr] = property;
							}
						} else {
							d.setAttribute(attr, property);
							if (d[attr] != property && attr in d) d[attr] = property;
						}
					} else {
						$_.newError({
							"description": "No attribute editing supported.",
							"type": "CompatabilityError",
							"name": "$_.editAttr"
						});
					}
				}
			};
			this.deleteAttr = function(attr){
				if (document.body.removeAttribute){
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							d[i].removeAttribute(attr)
						}
					} else d.removeAttribute(attr);
				} else {
					$_.newError({
						"description": "No attribute removement supported.",
						"type": "CompatabilityError",
						"name": "$_.deleteAttr"
					});
					return false;
				}
			};
			this.ctx = function(context){
				if ($_.isNull(context)) return false;
				if ($_.isArray(d)){
					var arr = [];
					for (var i=0; i<d.length; i++)
						arr[i] = d[i].getContext(context);
					return arr;
				} else {
					if (context == "2d+"){
						var ctx1 = d.getContext("2d");
						ctx1.drawRoundedRect = function(x, y, w, h, r, lw){
							if (typeof lw == "undefined") ctx1.lineWidth = 1;
							else ctx1.lineWidth = lw;
							if (h > w && r > w) r = w/2;
							else if (h < w && r > h) r = h/2;
							else if (h == w && (r > h || r > w)) r = h/2;
							ctx1.beginPath();
							ctx1.moveTo(x+r, y);
							ctx1.lineTo(x+w-r, y);

							ctx1.quadraticCurveTo(x+w, y, x+w, y+r);
							ctx1.lineTo(x+w, y+h-r);
							ctx1.quadraticCurveTo(x+w, y+h, x+w-r, y+h);
							ctx1.lineTo(x+r, y+h);
							ctx1.quadraticCurveTo(x, y+h, x, y+h-r);
							ctx1.lineTo(x, y+r);
							ctx1.quadraticCurveTo(x, y, x+r, y);
							ctx1.stroke();
							ctx1.closePath();
						};
						ctx1.fillRoundedRect = function(x, y, w, h, r){
							ctx1.drawRoundedRect(x, y, w, h, r);
							ctx1.fill(); 
						};
					} else var ctx1 = d.getContext(context);
					return ctx1;
				}
			};
			this.destroy = function(){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++){
						if ($_.browser().agent == 1){
							d[i].removeNode(true);
						} else {
							if (d[i].parentNode)
								d[i].parentNode.removeChild(d[i]);
						}
					}
				} else {
					if ($_.browser().agent == 1){
						d.removeNode(true);
					} else {
						if (d.parentNode)
							d.parentNode.removeChild(d);
					}
				}
			};
			this.insertInside = function(strVal, endVal){
				if ($_.isNull(strVal)) return false;
				if ($_.isNull(endVal)) endVal = "";
				if (document.selection){
					var range = document.selection.createRange();
					var oldRange = range.duplicate();
					try{
						oldRange.moveToElementText(d);
					} catch (e){ return false;}
					oldRange.setEndPoint("EndToEnd", range);
					var val = d.value;
					var beforeVal = "";
					for (var i=0; i<d.selectionStart; i++){
						beforeVal += val.charAt(i);
					}
					var afterVal = "";
					for (var i=0; i<val.length; i++){
						if (i >= d.selectionEnd){
							afterVal += val.charAt(i);
						}
					}
					d.value = beforeVal+strVal+range.text+endVal+afterVal;
				} else if (document.getSelection){
					d.focus();
					if ($_.isNull(d.selectionStart)) return false;
					if ($_.browser().agent != 5){
						var sel = document.getSelection();
						var text = sel.toString();
					} else {
						var inner = d.value.toString();
						var text = $_.trimToLength(inner, d.selectionEnd);
						text = text.substr(d.selectionStart);
					}
					var val = d.value;
					var beforeVal = "";
					for (var i=0; i<d.selectionStart; i++){
						beforeVal += val.charAt(i);
					}
					var afterVal = "";
					for (var j=0; j<val.length; j++){
						if (j >= d.selectionEnd){
							afterVal += val.charAt(j);
						}
					}
					d.value = beforeVal+strVal+text+endVal+afterVal;
				}
			};
			
			if (!$_.isArray(d)){
				this.close = function(){
					d.close();
				};
			}
			this.click = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onclick = func;
				} else d.onclick = func;
			};
			this.mouseover = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onmouseover = func;
				} else d.onmouseover = func;
			};
			this.mousedown = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onmousedown = func;
				} else d.onmousedown = func;
			};
			this.mouseup = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onmouseup = func;
				} else d.onmouseup = func;
			};
			this.mousemove = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onmousemove = func;
				} else d.onmousemove = func;
			};
			this.mouseout = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onmouseout = func;
				} else d.onmouseout = func;
			};
			this.focus = function(func){
				if (!func && !$_.isArray(d)){
					d.focus();
				} else {
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++)
							d[i].onfocus = func;
					} else d.onfocus = func;
				}
			};
			this.blur = function(func){
				if (!func && !$_.isArray(d)){
					d.blur();
				} else {
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++)
							d[i].onblur = func;
					} else d.onblur = func;
				}
			};
			this.dblclick = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].ondblclick = func;
				} else d.ondblclick = func;
			};
			this.change = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onchange = func;
				} else d.onchange = func;
			};
			this.keyup = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onkeyup = func;
				} else d.onkeyup = func;
			};
			this.keydown = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onkeydown = func;
				} else d.onkeydown = func;
			};
			this.keypress = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onkeypress = func;
				} else d.onkeypress = func;
			};
			this.keyCode = function(func){
				function keyFunc(event){
					var keyCodeList = {
						18: "alt",
						37: "left",
						38: "up",
						39: "right",
						40: "down",
						8: "backspace",
						20: "caps lock",
						17: "ctrl",
						46: "delete",
						35: "end",
						13: "enter",
						27: "escape",
						112: "f1",
						113: "f2",
						114: "f3",
						115: "f4",
						116: "f5",
						117: "f6",
						118: "f7",
						119: "f8",
						120: "f9",
						121: "f10",
						122: "f11",
						123: "f12",
						36: "home",
						45: "insert",
						144: "num lock",
						33: "page up",
						34: "page down",
						16: "shift",
						9: "tab",
						91: "windows"
					};
					var alphabet = "abcdefghijklmnopqrstuvwxyz";
					var code = "";
					if (event.keyCode>=65 && event.keyCode<=90)
						code = alphabet.charAt(event.keyCode-65);
					else code = keyCodeList[event.keyCode];
					if (typeof code == "undefined") code = event.keyCode;
					func(code);
				}
				if (typeof d == "array"){
					for (var a=0; a<d.length; a++){
						//d[a].onkeypress = keyFunc;
						//d[a].onkeyup = keyFunc;
						d[a].onkeydown = keyFunc;
					}
				} else {
					//d.onkeypress = keyFunc;
					//d.onkeyup = keyFunc;
					d.onkeydown = keyFunc;
				}
			};
			this.load = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onload = func;
				} else d.onload = func;
			};
			this.unload = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onunload = func;
				} else d.onunload = func;
			};
			this.beforeunload = function(func){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++)
						d[i].onbeforeunload = func;
				} else d.onbeforeunload = func;
			};
			this.value = function(val){
				var arrTag = false;
				if ($_.isArray(d) && ("tagName" in d ? (d.tagName.toLowerCase() != "select") : true)){
					for (var i=0; i<d.length; i++){
						arrTag = (d[i].tagName.toLowerCase() != "select");
						if (arrTag == false) continue;
					}
				}
				if ($_.isNull(val) && typeof val != "string"){
					if ($_.isArray(d) && arrTag){
						var val = new Array();
						for (var i=0; i<d.length; i++)
							val[i] = d[i].value;
					} else var val = d.value;
					return val;
				} else {
					if ($_.isArray(d) && arrTag){
						for (var i=0; i<d.length; i++)
							d[i].value = val;
					} else d.value = val;
				}
			};
			this.html = function(val){
				if ($_.isNull(val) && typeof val != "string"){
					if ($_.isArray(d)){
						var val = new Array();
						for (var i=0; i<d.length; i++)
							val[i] = d[i].innerHTML;
					} else var val = d.innerHTML;
					return val;
				} else {
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++)
							d[i].innerHTML = val;
					} else d.innerHTML = val;
				}
			};
			this.offsetWidth = function(){
				if ($_.isArray(d)){
					var val = new Array();
					for (var i=0; i<d.length; i++)
						val[i] = d[i].offsetWidth;
				} else var val = d.offsetWidth;
				return val;
			};
			this.offsetHeight = function(){
				if ($_.isArray(d)){
					var val = new Array();
					for (var i=0; i<d.length; i++)
						val[i] = d[i].offsetHeight;
				} else var val = d.offsetHeight;
				return val;
			};
			this.offset = function(){
				var left = 0;
				var top = 0;
				if (d.offsetParent){
					var parent = d;
					do {
						left += parent.offsetLeft;
						top += parent.offsetTop;
					} while (parent = parent.offsetParent); 
				}
				return {
					x: left,
					y: top
				};
			};
			this.fromInlineToBlock = function(){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++){
						if ($_(d[i]).css("display") == "inline"){
							$_(d[i]).css("width", d[i].offsetWidth+"px");
							$_(d[i]).css("height", d[i].offsetHeight+"px");
							$_(d[i]).css("display", "block");
						}
					}
				} else {
					if ($_(d).css("display") == "inline"){
						$_(d).css("width", d.offsetWidth+"px");
						$_(d).css("height", d.offsetHeight+"px");
						$_(d).css("display", "block");
					}
				}
			};
			this.add = function(string){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++){
						if (typeof string == "string" || $_.isNull(string.style))
							d[i].innerHTML += string;
						else if (typeof string == "object" && !$_.isNull(string.style))
							d[i].appendChild(string);
					}
				} else {
					if (typeof string == "string" || $_.isNull(string.style))
						d.innerHTML += string;
					else if (typeof string == "object" && !$_.isNull(string.style))
						d.appendChild(string);
				}
			};
			this.addIn = function(string){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++){
						if (typeof string == "string" || $_.isNull(string.style))
							d[i].innerHTML = string+d[i].innerHTML;
						else if (typeof string == "object" && !$_.isNull(string.style)){
							var firstNode = !$_.isNull(d[i].childNodes[0]) ? d[i].childNodes[0] : false;
							if (firstNode == false)
								d[i].appendChild(string);
							else {
								d[i].insertBefore(string, firstNode);
							}
						}
					}
				} else {
					if (typeof string == "string" || $_.isNull(string.style))
						d.innerHTML = string+d.innerHTML;
					else if (typeof string == "object" && !$_.isNull(string.style)){
						var firstNode = !$_.isNull(d.childNodes[0]) ? d.childNodes[0] : false;
						if (firstNode == false)
							d.appendChild(string);
						else {
							d.insertBefore(string, firstNode);
						}
					}
				}
			};
			this.clear = function(){
				if ($_.isArray(d)){
					for (var i=0; i<d.length; i++){
						if (!$_.isNull(d[i].childNodes)){
							var loop = 0;
							for (var j in d[i].childNodes){
								if ($_.browser().agent == 2 && loop >= d.childNodes.length - 2)
									continue;
								if (!$_.isNull(d[i].childNodes[j].tagName)){
									$_(d[i].childNodes[j]).destroy();
								}
								loop++;
							}
						}
						if (d[i].innerHTML)
							d[i].innerHTML = "";
						if (d[i].value)
							d[i].value = "";
					}
				} else {
					if (!$_.isNull(d.childNodes)){
						var loop = 0;
						for (var j in d.childNodes){
							if ($_.browser().agent == 2 && loop >= d.childNodes.length - 2)
								continue;
							if (!$_.isNull(d.childNodes[j].tagName)){
								$_(d.childNodes[j]).destroy();
							}
							loop++;
						}
					}
					if (d.innerHTML)
						d.innerHTML = "";
					if (d.value)
						d.value = "";
				}
			};
			this.uniqueVal = function(){
				if ($_.isArray(d)){
					var allVals = new Array();
					for (var i=0; i<d.length; i++){
						var val = new String();
						if (d[i].parentNode) val += d[i].parentNode.nodeName;
						if (d[i].tagName) val += "_"+d[i].tagName;
						if (d[i].id) val += "_"+d[i].id;
						if (d[i].className) val += "_"+d[i].className;
						if (d[i].name) val += "_"+d[i].name;
						allVals.push(val);
					}
					return allVals;
				} else {
					var val = new String();
					if (d.parentNode) val += d.parentNode.nodeName;
					if (d.tagName) val += "_"+d.tagName;
					if (d.id) val += "_"+d.id;
					if (d.className) val += "_"+d.className;
					if (d.innerHTML) val += "_"+d.innerHTML.length;
					if (d.name) val += "_"+d.name;
					return val;
				}
			};
			this.effects = {
				fadeTo: function(opac, animLength, onDone){
					function mainFunc(div, divid){
						if ($_.isNull(onDone))
							onDone = function(){ return false;};
						function fdIn(op, origOp, startTime, aniLen){
							var elapsed = (new Date()).getTime() - startTime;
							var nextOp = 0;
							var curOp = div.style.opacity * 100;
							if (elapsed > aniLen || curOp >= op){
								div.style.display = "block";
								div.style.visibility = "visible";
								div.style.opacity = op/100;
								div.style.filter = "alpha(opacity="+op+")";
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "fdIn => onDone"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.fadeTimers[divid]);
								delete($_scjvar.effects.fadeTimers[divid]);
									if ($_.browser().agent == 1 && $_.browser().version <= 8 && op >= 100){
										$_(div).deleteStyle("opacity");
										$_(div).deleteStyle("filter");
									}
							} else {
								nextOp = origOp + Math.round((elapsed/aniLen) * (op - origOp));
								div.style.opacity = nextOp/100;
								div.style.filter = "alpha(opacity="+nextOp+")";
							}
						}
						function fdOut(op, origOp, startTime, aniLen){
							var elapsed = (new Date()).getTime() - startTime;
							var nextOp = 0;
							var curOp = div.style.opacity * 100;
							if (elapsed > aniLen || curOp <= op){
								if (op == 0){
									div.style.display = "none";
									div.style.visibility = "hidden";
									if ($_.browser().agent == 1 && $_.browser().version <= 8){
										$_(div).deleteStyle("opacity");
										$_(div).deleteStyle("filter");
									}
								}
								div.style.opacity = op/100;
								div.style.filter = "alpha(opacity="+op+")";
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "fdIn => onDone"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.fadeTimers[divid]);
								delete($_scjvar.effects.fadeTimers[divid]);
							} else {
								nextOp = origOp - Math.round((elapsed/aniLen) * (origOp - op));
								div.style.opacity = nextOp/100;
								div.style.filter = "alpha(opacity="+nextOp+")";
							}
						}
						if ($_scjvar.effects.fadeTimers[divid]){
							clearInterval($_scjvar.effects.fadeTimers[divid]);
							delete($_scjvar.effects.fadeTimers[divid]);
						}
						
						if ($_.isNull(animLength))
							animLength = $_scjvar.settings.effects.defaultLength;
						try{ opac = parseInt(opac); } catch (e) {return false;}
						if (opac < 1 && opac > 0) opac *= 100;
						var curOpac = typeof parseInt($_(div).css("opacity")) != "undefined" ? parseInt($_(div).css("opacity")) : 100;
						if ($_(div).css("display") == "none" || $_(div).css("visibility") == "hidden" || div.offsetHeight == 0 || div.offsetWidth == 0)
							curOpac = 0;
						else if ($_(div).css("opacity"))
							curOpac = $_(div).css("opacity") * 100;
						else if ($_(div).css("filter")){
							var fil = $_(div).css("filter");
							if (/alpha\(opacity\=(\d+)\)/i.test(fil)){
								fil = fil.replace(/alpha\(opacity\=(\d+)\)/i, "$1");
								try{ curOpac = parseInt(fil); } catch (e){}
							}	
						}
						div.style.opacity = curOpac/100;
						div.style.filter = "alpha(opacity="+curOpac+")";
						var strTime = (new Date()).getTime();
						if (div.style.display == "none" || div.style.visibility == "hidden" || opac > curOpac){
							$_scjvar.effects.fadeTimers[divid] = setInterval(function(){fdIn(opac, curOpac, strTime, animLength)}, $_scjvar.settings.effects.rate);
						} else if (div.style.display != "none" || div.style.visibility != "hidden" || opac < curOpac){
							$_scjvar.effects.fadeTimers[divid] = setInterval(function(){fdOut(opac, curOpac, strTime, animLength)}, $_scjvar.settings.effects.rate);
						}
						div.style.display = "block";
						div.style.visibility = "visible";
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				},
				toHeight: function(height, animLength, onDone){
					function mainFunc(div, divid){
						if ($_.isNull(onDone))
							onDone = function(){ return false;};
						if ($_scjvar.effects.expHeightTimers[divid]){
							clearInterval($_scjvar.effects.expHeightTimers[divid]);
							delete($_scjvar.effects.expHeightTimers[divid]);
							delete($_scjvar.effects.curHeight[divid]);
						}
						if (div.tagName.toLowerCase() != "canvas" && div.tagName.toLowerCase() != "video"){
							$_(div).fromInlineToBlock();
							if ($_(div).css("display") == "none" || $_(div).css("visibility") == "hidden" || $_(div).css("opacity") == 0 || $_(div).css("filter") == "alpha(opacity=0)"){
								$_(div).css({
									height: "0px",
									minHeight: "0px",
									maxHeight: "0px",
									display: "block",
									visibility: "visible"
								});
							}
						}
						var aniLen = animLength ? animLength : $_scjvar.settings.effects.defaultLength;
						function tOffset(){
							if (div.tagName.toLowerCase() == "canvas" && div.tagName.toLowerCase() != "video") return 0;
							var wastedSpace = 0;
							if ($_(div).css("height") && $_(div).css("height") != "auto"){
								wastedSpace = div.offsetHeight - parseInt($_(div).css("height"));
							} else if ($_(div).css("min-height") && $_(div).css("min-height") != "auto")
								wastedSpace = div.offsetHeight - parseInt($_(div).css("min-height"));
							else {
								wastedSpace += $_(div).css("padding-top") ? parseInt($_(div).css("padding-top")) : 0;
								wastedSpace += $_(div).css("padding-bottom") ? parseInt($_(div).css("padding-bottom")) : 0;
								if ($_(div).css("border-top-style") != "none" || $_(div).css("border-top-style") != "")
									wastedSpace += $_(div).css("border-top-width") ? parseInt($_(div).css("border-top-width")) : 0;
								if ($_(div).css("border-bottom-style") != "none" || $_(div).css("border-bottom-style") != "")
									wastedSpace += $_(div).css("border-bottom-width") ? parseInt($_(div).css("border-bottom-width")) : 0;
							}
							return wastedSpace;
						}
						var trueOffset = tOffset();
						if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
							var curHeight = div.height;
						else var curHeight = div.offsetHeight - trueOffset;
						if (typeof height == "undefined" || height == curHeight) return;
							height -= trueOffset;
						var strTime = (new Date()).getTime();
							$_scjvar.effects.curHeight[divid] = curHeight;
						var stepNumbers = Math.round(aniLen/$_scjvar.settings.effects.rate);
							
						height = Mathf.limit(height, 0);
						if (height < curHeight){
							div.style.maxHeight = curHeight+"px";
							div.style.minHeight = height+"px";
							$_scjvar.effects.expHeightTimers[divid] = setInterval(function(){
								conHt(height, curHeight, strTime, aniLen, stepNumbers);
							}, $_scjvar.settings.effects.rate);
						} else if (height > curHeight){
							div.style.minHeight = curHeight+"px";
							div.style.maxHeight = height+"px";
							$_scjvar.effects.expHeightTimers[divid] = setInterval(function(){
								expHt(height, curHeight, strTime, aniLen, stepNumbers);
							}, $_scjvar.settings.effects.rate);
						}
						function expHt(endHeight, strHeight, startTime, animLength, steps){
							var elapsed = (new Date()).getTime() - startTime;
							if (elapsed >= animLength || $_scjvar.effects.curHeight[divid] >= endHeight){
									if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
										$_(div).attr("height", endHeight);
									else div.style.height = endHeight+"px";
									div.style.display = "block";
									div.style.visibility = "visible";
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toHeight>onDone::private"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.expHeightTimers[divid]);
								delete($_scjvar.effects.expHeightTimers[divid]);
								delete($_scjvar.effects.curHeight[divid]);
							} else {
								var curStep = Math.round((elapsed/animLength) * steps);
								var delta = ((1/steps) * (steps-curStep + 1));
								$_scjvar.effects.curHeight[divid] = endHeight - Math.round(Math.pow(delta, 4) * (endHeight - strHeight));
								if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
									$_(div).attr("height", $_scjvar.effects.curHeight[divid]);
								else{
									div.style.height = $_scjvar.effects.curHeight[divid]+"px";
									div.style.maxHeight = $_scjvar.effects.curHeight[divid]+"px";
								}
							}
						}
						function conHt(endHeight, strHeight, startTime, animLength, steps){
							var elapsed = (new Date()).getTime() - startTime;
							if (elapsed >= animLength || $_scjvar.effects.curHeight[divid] <= endHeight){
								if (endHeight <= 0){
									if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
										$_(div).attr("height", 0);
									else div.style.height = "0px";
									div.style.display = "none";
									div.style.visibility = "hidden";
								} else {
									if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
										$_(div).attr("height", endHeight);
									else div.style.height = endHeight+"px";
									div.style.display = "block";
									div.style.visibility = "visible";
								}
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toHeight>onDone::private"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.expHeightTimers[divid]);
								delete($_scjvar.effects.expHeightTimers[divid]);
								delete($_scjvar.effects.curHeight[divid]);
							} else {
								var curStep = Math.round((elapsed/animLength) * steps);
								var delta = ((1/steps) * (steps-curStep + 1));
								$_scjvar.effects.curHeight[divid] = endHeight + Math.round(Math.pow(delta, 4) * (strHeight - endHeight));
								if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
									$_(div).attr("height", $_scjvar.effects.curHeight[divid]);
								else{
									div.style.height = $_scjvar.effects.curHeight[divid]+"px";
									div.style.maxHeight = $_scjvar.effects.curHeight[divid]+"px";
								}
							}
						}
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				},
				toWidth: function(width, animLength, onDone){
					function mainFunc(div, divid){
						if ($_.isNull(onDone))
							onDone = function(){ return false;};
						if ($_scjvar.effects.expWidthTimers[divid]){
							clearInterval($_scjvar.effects.expWidthTimers[divid]);
							delete($_scjvar.effects.expWidthTimers[divid]);
							delete($_scjvar.effects.curWidth[divid]);
						}
						if (div.tagName.toLowerCase() != "canvas" && div.tagName.toLowerCase() != "video"){
							$_(div).fromInlineToBlock();
							if ($_(div).css("display") == "none" || $_(div).css("visibility") == "hidden" || $_(div).css("opacity") == 0 || $_(div).css("filter") == "alpha(opacity=0)"){
								$_(div).css({
									width: "0px",
									minWidth: "0px",
									maxWidth: "0px",
									display: "block",
									visibility: "visible"
								});
							}
						}
						var aniLen = animLength ? animLength : $_scjvar.settings.effects.defaultLength;
						function tOffset(){
							if (div.tagName.toLowerCase() == "canvas" && div.tagName.toLowerCase() != "video") return 0;
							var wastedSpace = 0;
							if ($_(div).css("width") && $_(div).css("width") != "auto")
								wastedSpace = div.offsetWidth - parseInt($_(div).css("width"));
							else if ($_(div).css("min-width") && $_(div).css("min-width") != "auto")
								wastedSpace = div.offsetWidth - parseInt($_(div).css("min-width"));
							else {
								wastedSpace += $_(div).css("padding-left") ? parseInt($_(div).css("padding-left")) : 0;
								wastedSpace += $_(div).css("padding-right") ? parseInt($_(div).css("padding-right")) : 0;
								if ($_(div).css("border-left-style") != "none" || $_(div).css("border-left-style") != "")
									wastedSpace += $_(div).css("border-left-width") ? parseInt($_(div).css("border-left-width")) : 0;
								if ($_(div).css("border-right-style") != "none" || $_(div).css("border-right-style") != "")
									wastedSpace += $_(div).css("border-right-width") ? parseInt($_(div).css("border-right-width")) : 0;
							}
							return wastedSpace;
						}
						var trueOffset = tOffset();
						if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
							var curWidth = div.width;
						else var curWidth = div.offsetWidth - trueOffset;
						if (typeof width == "undefined" || width == curWidth) return;
							width -= trueOffset;
						var strTime = (new Date()).getTime();
							$_scjvar.effects.curWidth[divid] = curWidth;
						var stepNumbers = Math.round(aniLen/$_scjvar.settings.effects.rate);
							
						width = Mathf.limit(width, 0);
						if (width < curWidth){
							div.style.maxWidth = curWidth+"px";
							div.style.minWidth = width+"px";
							$_scjvar.effects.expWidthTimers[divid] = setInterval(function(){
								conWd(width, curWidth, strTime, aniLen, stepNumbers);
							}, $_scjvar.settings.effects.rate);
						} else if (width > curWidth){
							div.style.minWidth = curWidth+"px";
							div.style.maxWidth = width+"px";
							$_scjvar.effects.expWidthTimers[divid] = setInterval(function(){
								expWd(width, curWidth, strTime, aniLen, stepNumbers);
							}, $_scjvar.settings.effects.rate);
						}
						function expWd(endWidth, strWidth, startTime, animLength, steps){
							var elapsed = (new Date()).getTime() - startTime;
							if (elapsed >= animLength || $_scjvar.effects.curWidth[divid] >= endWidth){
									if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
										$_(div).attr("width", endWidth);
									else div.style.width = endWidth+"px";
									div.style.display = "block";
									div.style.visibility = "visible";
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toHeight>onDone::private"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.expWidthTimers[divid]);
								delete($_scjvar.effects.expWidthTimers[divid]);
								delete($_scjvar.effects.curWidth[divid]);
							} else {
								var curStep = Math.round((elapsed/animLength) * steps);
								var delta = ((1/steps) * (steps-curStep + 1));
								$_scjvar.effects.curWidth[divid] = endWidth - Math.round(Math.pow(delta, 4) * (endWidth - strWidth));
								if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
									$_(div).attr("width", $_scjvar.effects.curWidth[divid]);
								else{
									div.style.width = $_scjvar.effects.curWidth[divid]+"px";
									div.style.maxWidth = $_scjvar.effects.curWidth[divid]+"px";
								}
							}
						}
						function conWd(endWidth, strWidth, startTime, animLength, steps){
							var elapsed = (new Date()).getTime() - startTime;
							if (elapsed >= animLength || $_scjvar.effects.curWidth[divid] <= endWidth){
								if (endWidth <= 0){
									if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
										$_(div).attr("width", 0);
									else div.style.width = "0px";
									div.style.display = "none";
									div.style.visibility = "hidden";
								} else {
									if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
										$_(div).attr("width", endWidth);
									else div.style.width = endWidth+"px";
									div.style.display = "block";
									div.style.visibility = "visible";
								}
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toHeight>onDone::private"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.expWidthTimers[divid]);
								delete($_scjvar.effects.expWidthTimers[divid]);
								delete($_scjvar.effects.curWidth[divid]);
							} else {
								var curStep = Math.round((elapsed/animLength) * steps);
								var delta = ((1/steps) * (steps-curStep + 1));
								$_scjvar.effects.curWidth[divid] = endWidth + Math.round(Math.pow(delta, 4) * (strWidth - endWidth));
								if (div.tagName.toLowerCase() == "canvas" || div.tagName.toLowerCase() == "video")
									$_(div).attr("width", $_scjvar.effects.curWidth[divid]);
								else{
									div.style.width = $_scjvar.effects.curWidth[divid]+"px";
									div.style.maxWidth = $_scjvar.effects.curWidth[divid]+"px";
								}
							}
						}
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				},
				toDimensions: function(wd, ht, aniLength, onFinish){
					function mainFunc(div, divid){
						if ($_.isNull(onFinish))
							onFinish = function(){};
						$_(div).effects.toHeight(ht, aniLength);
						$_(div).effects.toWidth(wd, aniLength);
						setTimeout(function(){
							try{ onFinish(); } catch(e) {
								$_.newError({
									"description": e.description,
									"type": e.name,
									"name": "onDone"
								});
							}
						}, aniLength);
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				},
				show: function(aniLength, onFinish){
					if ($_.isNull(onFinish))
						onFinish = function(){ return false;};
					var arr = new Array();
					arr.ht = ($_.isArray(d)) ? (new Array()) : 0;
					arr.wd = ($_.isArray(d)) ? (new Array()) : 0;
					arr.aniLen = (aniLength) ? aniLength : $_scjvar.settings.effects.defaultLength;
					
					if (d.tagName.toLowerCase() != "canvas" && d.tagName.toLowerCase() != "video")
						$_(d).fromInlineToBlock();
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							if (!$_.isNull($_.getCachedElement(d[i]))){
								arr.ht[i] = $_.getCachedElement(d[i]).height;
								arr.wd[i] = $_.getCachedElement(d[i]).width;
							} else {
								$_(d[i]).css("visibility", "hidden");
								$_(d[i]).css("display", "block");
								if (!$_.getCachedElement(d[i]) && d[i].offsetHeight > 0 && d[i].offsetWidth > 0)
									$_.cacheElement(d[i]);
								var wastedSpace = 0;
								if ($_(d[i]).css("height"))
									wastedSpace = d[i].offsetHeight - parseInt($_(d[i]).css("height"));
								else if ($_(d[i]).css("min-height"))
									wastedSpace = d[i].offsetHeight - parseInt($_(d[i]).css("min-height"));
								else {
									wastedSpace += $_(d[i]).css("padding-top") ? parseInt($_(d[i]).css("padding-top")) : 0;
									wastedSpace += $_(d[i]).css("padding-bottom") ? parseInt($_(d[i]).css("padding-bottom")) : 0;
									if ($_(d[i]).css("border-top-style") != "none" || $_(d[i]).css("border-top-style") != "")
										wastedSpace += $_(d[i]).css("border-top-width") ? parseInt($_(d[i]).css("border-top-width")) : 0;
									if ($_(d[i]).css("border-bottom-style") != "none" || $_(d[i]).css("border-bottom-style") != "")
										wastedSpace += $_(d[i]).css("border-bottom-width") ? parseInt($_(d[i]).css("border-bottom-width")) : 0;
								}
								var wastedSpace2 = 0;
								if ($_(d[i]).css("width"))
									wastedSpace2 = d[i].offsetWidth - parseInt($_(d[i]).css("width"));
								else if ($_(d[i]).css("min-width"))
									wastedSpace2 = d[i].offsetWidth - parseInt($_(d[i]).css("min-width"));
								else {
									wastedSpace2 += $_(d[i]).css("padding-left") ? parseInt($_(d[i]).css("padding-left")) : 0;
									wastedSpace2 += $_(d[i]).css("padding-right") ? parseInt($_(d[i]).css("padding-right")) : 0;
									if ($_(d[i]).css("border-left-style") != "none" || $_(d[i]).css("border-left-style") != "")
										wastedSpace2 += $_(d[i]).css("border-left-width") ? parseInt($_(d[i]).css("border-left-width")) : 0;
									if ($_(d[i]).css("border-right-style") != "none" || $_(d[i]).css("border-right-style") != "")
										wastedSpace2 += $_(d[i]).css("border-right-width") ? parseInt($_(d[i]).css("border-right-width")) : 0;
								}
								arr.ht[i] = d[i].offsetHeight - wastedSpace;
								arr.wd[i] = d[i].offsetWidth - wastedSpace2;
							}
						}
					} else {
						if (!$_.isNull($_.getCachedElement(d))){
							arr.ht = $_.getCachedElement(d).height;
							arr.wd = $_.getCachedElement(d).width;
						} else {
							$_(d).css("visibility", "hidden");
							$_(d).css("display", "block");
							if ($_.isNull($_.getCachedElement(d)) && d.offsetHeight > 0 && d.offsetWidth > 0)
								$_.cacheElement(d);
							var wastedSpace = 0;
							if ($_(d).css("height"))
								wastedSpace = d.offsetHeight - parseInt($_(d).css("height"));
							else if ($_(d).css("min-height"))
								wastedSpace = d.offsetHeight - parseInt($_(d).css("min-height"));
							else {
								wastedSpace += $_(d).css("padding-top") ? parseInt($_(d).css("padding-top")) : 0;
								wastedSpace += $_(d).css("padding-bottom") ? parseInt($_(d).css("padding-bottom")) : 0;
								if ($_(d).css("border-top-style") != "none" || $_(d).css("border-top-style") != "")
									wastedSpace += $_(d).css("border-top-width") ? parseInt($_(d).css("border-top-width")) : 0;
								if ($_(d).css("border-bottom-style") != "none" || $_(d).css("border-bottom-style") != "")
									wastedSpace += $_(d).css("border-bottom-width") ? parseInt($_(d).css("border-bottom-width")) : 0;
							}
							var wastedSpace2 = 0;
							if ($_(d).css("width"))
								wastedSpace2 = d.offsetWidth - parseInt($_(d).css("width"));
							else if ($_(d).css("min-width"))
								wastedSpace2 = d.offsetWidth - parseInt($_(d).css("min-width"));
							else {
								wastedSpace2 += $_(d).css("padding-left") ? parseInt($_(d).css("padding-left")) : 0;
								wastedSpace2 += $_(d).css("padding-right") ? parseInt($_(d).css("padding-right")) : 0;
								if ($_(d).css("border-left-style") != "none" || $_(d).css("border-left-style") != "")
									wastedSpace2 += $_(d).css("border-left-width") ? parseInt($_(d).css("border-left-width")) : 0;
								if ($_(d).css("border-right-style") != "none" || $_(d).css("border-right-style") != "")
									wastedSpace2 += $_(d).css("border-right-width") ? parseInt($_(d).css("border-right-width")) : 0;
							}
							arr.ht = d.offsetHeight - wastedSpace;
							arr.wd = d.offsetWidth - wastedSpace2;
						}
					}
					
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							$_(d[i]).css("height", "0px");
							$_(d[i]).css("width", "0px");
							$_(d[i]).css("display", "block");
							$_(d[i]).css("visibility", "visible");
							$_(d[i]).css("opacity", "0");
							$_(d[i]).css("filter", "alpha(opacity=0)");
							$_(d[i]).effects.toDimensions(arr.wd[i], arr.ht[i], arr.aniLen, onFinish);
							$_(d[i]).effects.fadeTo(100, arr.aniLen);
						}
					} else {
						$_(divID).css("height", "0px");
						$_(divID).css("width", "0px");
						$_(divID).css("display", "block");
						$_(divID).css("visibility", "visible");
						$_(divID).css("opacity", "0");
						$_(divID).css("filter", "alpha(opacity=0)");
						$_(divID).effects.toDimensions(arr.wd, arr.ht, arr.aniLen, onFinish);
						$_(divID).effects.fadeTo(100, arr.aniLen);
					}
				},
				hide: function(aniLength, onFinish){
					if ($_.isNull(onFinish))
						onFinish = function(){ return false;};
					var arr = new Array();
					arr.ht =  0;
					arr.wd = 0;
					arr.aniLen = (aniLength) ? aniLength : $_scjvar.settings.effects.defaultLength;
					
					if (d.tagName.toLowerCase() != "canvas" && d.tagName.toLowerCase() != "video")
						$_(d).fromInlineToBlock();
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							if ($_.isNull($_.getCachedElement(d[i]))){
								$_.cacheElement(d);
								setTimeout(function(){
									$_(d[i]).effects.toDimensions(arr.wd[i], arr.ht[i], arr.aniLen, onFinish);
									$_(d[i]).effects.fadeTo(0, arr.aniLen);
								}, 200);
							} else {
								$_(d[i]).effects.toDimensions(arr.wd[i], arr.ht[i], arr.aniLen, onFinish);
								$_(d[i]).effects.fadeTo(0, arr.aniLen);
							}
						}
					} else {
						if ($_.isNull($_.getCachedElement(d))){
							$_.cacheElement(d);
							setTimeout(function(){
								$_(d).effects.toDimensions(arr.wd, arr.ht, arr.aniLen, onFinish);
								$_(d).effects.fadeTo(0, arr.aniLen);
							}, 200);
						} else {
							$_(d).effects.toDimensions(arr.wd, arr.ht, arr.aniLen, onFinish);
							$_(d).effects.fadeTo(0, arr.aniLen);
						}
					}
				},
				toggleHeight: function(maxHt, aniLength){
					if (d.style.display != "none" || d.style.visibility != "hidden"){
						$_(divID).effects.toHeight(0, aniLength);
					} else if (d.style.display == "none" || d.style.visibility == "hidden"){
						$_(divID).effects.toHeight(maxHt, aniLength);
					}
				},
				toggleWidth: function(maxWd, aniLength){
					if (d.style.display != "none" || d.style.visibility != "hidden"){
						$_(divID).effects.toWidth(0, aniLength);
					} else if (d.style.display == "none" || d.style.visibility == "hidden"){
						$_(divID).effects.toWidth(maxWd, aniLength);
					}
				},
				toColor: function(type, hexColor, aniLen, onFinish){
					function mainFunc(div, divid){
						if ($_.isNull(hexColor)) return false;
						if ($_.isNull(onFinish)) onFinish = function(){return false;};
						var rgbColor = new Object();
						if (typeof(hexColor) == "string") 
							rgbColor = $_.HexToRGBA(hexColor);
						else {
							rgbColor.r = hexColor[0];
							rgbColor.g = hexColor[1];
							rgbColor.b = hexColor[2];
							rgbColor.a = hexColor[3];
						}
						var r = rgbColor.r;
						var g = rgbColor.g;
						var b = rgbColor.b;
						var a = rgbColor.a * 100;
						if ($_.isNull(type) || $_.isNull(r) || $_.isNull(g) || $_.isNull(b) || $_.isNull(aniLen)){
							$_.newError({
								"description": "Improper parameters for function.",
								"type": "Parameter insufficiency",
								"name": "toColor"
							});
							return false;
						} else if ($_.isNull(a)) a = 100;
						
						var styledType = $_.toCSSValue(type);
						var colorStyle = $_(div).css(styledType);
							styledType = $_.toJSCSSValue(styledType);
						if (!$_.isNull($_scjvar.effects.colorTimers[divid]) && !$_.isNull($_scjvar.effects.colorTimers[divid][styledType])){
							clearInterval($_scjvar.effects.colorTimers[divid][styledType]);
							delete($_scjvar.effects.colorTimers[divid][styledType]);
							delete($_scjvar.effects.curColor[divid][styledType]);
						}
							var color = new Object();
							var methodNum = 0;
							if (/(\#[a-f0-9]{1,6})/gi.test(colorStyle)){
								var mat = colorStyle.match(/(\#[a-f0-9]{1,6})/gi);
								var allMat = "";
								if ($_.isArray(mat))
									for (var i in mat) allMat += mat[i];
								else allMat = mat;
								color = $_.HexToRGBA(allMat);
								methodNum = 1;
							} else if (/(rgba)/i.test(colorStyle)){
								var mat = colorStyle.match(/rgba\((\d{1,3})(\,\s|\,)(\d{1,3})(\,\s|\,)(\d{1,3})(\,\s|\,)(\d{1}|\d\.\d{1,3})\)/);
								var cr = parseInt(mat[1]);
								var cg = parseInt(mat[3]);
								var cb = parseInt(mat[5]);
								var ca = parseInt(mat[7]);
								color = $_.newColor(cr, cg, cb, ca);
								methodNum = 2;
							} else if (/(rgb)/i.test(colorStyle)){
								var mat = colorStyle.match(/rgb\((\d{1,3})(\,\s|\,)(\d{1,3})(\,\s|\,)(\d{1,3})\)/);
								var cr = parseInt(mat[1]);
								var cg = parseInt(mat[3]);
								var cb = parseInt(mat[5]);
								color = $_.newColor(cr, cg, cb, 1);
								methodNum = 3;
							} else {
								colorStyle = "rgba(0, 0, 0, 0)"; //is transparent
								color = $_.newColor(0, 0, 0, 0);
								methodNum = 4;
							}
						var strTime = (new Date()).getTime();
						color.a *= 100;
						if ($_.isNull(color))
							$_.newError({
								"name": "toColor",
								"type": "Saved Color is Null",
								"description": "Saved color value is null. Method #"+methodNum+" was used to get color."
							});
						if ($_.isNull($_scjvar.effects.curColor[divid]) || typeof $_scjvar.effects.curColor[divid] != "object")
							$_scjvar.effects.curColor[divid] = new Object();
						$_scjvar.effects.curColor[divid][styledType] = {r: (color.r), g: (color.g), b: (color.b), a: (color.a)};
						if ($_.isNull($_scjvar.effects.colorTimers[divid]) || typeof $_scjvar.effects.colorTimers[divid] != "object")
							$_scjvar.effects.colorTimers[divid] = new Object();
						$_scjvar.effects.colorTimers[divid][styledType] = setInterval(function(){toColor(color, r, g, b, a, strTime, aniLen, colorStyle, styledType, onFinish);}, $_scjvar.settings.effects.rate);
						
						function toColor(oldColors, eR, eG, eB, eA, started, animLength, cStyle, sType, onDone){
							var elapsed = (new Date()).getTime() - started;
							var cr = $_scjvar.effects.curColor[divid][sType].r;
							var cg = $_scjvar.effects.curColor[divid][sType].g;
							var cb = $_scjvar.effects.curColor[divid][sType].b;
							var ca = $_scjvar.effects.curColor[divid][sType].a;
							if (elapsed >= animLength || (eR == cr && eG == cg && eB == cb && ca == (eA*100))){
								eA = eA/100;
								var newStyle = new Array();
								if (/(\#[a-f0-9]{1,6})/gi.test(cStyle)){
									newStyle[0] = cStyle.replace(/(\#[a-f0-9]{1,6})/gi, "rgb("+eR+", "+eG+", "+eB+")");
									newStyle[1] = cStyle.replace(/(\#[a-f0-9]{1,6})/gi, "rgba("+eR+", "+eG+", "+eB+", "+eA+")");
								} else if (/rgba\(.+\)/gi.test(cStyle)){
									newStyle[0] = cStyle.replace(/rgba\(.+\)/gi, "rgb("+eR+", "+eG+", "+eB+")");
									newStyle[1] = cStyle.replace(/rgba\(.+\)/gi, "rgba("+eR+", "+eG+", "+eB+", "+eA+")");
								} else if (/rgb\(.+\)/gi.test(cStyle)){
									newStyle[0] = cStyle.replace(/rgb\(.+\)/gi, "rgb("+eR+", "+eG+", "+eB+")");
									newStyle[1] = cStyle.replace(/rgb\(.+\)/gi, "rgba("+eR+", "+eG+", "+eB+", "+eA+")");
								}
								$_(div).css(sType, newStyle[0]); //for older browsers
								$_(div).css(sType, newStyle[1]);
								clearInterval($_scjvar.effects.colorTimers[divid][sType]);
								delete($_scjvar.effects.colorTimers[divid][sType]);
								delete($_scjvar.effects.curColor[divid][sType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.colorTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.colorTimers[divid]);
								var all2 = 0;
								for (var b in $_scjvar.effects.curColor[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curColor[divid]);
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch (e){
										$_.newError({
											"name": "onDone",
											"type": e.name,
											"description": "Error while executing function onDone(): "+e.description+"."
										});
									}
								} else onDone();
							} else {
								var to = {
									"r": ((cr < eR) ? true : ((cr != eR) ? false : "equal")),
									"g": ((cg < eG) ? true : ((cg != eG) ? false : "equal")),
									"b": ((cb < eB) ? true : ((cb != eB) ? false : "equal")),
									"a": ((ca < eA) ? true : ((ca != eA) ? false : "equal"))
								};
								toR(eR, to.r);
								toG(eG, to.g);
								toB(eB, to.b);
								toA(eA, to.a);
								
								var newStyle2 = new Array();
								if (/(\#[a-f0-9]{1,6})/gi.test(cStyle)){
									newStyle2[0] = cStyle.replace(/(\#[a-f0-9]{1,6})/gi, "rgb("+cr+", "+cg+", "+cb+")");
									newStyle2[1] = cStyle.replace(/(\#[a-f0-9]{1,6})/gi, "rgba("+cr+", "+cg+", "+cb+", "+(ca/100)+")");
								} else if (/rgba\(.+\)/gi.test(cStyle)){
									newStyle2[0] = cStyle.replace(/rgba\(.+\)/gi, "rgb("+cr+", "+cg+", "+cb+")");
									newStyle2[1] = cStyle.replace(/rgba\(.+\)/gi, "rgba("+cr+", "+cg+", "+cb+", "+(ca/100)+")");
								} else if (/rgb\(.+\)/gi.test(cStyle)){
									newStyle2[0] = cStyle.replace(/rgb\(.+\)/gi, "rgb("+cr+", "+cg+", "+cb+")");
									newStyle2[1] = cStyle.replace(/rgb\(.+\)/gi, "rgba("+cr+", "+cg+", "+cb+", "+(ca/100)+")");
								} else {
									$_.newError({
										"name": "toColor",
										"type": "Unknown",
										"description": "Could not find any regular expression object in the string for color style '"+cStyle+".'"
									});
								}
								$_(div).css(sType, newStyle2[0]); //for older browsers
								$_(div).css(sType, newStyle2[1]);
								if ($_.isNull(newStyle2[0]) || $_.isNull(newStyle2[1]) || $_.isNull(cStyle))
								$_.newLog({
									"name": "Current Color Info",
									"description": "Managed to save current color values for compatability as a RGB value, "+newStyle2[0]+", as a RGBA value, "+newStyle2[1]+", and also the color style, "+cStyle+"."
								});
								delete(cr);
								delete(cg);
								delete(cb);
								delete(ca);
								delete(to);
							}
							
							function toR(endR, up){
								if (up && up != "equal"){
									$_scjvar.effects.curColor[divid][sType].r = oldColors.r + Math.round((elapsed/animLength) * (eR - oldColors.r)); 
								} else if (!up){
									$_scjvar.effects.curColor[divid][sType].r = oldColors.r - Math.round((elapsed/animLength) * (oldColors.r - eR)); 
								}
							}
							function toG(endG, up){
								if (up && up != "equal"){
									$_scjvar.effects.curColor[divid][sType].g = oldColors.g + Math.round((elapsed/animLength) * (eG - oldColors.g)); 
								} else if (!up){
									$_scjvar.effects.curColor[divid][sType].g = oldColors.g - Math.round((elapsed/animLength) * (oldColors.g - eG)); 
								}
							}
							function toB(endB, up){
								if (up && up != "equal"){
									$_scjvar.effects.curColor[divid][sType].b = oldColors.b + Math.round((elapsed/animLength) * (eB - oldColors.b)); 
								} else if (!up){
									$_scjvar.effects.curColor[divid][sType].b = oldColors.b - Math.round((elapsed/animLength) * (oldColors.b - eB)); 
								}
							}
							function toA(endA, up){
								if (up && up != "equal"){
									$_scjvar.effects.curColor[divid][sType].a = oldColors.a + Math.round((elapsed/animLength) * (eA - oldColors.a)); 
								} else if (!up){
									$_scjvar.effects.curColor[divid][sType].a = oldColors.a - Math.round((elapsed/animLength) * (oldColors.a - eA)); 
								}
							}
							
						}
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				},
				toPosition: function(type, endPos, animLength, onFinish){
					function mainFunc(div, divid){
						if ($_.isNull(type) || $_.isNull(endPos)) return false;
						if ($_.isNull(onFinish)) onFinish = function(){return false;};
						if ($_.isNull(animLength)) animLength = $_scjvar.settings.effects.defaultLength;
						type = $_.toJSCSSValue(type);
						if (!$_.isNull($_scjvar.effects.curPos[divid]) && !$_.isNull($_scjvar.effects.curPos[divid][type])){
							clearInterval($_scjvar.effects.posTimers[divid][type]);
							delete($_scjvar.effects.posTimers[divid][type]);
							delete($_scjvar.effects.curPos[divid][type]);
						}
						type = $_.toCSSValue(type);
						if (!/^(margin)/i.test(type) && type != "left" && type != "right" && type != "top" && type != "bottom") return false;
						var savedPos = $_(div).css(type);
							savedPos = parseInt(savedPos);
						type = $_.toJSCSSValue(type);
						var strTime = (new Date()).getTime();
							if ($_.isNull($_scjvar.effects.curPos[divid])) $_scjvar.effects.curPos[divid] = new Object();
							if ($_.isNull($_scjvar.effects.posTimers[divid])) $_scjvar.effects.posTimers[divid] = new Object();
							$_scjvar.effects.curPos[divid][type] = savedPos;
						var stepNumbers = Math.round(animLength/$_scjvar.settings.effects.rate);
						if (endPos > savedPos){
							$_scjvar.effects.posTimers[divid][type] = setInterval(function(){posIncrease(strTime, savedPos, type, endPos, animLength, stepNumbers);}, $_scjvar.settings.effects.rate); 
						} else if (endPos < savedPos){
							$_scjvar.effects.posTimers[divid][type] = setInterval(function(){posDecrease(strTime, savedPos, type, endPos, animLength, stepNumbers);}, $_scjvar.settings.effects.rate);
						}
						
						function posIncrease(startTime, strPos, posType, ePos, aniLen, steps){
							var elapsed = (new Date()).getTime() - startTime;
							if (elapsed >= aniLen || $_scjvar.effects.curPos[divid][posType] >= ePos){
								$_(div).css(posType, ePos+"px");
								try{ onFinish(); } catch(e) {
									$_.newError({
										"description": e.description,
										"type": e.name,
										"name": "toPosition => onFinish"
									});
								}
								clearInterval($_scjvar.effects.posTimers[divid][posType]);
								delete($_scjvar.effects.posTimers[divid][posType]);
								delete($_scjvar.effects.curPos[divid][posType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.posTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.posTimers[divid]);
								var all2 = 0;
								for (var a in $_scjvar.effects.curPos[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curPos[divid]);
							} else {
								var curStep = Math.round((elapsed/aniLen) * steps);
								var delta = ((1/steps) * (steps-curStep));
								$_scjvar.effects.curPos[divid][posType] = ePos - Math.round(Math.pow(delta, 4) * (ePos - strPos));
								$_(div).css(posType, $_scjvar.effects.curPos[divid][posType]+"px");
							}
						}
						function posDecrease(startTime, strPos, posType, ePos, aniLen, steps){
							var elapsed = (new Date()).getTime() - startTime;
							if (elapsed >= aniLen || $_scjvar.effects.curPos[divid][posType] <= ePos){
								$_(div).css(posType, ePos+"px");
								try{ onFinish(); } catch(e) {
									$_.newError({
										"description": e.description,
										"type": e.name,
										"name": "toPosition => onFinish"
									});
								}
								clearInterval($_scjvar.effects.posTimers[divid][posType]);
								delete($_scjvar.effects.posTimers[divid][posType]);
								delete($_scjvar.effects.curPos[divid][posType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.posTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.posTimers[divid]);
								var all2 = 0;
								for (var a in $_scjvar.effects.curPos[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curPos[divid]);
							} else {
								var curStep = Math.round((elapsed/aniLen) * steps);
								var delta = ((1/steps) * (steps-curStep));
								$_scjvar.effects.curPos[divid][posType] = ePos + Math.round(Math.pow(delta, 4) * (strPos - ePos));
								$_(div).css(posType, $_scjvar.effects.curPos[divid][posType]+"px");
							}
						}
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				},
				scrollTo: function(type, endPos, animLength, onFinish){
					function mainFunc(div, divid){
						var sType = "";
						if (type == "left" || type == "x")
							sType = "x";
						else if (type == "top" || type == "y")
							sType = "y";
						else return;
						if ($_.isNull(endPos) || $_.isNull(animLength) || typeof endPos != "number") return;
						if ($_.isNull(onFinish)) onFinish = function(){};
						
						if ($_scjvar.effects.scrollTimers[divid]){
							clearInterval($_scjvar.effects.scrollTimers[divid][sType]);
							delete($_scjvar.effects.scrollTimers[divid][sType]);
							delete($_scjvar.effects.curScroll[divid][sType]);
						}
						if ($_.isNull($_scjvar.effects.scrollTimers[divid]))
							$_scjvar.effects.scrollTimers[divid] = new Object();
						if ($_.isNull($_scjvar.effects.curScroll[divid]))
							$_scjvar.effects.curScroll[divid] = new Object();
						var startTime = (new Date()).getTime();
						var stepNumbers = Math.round(animLength/$_scjvar.settings.effects.rate);
						
						if (sType == "x"){
							var curX = (typeof div == "object" && "setInterval" in div) ? div.pageXOffset : div.scrollLeft; 
							$_scjvar.effects.curScroll[divid][sType] = curX;
							if (curX < endPos){
								$_scjvar.effects.scrollTimers[divid][sType] = setInterval(function(){expX(startTime, curX, endPos, animLength, stepNumbers, onFinish);}, $_scjvar.settings.effects.rate);
							} else if (curX > endPos){
								$_scjvar.effects.scrollTimers[divid][sType] = setInterval(function(){conX(startTime, curX, endPos, animLength, stepNumbers, onFinish);}, $_scjvar.settings.effects.rate);
							}
						} else if (sType == "y"){
							var curY = (typeof div == "object" && "setInterval" in div) ? div.pageYOffset : div.scrollTop; 
							$_scjvar.effects.curScroll[divid][sType] = curY;
							if (curY < endPos){
								$_scjvar.effects.scrollTimers[divid][sType] = setInterval(function(){expY(startTime, curY, endPos, animLength, stepNumbers, onFinish);}, $_scjvar.settings.effects.rate);
							} else if (curY > endPos){
								$_scjvar.effects.scrollTimers[divid][sType] = setInterval(function(){conY(startTime, curY, endPos, animLength, stepNumbers, onFinish);}, $_scjvar.settings.effects.rate);
							}
						}
						
						function expX(strTime, strPos, ePos, aniLen, steps, onDone){
							var elapsed = (new Date()).getTime() - strTime;
							if (elapsed >= aniLen || $_scjvar.effects.curScroll[divid][sType] >= ePos){
								div.scrollLeft = ePos;
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toPosition => onFinish"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.curScroll[divid][sType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.scrollTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.scrollTimers[divid]);			
								var all2 = 0;
								for (var a in $_scjvar.effects.curScroll[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curScroll[divid]);
							} else {
								var curStep = Math.round((elapsed/aniLen) * steps);
								var delta = ((1/steps) * (steps-curStep));
								$_scjvar.effects.curScroll[divid][sType] = ePos - Math.round(Math.pow(delta, 4) * (ePos - strPos));
								if (typeof div == "object" && "setInterval" in div){ 
									var sBy = $_scjvar.effects.curScroll[divid][sType] - div.pageXOffset;
									div.scrollBy(sBy, 0);
								} else div.scrollLeft = $_scjvar.effects.curScroll[divid][sType];
							}
						}
						function conX(strTime, strPos, ePos, aniLen, steps, onDone){
							var elapsed = (new Date()).getTime() - strTime;
							if (elapsed >= aniLen || $_scjvar.effects.curScroll[divid][sType] <= ePos){
								div.scrollLeft = ePos;
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toPosition => onFinish"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.curScroll[divid][sType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.scrollTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.scrollTimers[divid]);			
								var all2 = 0;
								for (var a in $_scjvar.effects.curScroll[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curScroll[divid]);
							} else {
								var curStep = Math.round((elapsed/aniLen) * steps);
								var delta = ((1/steps) * (steps-curStep));
								$_scjvar.effects.curScroll[divid][sType] = ePos + Math.round(Math.pow(delta, 4) * (strPos - ePos));
								if (typeof div == "object" && "setInterval" in div){ 
									var sBy = $_scjvar.effects.curScroll[divid][sType] - div.pageXOffset;
									div.scrollBy(sBy, 0);
								} else div.scrollLeft = $_scjvar.effects.curScroll[divid][sType];
							}
						}
						
						function expY(strTime, strPos, ePos, aniLen, steps, onDone){
							var elapsed = (new Date()).getTime() - strTime;
							if (elapsed >= aniLen || $_scjvar.effects.curScroll[divid][sType] >= ePos){
								div.scrollTop = ePos;
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toPosition => onFinish"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.curScroll[divid][sType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.scrollTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.scrollTimers[divid]);			
								var all2 = 0;
								for (var a in $_scjvar.effects.curScroll[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curScroll[divid]);
							} else {
								var curStep = Math.round((elapsed/aniLen) * steps);
								var delta = ((1/steps) * (steps-curStep));
								$_scjvar.effects.curScroll[divid][sType] = ePos - Math.round(Math.pow(delta, 4) * (ePos - strPos));
								if (typeof div == "object" && "setInterval" in div){ 
									var sBy = $_scjvar.effects.curScroll[divid][sType] - div.pageYOffset;
									div.scrollBy(0, sBy);
								} else div.scrollTop = $_scjvar.effects.curScroll[divid][sType];
							}
						}
						function conY(strTime, strPos, ePos, aniLen, steps, onDone){
							var elapsed = (new Date()).getTime() - strTime;
							if (elapsed >= aniLen || $_scjvar.effects.curScroll[divid][sType] <= ePos){
								div.scrollTop = ePos;
								if ($_scjvar.settings.misc.catchErrors){
									try{ onDone(); } catch(e) {
										$_.newError({
											"description": e.description,
											"type": e.name,
											"name": "toPosition => onFinish"
										});
									}
								} else onDone();
								clearInterval($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.scrollTimers[divid][sType]);
								delete($_scjvar.effects.curScroll[divid][sType]);
								var all1 = 0;
								for (var a in $_scjvar.effects.scrollTimers[divid])
									all1++;
								if (all1 == 0) delete($_scjvar.effects.scrollTimers[divid]);			
								var all2 = 0;
								for (var a in $_scjvar.effects.curScroll[divid])
									all2++;
								if (all2 == 0) delete($_scjvar.effects.curScroll[divid]);
							} else {
								var curStep = Math.round((elapsed/aniLen) * steps);
								var delta = ((1/steps) * (steps-curStep));
								$_scjvar.effects.curScroll[divid][sType] = ePos + Math.round(Math.pow(delta, 4) * (strPos - ePos));
								if (typeof div == "object" && "setInterval" in div){ 
									var sBy = $_scjvar.effects.curScroll[divid][sType] - div.pageYOffset;
									div.scrollBy(0, sBy);
								} else div.scrollTop = $_scjvar.effects.curScroll[divid][sType];
							}
						}
					}
					if ($_.isArray(d)){
						for (var i=0; i<d.length; i++){
							var unique = $_(d[i]).uniqueVal();
							mainFunc(d[i], unique);
						}
					} else {
						var unique = $_(d).uniqueVal();
						mainFunc(d, unique);
					}
				}
			};
	}
	if (typeof(div) != "undefined")
		return new divFunction(div);
	else return false;
}

$_.viewMemory = function(){
	var str1 = "";
	str1 += "<!DOCTYPE html>\n";
	str1 += "<html lang=\"en\">\n";
	str1 += "<head>\n";
	str1 += "<title>Scrije: Saved Memory</title>\n";
	str1 += "<meta http-equiv=\"X-UA-Compatible\" content=\"IE=10\">\n";
	str1 += "<meta http-equiv=\"Content-Type\" content=\"text/html; charset=iso-8859-1\">\n";
	str1 += "<style type=\"text/css\">\n";
	str1 += "html, body{\n";
	str1 += "padding: 10px;\n";
	str1 += "margin: 0px;\n";
	str1 += "font-family: Arial;\n";
	str1 += "font-size: 12px;\n";
	str1 += "font-weight: normal;\n";
	str1 += "color: #444444;\n";
	str1 += "text-align: left;\n";
	str1 += "}\n";
	str1 += "div, p, span, textarea, input{\n";
	str1 += "font-family: Arial;\n";
	str1 += "font-size: 12px;\n";
	str1 += "color: #444444;\n";
	str1 += "}\n";
	str1 += "#scj_title_grand{\n";
	str1 += "font-weight: bold;\n";
	str1 += "font-size: 16px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "}\n";
	str1 += ".scj_title{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 14px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "margin-left: 10px;\n";
	str1 += "}\n";
	str1 += ".scj_second{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 12px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #111111;\n";
	str1 += "margin-left: 25px;\n";
	str1 += "}\n";
	str1 += ".scj_third{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #0A849C;\n";
	str1 += "margin-left: 45px;\n";
	str1 += "}\n";
	str1 += ".scj_third_val{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #000000;\n";
	str1 += "}\n";
	str1 += ".scj_third2{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #000000;\n";
	str1 += "margin-left: 45px;\n";
	str1 += "}\n";
	str1 += ".scj_fourth{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #0A849C;\n";
	str1 += "margin-left: 65px;\n";
	str1 += "}\n";
	str1 += ".scj_fourth_val{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #000000;\n";
	str1 += "}\n";
	str1 += ".scj_fourth2{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #000000;\n";
	str1 += "margin-left: 65px;\n";
	str1 += "}\n";
	str1 += ".scj_fifth{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #0A849C;\n";
	str1 += "margin-left: 85px;\n";
	str1 += "}\n";
	str1 += ".scj_fifth_val{\n";
	str1 += "font-weight: normal;\n";
	str1 += "font-size: 11px;\n";
	str1 += "text-decoration: none;\n";
	str1 += "color: #000000;\n";
	str1 += "}\n";
	str1 += "</style>\n";
	str1 += "</head>\n";
	str1 += "<body>\n";
	str1 += "<div id=\"scj_title_grand\">Scrije Memory</div>\n";
	str1 += "<div class=\"scj_title\">Settings</div>\n";
	for (var a in $_scjvar.settings){
		if (typeof $_scjvar.settings[a] == "object" || typeof $_scjvar.settings[a] == "array"){
			str1 += "<div class=\"scj_second\">"+a+" {</div>\n";
			for (var b in $_scjvar.settings[a]){
				str1 += "<div class=\"scj_third\">"+b+": <span class=\"scj_third_val\">"+$_scjvar.settings[a][b]+"</span></div>\n";
			}
			str1 += "<div class=\"scj_second\">}</div>\n";
		} else {
			str1 += "<div class=\"scj_second\">"+a+"</div>\n";
		}
	}
	str1 += "<div class=\"scj_title\">Effects</div>\n";
	for (var a in $_scjvar.effects){
		if (typeof $_scjvar.effects[a] == "object" || typeof $_scjvar.effects[a] == "array"){
			str1 += "<div class=\"scj_second\">"+(typeof(a.id) != "undefined" ? a.id : a)+" {</div>\n";
			for (var b in $_scjvar.effects[a]){
				if (typeof $_scjvar.effects[a][b] == "object" || typeof $_scjvar.effects[a][b] == "array"){
					str1 += "<div class=\"scj_third2\">"+(typeof(b.id) != "undefined" ? b.id : b)+" {</div>\n";
					for (var c in $_scjvar.effects[a][b]){
						if (typeof $_scjvar.effects[a][b][c] == "object" || typeof $_scjvar.effects[a][b][c] == "array"){
							str1 += "<div class=\"scj_fourth2\">"+(typeof(c.id) != "undefined" ? c.id : c)+"{</div>\n";
							for (var d in $_scjvar.effects[a][b][c])
							str1 += "<div class=\"scj_fifth\">"+d+": <span class=\"scj_fourth_val\">"+$_scjvar.effects[a][b][c][d]+"</span></div>\n";
							str1 += "<div class=\"scj_fourth2\">}</div>\n";
						} else 
						str1 += "<div class=\"scj_fourth\">"+c+": <span class=\"scj_fourth_val\">"+$_scjvar.effects[a][b][c]+"</span></div>\n";
					}
					str1 += "<div class=\"scj_third2\">}</div>\n";
				} else 
				str1 += "<div class=\"scj_third\">"+b+": <span class=\"scj_third_val\">"+$_scjvar.effects[a][b]+"</span></div>\n";
			}
			str1 += "<div class=\"scj_second\">}</div>\n";
		} else {
			str1 += "<div class=\"scj_second\">"+(a.id ? a.id : a)+"</div>\n";
		}
	}
	str1 += "<div class=\"scj_title\">Cached Elements</div>\n";
	for (var a in $_scjvar.elements){
		if (typeof $_scjvar.elements[a] == "object" || typeof $_scjvar.elements[a] == "array"){
			str1 += "<div class=\"scj_second\">"+(a.id ? a.id : a)+" {</div>\n";
			for (var b in $_scjvar.elements[a]){
				str1 += "<div class=\"scj_third\">"+b+": <span class=\"scj_third_val\">"+$_scjvar.elements[a][b]+"</span></div>\n";
			}
			str1 += "<div class=\"scj_second\">}</div>\n";
		} else {
			str1 += "<div class=\"scj_second\">"+(a.id ? a.id : a)+"</div>\n";
		}
	}
	str1 += "<div class=\"scj_title\">Errors</div>\n";
	for (var a=0; a<$_scjvar.errors.length; a++){
		if (typeof $_scjvar.errors[a] == "object" || typeof $_scjvar.errors[a] == "array"){
			str1 += "<div class=\"scj_second\">"+$_scjvar.errors[a].functionName+"() {</div>\n";
			for (var b in $_scjvar.errors[a]){
				if ($_scjvar.errors[a][b] == $_scjvar.errors[a].functionName) continue;
				str1 += "<div class=\"scj_third\">"+b+": <span class=\"scj_third_val\">"+$_scjvar.errors[a][b]+"</span></div>\n";
			}
			str1 += "<div class=\"scj_second\">}</div>\n";
		} else {
			str1 += "<div class=\"scj_second\">"+$_scjvar.errors[a]+"</div>\n";
		}
	}
	str1 += "<div class=\"scj_title\">Logs</div>\n";
	for (var a=0; a<$_scjvar.logs.length; a++){
		if (typeof $_scjvar.logs[a] == "object" || typeof $_scjvar.logs[a] == "array"){
			str1 += "<div class=\"scj_second\">"+a+" {</div>\n";
			for (var b in $_scjvar.logs[a]){
				str1 += "<div class=\"scj_third\">"+b+": <span class=\"scj_third_val\">"+$_scjvar.logs[a][b]+"</span></div>\n";
			}
			str1 += "<div class=\"scj_second\">}</div>\n";
		} else {
			str1 += "<div class=\"scj_second\">"+$_scjvar.logs[a]+"</div>\n";
		}
	}
	str1 += "</body>\n";
	str1 += "</html>\n";
	var newWindow = window.open("about:blank","","menubar=1,resizable=1,scrollbars=1,width=700,height=700,");
	newWindow.document.open("text/html");
	newWindow.document.write(str1);
	newWindow.document.close();
};
$_.getCachedElement = function(d){
	if (!d) rturn;
	if (!d.style) d = $get(d);
	var el = "";
	if (d.id) el = d.id;
	else el = d.toString();
	if ($_.isNull($_scjvar.elements[el])) return false;
	else return $_scjvar.elements[el];
};
$_.cacheElement = function(d){
	if (!d) return;
	if (!d.style) d = $get(d);
	var el = "";
	if (d.id) el = d.id;
	else el = d.toString();
	if ($_scjvar.elements[el]) delete($_scjvar.elements[el]);
	$_scjvar.elements[el] = {
		"id": (d.id ? d.id : "none"),
		"className": (d.className ? d.className : "none"),
		"tagName": (d.tagName ? (d.tagName).toLowerCase() : "none"),
		"width": d.offsetWidth,
		"height": d.offsetHeight,
		"borderLeft": ((!isNaN(parseInt($_(d).css("border-left-width"))) && $_(d).css("border-left-style") != "" && typeof parseInt($_(d).css("border-left-width")) == "number") ? parseInt($_(d).css("border-left-width")) : 0),
		"borderRight": ((!isNaN(parseInt($_(d).css("border-right-width"))) && $_(d).css("border-right-style") != "" && typeof parseInt($_(d).css("border-right-width")) == "number") ? parseInt($_(d).css("border-right-width")) : 0),
		"borderTop": ((!isNaN(parseInt($_(d).css("border-top-width"))) && $_(d).css("border-top-style") != "" && typeof parseInt($_(d).css("border-top-width")) == "number") ? parseInt($_(d).css("border-top-width")) : 0),
		"borderBottom": ((!isNaN(parseInt($_(d).css("border-bottom-width"))) && $_(d).css("border-bottom-style") != "" && typeof parseInt($_(d).css("border-bottom-width")) == "number") ? parseInt($_(d).css("border-bottom-width")) : 0),
		"paddingTop": (($_(d).css("padding-top") && typeof parseInt($_(d).css("padding-top")) == "number") ? parseInt($_(d).css("padding-top")) : 0),
		"paddingBottom": (($_(d).css("padding-bottom") && typeof parseInt($_(d).css("padding-bottom")) == "number") ? parseInt($_(d).css("padding-bottom")) : 0),
		"paddingLeft": (($_(d).css("padding-left") && typeof parseInt($_(d).css("padding-left")) == "number") ? parseInt($_(d).css("padding-left")) : 0),
		"paddingRight": (($_(d).css("padding-right") && typeof parseInt($_(d).css("padding-right")) == "number") ? parseInt($_(d).css("padding-right")) : 0)
	};
};
$_.deleteCachedElement = function(d){
	if (!d) return;
	if (d.id) el = d.id;
	else el = d.toString();
	if (!$_.isNull($_scjvar.elements[el]))
	delete($_scjvar.elements[el]);
};
$_.browser = function(){
	function br(){
		/*the different values are as follows:
* 0 -- error: the browser cannot be identified
* 1 -- the browser is Internet Explorer
* 2 -- the browser is Firefox
* 3 -- the browser is Chrome
* 4 -- the browser is Safari
* 5 -- the browser is Opera
*****/
		var usrAgentName = "Unknown";
		var usrAgent = 0;
		var usrVersion = 0;
		var usrRenderedVersion = 0;
		if (/MSIE[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
			var explorerVersion = new Number(RegExp.$1);
			usrAgent = 1;
			usrVersion = explorerVersion;
			usrRenderedVersion = document.documentMode;
			if (usrVersion == document.documentMode)
			usrAgentName = "Internet Explorer";
			else
			usrAgentName = "Internet Explorer (IE" + document.documentMode + " Mode)";
		} else if (/Firefox[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
			var firefoxVersion = new Number(RegExp.$1);
			usrAgent = 2;
			usrVersion = parseInt(firefoxVersion);
			usrRenderedVersion = usrVersion;
			usrAgentName = "Firefox";
		} else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent) && /Chrome/.test(navigator.userAgent)){
			var str = navigator.userAgent;
			var regg = /(.+)Chrome[\/\s](\d+\.\d+\.\d+\.\d+)(.+)/;
			var chromeVersion = str.replace(regg, "$2");
			usrAgent = 3;
			usrVersion = parseInt(chromeVersion);
			usrRenderedVersion = usrVersion;
			usrAgentName = "Chrome";
		} else if (/Safari[\/\s](\d+\.\d+)/.test(navigator.userAgent)){
			var safariVersion = new Number(RegExp.$1);
			usrAgent = 4;
			usrVersion = parseInt(safariVersion/100);
			usrRenderedVersion = usrVersion;
			usrAgentName = "Safari";
		} else if (/Opera[\/](\d+\.\d+)/.test(navigator.userAgent)){
			var str = navigator.userAgent;
			var operaVersion = str.match(/(Version\/)(\d+\.\d+)/);
			usrAgent = 5;
			usrVersion = operaVersion[2];
			usrRenderedVersion = usrVersion;
			usrAgentName = "Opera";
		}
		//return [usrAgent, usrVersion, usrAgentName]; 
		this.agent = usrAgent;
		this.version = usrVersion;
		this.name = usrAgentName;
		this.renderedVersion = usrRenderedVersion;
		this.supports = {
rgb: function(){
				var el = document.getElementsByTagName("html")[0];
				var prevStyle = el.style.color;
				var nextStyle = "rgb(0, 0, 10)";
				if (nextStyle == prevStyle) return true;
				try{
					el.style.color = nextStyle;
					el.style.color = nextStyle;
					el.style.color = nextStyle;
				} catch(e) {}
				if (el.style.color == nextStyle){
					el.style.color = prevStyle;
					return true;
				} else return false;
			},
rgba: function(){
				var el = document.getElementsByTagName("html")[0];
				var prevStyle = el.style.color;
				var nextStyle = "rgba(0, 0, 10, 0.7)";
				if (nextStyle == prevStyle) return true;
				try{
					el.style.color = nextStyle;
					el.style.color = nextStyle;
					el.style.color = nextStyle;
				} catch(e) {}
				if (el.style.color == nextStyle){
					el.style.color = prevStyle;
					return true;
				} else return false;
			},
boxShadow: function(){
				var el = document.getElementsByTagName("html")[0];
				var sType = "";
				switch(usrAgent){
				case 1: 
					sType = "box-shadow";
					break;
				case 2: 
					sType = "-moz-box-shadow";
					break;
				case 3: 
					sType = "-webkit-box-shadow";
					break;
				case 4: 
					sType = "-webkit-box-shadow";
					break;
				case 5: 
					sType = "box-shadow";
					break;
				default: 
					return false;
				}
				var prevStyle = $_(el).css(sType);
				var nextStyle = "0px 0px 10px #0000FF";
				if (nextStyle == prevStyle) return true;
				try{
					$_(el).css(sType, nextStyle);
					$_(el).css(sType, nextStyle);
					$_(el).css(sType, nextStyle);
				} catch(e) {}
				if ($_(el).css(sType) == nextStyle){
					$_(el).css(sType, prevStyle);
					return true;
				} else return false;
			},
borderRadius: function(){
				var el = document.getElementsByTagName("html")[0];
				var sType = "";
				switch(usrAgent){
				case 1: 
					sType = "border-radius";
					break;
				case 2: 
					sType = "-moz-border-radius";
					break;
				case 3: 
					sType = "-webkit-border-radius";
					break;
				case 4: 
					sType = "-webkit-border-radius";
					break;
				case 5: 
					sType = "border-radius";
					break;
				default: 
					return false;
				}
				var prevStyle = $_(el).css(sType);
				var nextStyle = "5px";
				if (nextStyle == prevStyle) return true;
				try{
					$_(el).css(sType, nextStyle);
					$_(el).css(sType, nextStyle);
					$_(el).css(sType, nextStyle);
				} catch(e) {}
				if ($_(el).css(sType) == nextStyle){
					$_(el).css(sType, prevStyle);
					return true;
				} else return false;
			}
		};
	}
	return new br();
};
$_.req = function(arr){
	var ajaxRequest;
	var Jerror;
	try{
		// Opera 8.0+, Firefox, Safari
		ajaxRequest = new XMLHttpRequest();
	} catch (e){
		// Internet Explorer Browsers
		try{
			ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
		} catch (e) {
			try{
				ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
			} catch (e){
				// Something went wrong
				Jerror = e;
				ajaxRequest = false;
			}
		}
	}
	if ($_.isNull(arr))
	return (ajaxRequest ? ajaxRequest : Jerror);
	if ($_.isNull(arr.method) || $_.isNull(arr.url)) return false;

	var method = (new String(arr.method)).toUpperCase();
	var url = (new String(arr.url));
	var asynchronous = $_.isNull(arr.async) ? true : (arr.async ? true : false);
	var data = $_.isNull(arr.data) ? null : arr.data;
	var headers = $_.isNull(arr.headers) ? {} : arr.headers;
	for (var a in arr){
		var newA = "on"+a;
		var a2 = a;
		if (typeof ajaxRequest[newA] != "undefined"){
			ajaxRequest[newA] = function(){
				arr[a2](this);
			};
		}
	}

	var prevX; var curX = 0;
	ajaxRequest.open(method, url, asynchronous);

	for (var x in headers){
		curX++;
		if (curX % 2 == 0){
			ajaxRequest.setRequestHeader(headers[prevX], headers[x]);
		} else prevX = x;
	}

	if (method == "GET")
	ajaxRequest.send();
	else if (method == "POST"){
		if (typeof data == "string")
			ajaxRequest.send(data);
		else if (typeof data == "object"){
			var sendData = "";
			for (var a in data){
				sendData += (sendData.length == 0 ? "" : "&")+a+"="+encodeURIComponent(data[a]);
			}
			sendData = sendData.replace(/\%2B/g, function(w){
				return encodeURIComponent(w); //encode plus signs and other certain characters twice for PHP urldecode workarounds
			});
			ajaxRequest.send(sendData);
		}
	}
	return ajaxRequest;
};
$_.newImage = function(arr){
	var imageRequest = new Image();
	if ($_.isNull(arr) || $_.isNull(arr.url))
	return imageRequest;
	var url = arr.url;
	imageRequest.src = url;
	for (var a in arr){
		var newA = "on"+a;
		for (var b in imageRequest){
			if (/^(on)/i.test(b) && b == newA && newA != "onkeydown" && newA != "onkeypress" && newA != "onkeyup"){
				imageRequest[b] = function(){
					arr[a](this);
				};
			}
		}
	}
};
$_.date = function(string){
	var now = new Date();
	if (!string) return now;
	var textualDays = [];
	textualDays[0]="Sunday";
	textualDays[1]="Monday";
	textualDays[2]="Tuesday";
	textualDays[3]="Wednesday";
	textualDays[4]="Thursday";
	textualDays[5]="Friday";
	textualDays[6]="Saturday";
	var textualMonths = [];
	textualMonths[0]="January";
	textualMonths[1]="February";
	textualMonths[2]="March";
	textualMonths[3]="April";
	textualMonths[4]="May";
	textualMonths[5]="June";
	textualMonths[6]="July";
	textualMonths[7]="August";
	textualMonths[8]="September";
	textualMonths[9]="October";
	textualMonths[10]="November";
	textualMonths[11]="December";
	//getting the day...
	string = string.replace(/d/g, function(){
		return ((now.getDate() >= 10) ? now.getDate() : "0"+now.getDate());
	});
	string = string.replace(/j/g, function(){
		return now.getDate();
	});
	string = string.replace(/N/g, function(){
		return (now.getDay()+1);
	});
	string = string.replace(/w/g, function(){
		return now.getDay();
	});
	string = string.replace(/D/g, function(){
		var currentDay = textualDays[now.getDay()];
		return $_.trimToLength(currentDay, 3);
	});
	string = string.replace(/l/g, function(){
		return textualDays[now.getDay()];
	});
	string = string.replace(/z/g, function(){
		var allDays = 0;
		for (var i=1; i<now.getMonth()+1; i++){
			allDays += (new Date(now.getFullYear(), i, 0)).getDate();
		}
		allDays += now.getDate();
		return allDays;
	});

	//getting the week...
	string = string.replace(/W/g, function(){
		var allDays = 0;
		for (var i=1; i<now.getMonth()+1; i++){
			allDays += (new Date(now.getFullYear(), i, 0)).getDate();
		}
		allDays += now.getDate();
		allDays = allDays/7;
		var allDays2 = new String(allDays);
		allDays2 = allDays2.replace(/(\.\d+)/, "");
		return allDays2;
	});

	//getting the year...
	string = string.replace(/L/g, function(){
		var leapyear = 0;
		if (now.getFullYear() % 4 == 0) leapyear = 1;
		return leapyear;
	});
	string = string.replace(/Y/g, function(){
		return now.getFullYear();
	});
	string = string.replace(/y/g, function(){
		var currentYear = now.getFullYear();
		var cyr2 = new String(currentYear);
		cyr2 = cyr2.replace(/^(\d{2})/, "");
		return parseInt(cyr2);
	});

	//getting the month...
	string = string.replace(/F/g, function(){
		return textualMonths[now.getMonth()];
	});
	string = string.replace(/m/g, function(){
		return (now.getMonth()+1 >= 10) ? now.getMonth()+1 : "0"+(now.getMonth()+1);
	});
	string = string.replace(/M/g, function(){
		var currentMonth = textualMonths[now.getMonth()];
		return $_.trimToLength(currentMonth, 3);
	});
	string = string.replace(/n/g, function(){
		return (now.getMonth()+1);
	});
	string = string.replace(/t/g, function(){
		var allDays = (new Date(now.getFullYear(), (now.getMonth()+1), 0)).getDate();
		return allDays;
	});


	//getting the time...
	string = string.replace(/g/g, function(){
		return Mathf.abs(now.getHours()-12);
	});
	string = string.replace(/G/g, function(){
		return now.getHours();
	});
	string = string.replace(/h/g, function(){
		return "0"+(Mathf.abs(now.getHours()-12));
	});
	string = string.replace(/H/g, function(){
		return ((now.getHours() >= 10) ? now.getHours() : "0"+now.getHours());
	});
	string = string.replace(/i/g, function(){
		return ((now.getMinutes() >= 10) ? now.getMinutes() : "0"+now.getMinutes());
	});
	string = string.replace(/s/g, function(){
		return ((now.getSeconds() >= 10) ? now.getSeconds() : "0"+now.getSeconds());
	});
	return string;
};
$_.trimToLength = function(string, length){
	if ($_.isNull(string) || length == "undefined" || length >= string.length) return string;
	var newString = "";
	for (var i=0; i<length; i++){
		newString += string.charAt(i);
	}
	return newString;
};
$_.newColor = function(r, g, b, a){
	if ($_.isNull(a))
	a = 1;
	function main(er, eg, eb, ea){
		this.r = er;
		this.g = eg;
		this.b = eb;
		this.a = ea;
	}
	return new main(r, g, b, a);
};
$_.HexToRGBA = function(string){
	function main(hex){
		var r = (hex & 0xff0000) >> 16;
		var g = (hex & 0x00ff00) >> 8;
		var b = hex & 0x0000ff;
		this.r = r;
		this.g = g;
		this.b = b;
		this.a = 1;
	}
	if (/\W/g.test(string)){
		string = new String(string);
		string = string.replace(/\W/g, "");
		string = "0x"+string;
	}
	return new main(string);
};
$_.newError = function(errArray){
	if (typeof errArray != "object" || $_scjvar.settings.misc.logErrors == false) return;
	var repObj = {
		time: $_.date("g:i:s"),
		type: (errArray.type ? errArray.type : "unknown"),
		description: (errArray.description ? errArray.description : "unknown"),
		functionName: errArray.name
	};
	$_scjvar.errors.push(repObj);
	if ($_scjvar.settings.misc.logInWindowConsole == true)
		window.console.error("Scrije::Error -> task \""+repObj.functionName+"\" occured with error type \""+repObj.type+"\", message: \""+repObj.description+"\" and at time "+repObj.time+".");
};
$_.newLog = function(logArray){
	if (typeof logArray != "object") return;
	var repObj = {
		time: $_.date("g:i:s"),
		name: (logArray.name ? logArray.name : "unknown"),
		description: (logArray.description ? logArray.description : "unknown")
	};
	$_scjvar.logs.push(repObj);
	if ($_scjvar.settings.misc.logInWindowConsole == true)
		window.console.log("Scrije::Log -> (Time: "+repObj.time+") ["+repObj.name+"]: "+repObj.description);
};
$_.isNull = function(variableBool){
	if (typeof variableBool != "number"){
		if (variableBool == "" || variableBool == null || variableBool == "undefined" || typeof variableBool == "undefined" || variableBool == false)
		return true;
		else return false;
	} else return false;
};
$_.isArray = function(obj){
	try{
		var objCorrectType = (typeof obj == "object" || typeof obj == "function" || typeof obj == "array") ? true : false;
		if (typeof obj == "undefined") return false;
		else if (objCorrectType == true && typeof obj.length != "undefined"){
			try{
				for (var a=0; a<obj.length; a++){
					var j = obj[a];
					obj[a] = j;
					return true;
				}
			} catch (e){
				return false;
			}
		} else return false;
	} catch(e){ return false;}
};
$_.getSelection = function(){
	var sel = "";
	if ($_.browser().agent != 1)
	sel = window.getSelection ? window.getSelection() : (document.getSelection ? document.getSelection() : false);
	else sel = document.selection ? document.selection.createRange().text : false;
	return sel;
};
$_.toCSSValue = function(val){
	val = val.replace(/([A-Z])/g, function(w){
		return "-"+w.charAt(0);
	});
	val = val.toLowerCase();
	if (/^(webkit\-|khtml\-|moz\-|ms\-|o\-)/.test(val))
	val = "-"+val;
	return val;
};
$_.toJSCSSValue = function(val){
	val = val.replace(/[a-z]\-([a-z])/g,
	function (w){
		return w.charAt(0) + w.charAt(2).toUpperCase();
	});
	val = val.replace(/\-/g, "");
	val = val.replace(/^(moz|webkit|o|khtml|icab)/i, function (w){
		var string = "";
		for (var a in w) string += (a == 0 ? w.charAt(0).toUpperCase() : w.charAt(a));
		return string;
	});
	return val;
};
$_.forceHTML5 = function(){
	if ($_.isNull(document.getElementsByClassName)){
		document.getElementsByClassName = function(cl){
			var allElements = new Array();
			for (var i=0; i<document.all.length; i++){
				if (document.all[i].className == cl)
				allElements[allElements.length] = document.all[i];
			}
			return allElements;
		};
	}
	if ($_.browser().agent == 1 && $_.browser().renderedVersion <=8){
		for (var a in document.all){
			if (document.all[a].style && /[a-zA-Z0-9]/i.test(document.all[a].tagName)){
				var elem = $_(document.all[a]);
				var paddingLeft = parseInt(elem.css("padding-left")) ? parseInt(elem.css("padding-left")) : 0;
				var paddingRight = parseInt(elem.css("padding-right")) ? parseInt(elem.css("padding-right")) : 0;
				var paddingTop = parseInt(elem.css("padding-top")) ? parseInt(elem.css("padding-top")) : 0;
				var paddingBottom = parseInt(elem.css("padding-bottom")) ? parseInt(elem.css("padding-bottom")) : 0;
				var padding = parseInt(elem.css("padding")) ? parseInt(elem.css("padding")) : 0;
				paddingLeft = (typeof padding == "number" && paddingLeft == 0) ? padding : paddingLeft;
				paddingRight = (typeof padding == "number" && paddingRight == 0) ? padding : paddingRight;
				paddingTop = (typeof padding == "number" && paddingTop == 0) ? padding : paddingTop;
				paddingBottom = (typeof padding == "number" && paddingBottom == 0) ? padding : paddingBottom;
				var borderLeft = parseInt(elem.css("border-left-width")) ? parseInt(elem.css("border-left-width")) : 0;
				var borderRight = parseInt(elem.css("border-right-width")) ? parseInt(elem.css("border-right-width")) : 0;
				var borderTop = parseInt(elem.css("border-top-width")) ? parseInt(elem.css("border-top-width")) : 0;
				var borderBottom = parseInt(elem.css("border-bottom-width")) ? parseInt(elem.css("border-bottom-width")) : 0;
				var borderWidth = parseInt(elem.css("border-width")) ? parseInt(elem.css("border-width")) : 0;
				borderLeft = (typeof borderWidth == "number" && borderLeft == 0) ? borderWidth : borderLeft;
				borderRight = (typeof borderWidth == "number" && borderRight == 0) ? borderWidth : borderRight;
				borderTop = (typeof borderWidth == "number" && borderTop == 0) ? borderWidth : borderTop;
				borderBottom = (typeof borderWidth == "number" && borderBottom == 0) ? borderWidth : borderBottom;
				var width = (elem.css("width")) ? elem.css("width") : (elem.css("min-width") ? elem.css("min-width") : document.all[a].offsetWidth);
				var height = (elem.css("height")) ? elem.css("height") : (elem.css("min-height") ? elem.css("min-height") : document.all[a].offsetHeight);
				if (typeof width != "number") width = parseInt(width);
				if (typeof height != "number") height = parseInt(height);
				var allWidth = paddingLeft+paddingRight+borderLeft+borderRight+width;
				var allHeight = paddingTop+paddingBottom+borderTop+borderBottom+height;
				elem.css("width", allWidth+"px");
				elem.css("height", allHeight+"px");
			}
		}
	}
};
$_.trim = function(string, min, max){
	if ($_.isNull(min) || $_.isNull(max) || $_.isNull(string)) return string;
	if (min == max) return "";
	if ($_.isNull(max)) max = string.length;
	if (max < 0) max = string.length+max+1;
	min = Mathf.limit(min, 0);
	max = Mathf.limit(max, 0, string.length+1);
	string = $_.trimToLength(string, max);
	var newString = "";
	for (var a=min; a<max; a++)
	newString += string.charAt(a);
	return newString;
};
$_.base64_encode = function(input){
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
	var i = 0;
	function utf8_encode(string){
		string = string.replace(/\r\n/g,"\n");
		var utftext = "";
		for (var n = 0; n < string.length; n++){
			var c = string.charCodeAt(n);
			if (c < 128) {
				utftext += String.fromCharCode(c);
			}
			else if((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			}
			else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}
		}
		return utftext;
	}
	input = utf8_encode(input);
	while (i < input.length) {
		chr1 = input.charCodeAt(i++);
		chr2 = input.charCodeAt(i++);
		chr3 = input.charCodeAt(i++);

		enc1 = chr1 >> 2;
		enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
		enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
		enc4 = chr3 & 63;
		if (isNaN(chr2)) {
			enc3 = enc4 = 64;
		} else if (isNaN(chr3)) {
			enc4 = 64;
		}

		output = output +
		keyStr.charAt(enc1) + keyStr.charAt(enc2) +
		keyStr.charAt(enc3) + keyStr.charAt(enc4);
	}
	return output;
};
$_.base64_decode = function(input){
	var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
	var output = "";
	var chr1, chr2, chr3;
	var enc1, enc2, enc3, enc4;
	var i = 0;
	input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

	while (i < input.length){
		enc1 = keyStr.indexOf(input.charAt(i++));
		enc2 = keyStr.indexOf(input.charAt(i++));
		enc3 = keyStr.indexOf(input.charAt(i++));
		enc4 = keyStr.indexOf(input.charAt(i++));
		chr1 = (enc1 << 2) | (enc2 >> 4);
		chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
		chr3 = ((enc3 & 3) << 6) | enc4;

		output = output + String.fromCharCode(chr1);

		if (enc3 != 64) {
			output = output + String.fromCharCode(chr2);
		}
		if (enc4 != 64) {
			output = output + String.fromCharCode(chr3);
		}
	}
	function utf8_decode(utftext){
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;
		while ( i < utftext.length ) {
			c = utftext.charCodeAt(i);
			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			}
			else if((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i+1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			}
			else {
				c2 = utftext.charCodeAt(i+1);
				c3 = utftext.charCodeAt(i+2);
				string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}
		}
		return string;
	}
	output = utf8_decode(output);
	return output;
};
$_.sleep = function(time){
	if (time <= 0) return;
	var strTime = (new Date()).getTime();
	while ((new Date()).getTime() - strTime < time) continue;
	return "Slept for "+((new Date()).getTime()-strTime)+" milliseconds.";
};
$_.newElement = function(name, arr){
	if (typeof name == "undefined" || typeof name != "string") return false;
	if (typeof arr["document"] != "undefined")
	var newElem = arr["document"].document.createElement(name.toLowerCase());
	else var newElem = document.createElement(name.toLowerCase());
	for (var a in arr){
		switch(a){
		case "css":
			if (typeof arr[a] == "object" || typeof arr[a] == "array")
			$_(newElem).css(arr[a]);
			break;
		case "attributes":
			if (typeof arr[a] == "object" || typeof arr[a] == "array")
			$_(newElem).attr(arr[a]);
			break;
		case "html": 
			$_(newElem).html(arr[a]);
			break;
		case "events":
			if (typeof arr[a] == "object" || typeof arr[a] == "array"){
				for (var b in arr[a]){
					var newB = b.toLowerCase();
					newB = newB.replace(/^on/, "");
					newElem[("on"+newB)] = arr[a][b];
				}
			}
			break;
		default: break;
		}
	}
	newElem.addTo = function(divName, addIn){
		if ($_.isNull(divName)) return false;
		if (!addIn) $_(divName).add(newElem);
		else if (addIn) $_(divName).addIn(newElem);
		return newElem;
	};
	return newElem;
};
$_.stringShift = function(string, amount){
	if (typeof string != "string" || typeof amount == "undefined") return false;
	var endString = "";
	for (var i=0; i<string.length; i++){
		var ch = string.charCodeAt(i);
		ch += amount;
		var newChar = typeof String.fromCharCode(ch) == "undefined" ? String.fromCharCode(string.charCodeAt(i)-amount) : String.fromCharCode(ch);
		endString += newChar;
	}
	return endString;
};
$_.substr_replace = function(string, replacement, str, length){
	var isFakeUndefined = false;
	if (string == "undefined"){  
		string = "u-ndefined"; 
		str++;
		isFakeUndefined = true;
	}
	if (typeof string == "undefined" || typeof replacement == "undefined" || typeof str == "undefined") return false;
	if (typeof length == "undefined") length = 0;
	var before = $_.trim(string, 0, str);
	var after = $_.trim(string, str+length, string.length);
	var newString = before+replacement+after
	if (isFakeUndefined)
	newString = newString.replace(/^u\-/, "u");
	return newString;
};
$_.loadFile = function(path, onload){
	if (typeof onload == "undefined") onload = function(){};
	var ext = path.match(/[^\.][A-z0-9_]+$/)[0].toLowerCase();
	var newFile;
	switch(ext){
		case ("js"||"php"):
			var files = document.getElementsByTagName("script");
			for (var i=0; i<files.length; i++){
				if ($_(files[i]).attr("src") == path){
					onload();
					return "Already loaded.";
				}
			}
			newFile = document.createElement("script");
			$_(newFile).attr({
				type: "text/javascript",
				src: path
			});
			newFile.onload = onload;
		break;
		case "css":
			var files = document.getElementsByTagName("link");
			for (var i=0; i<files.length; i++){
				if ($_(files[i]).attr("href") == path){
					onload();
					return "Already loaded.";
				}
			}
			newFile = document.createElement("link");
			$_(newFile).attr({
				rel: "StyleSheet",
				type: "text/css",
				href: path
			});
		break;
		case ("png"||"gif"||"jpeg"||"jpg"||"bmp"||"tiff"||"webp"):
			var image = new Image();
			image.src = path;
			image.onload = onload;
		break;
		default: return false;
	}
	if (newFile != null){
		document.getElementsByTagName("head")[0].appendChild(newFile);
		if (ext == "css")
			var interv = setInterval(function(){
				for (var i=0; i<document.styleSheets.length; i++){
					if (document.styleSheets[i].ownerNode && document.styleSheets[i].ownerNode == newFile){
						clearInterval(interv);
						onload();
						return true;
					} else if (document.styleSheets[i].owningElement && document.styleSheets[i].owningElement == newFile){
						clearInterval(interv);
						onload();
						return true;
					} else if (newFile.styleSheet && newFile.styleSheet.cssText){
						clearInterval(interv);
						onload();
						return true;
					}
				}
			}, 30);
	}
	return true;
};
$_.timer = function(){
	var strTime = 0;
	var curTime = 0;
	var interv = 0;
	var interv2 = 0;
	var isPaused = false;
	var isDone = false;
	var countFunc;
	var started = false;
	var count = function(){
		if (isDone) return;
		curTime++;
	};
	var obj = {
		started: function(){ return started; },
		start: function(){
			if (obj.started() || isDone) return;
			started = true;
			strTime = (new Date()).getTime();
			interv = setInterval(count, 1);
		},
		time: function(seconds){
			if (seconds == true) return curTime/1000;
			return curTime; 
		},
		pause: function(){
			if (isPaused || isDone) return;
			isPaused = true;
			clearInterval(interv);
			if (interv2) clearInterval(interv2);
		},
		resume: function(){
			if (!isPaused || isDone) return;
			isPaused = false;
			interv = setInterval(count, 1);
			if (typeof countFunc != "undefined")
				interv2 = setInterval(function(){
					if (isDone || isPaused) return;
					countFunc(curTime);
				}, 1);
		},
		end: function(){
			if (isDone) return;
			isDone = true;
			clearInterval(interv);
			if (interv2) clearInterval(interv2);
		},
		count: function(func){
			if (isDone) return;
			if (typeof countFunc != "undefined" && interv2) clearInterval(interv2);
			countFunc = func;
			interv2 = setInterval(function(){
				if (isDone || isPaused) return;
				countFunc(curTime);
			}, 1);
		}
	};
	return obj;
};
$_.searchObj = function(obj, needle, searchForKeys){
	if (searchForKeys) return needle in obj;
	else if (obj) {
		for (var a in obj)
			if (obj[a] == needle) return true;
	}
	return false;
};
$_.assort = function(ls, desc, key){
	var list = ls;
	desc = (typeof desc != "undefined" ? desc : true);
	var arr = [];
	function srt(p){
		for (var i=0; i<list.length; i++){
			if (i==p) continue;
			if (typeof key != "undefined" ? (desc ? (list[i][key] > list[p][key]) : (list[i][key] < list[p][key])) : (desc ? (list[i] > list[p]) : (list[i] < list[p]))){
				srt(++p); return;
			}
		}
		arr.push(list[p]);
		list.splice(p, 1);
		if (list.length > 0) srt(0);
	}
	srt(0);
	return arr;
};

var Mathf = new function(){
	this.abs = function(val){
		var val2 = val >= 0 ? val : 0 - val;
		return val2;
	};
	this.prime = function(val){
		val = Mathf.abs(val);
		for (var i=2; i<val; i++){
			if (val % i == 0)
				return false;
		}
		return true;
	};
	this.rand = function(min, max){
		return (typeof max!="undefined")?(min+Math.round(Math.random()*(max-min))):(min+Math.round(Math.random()*Math.pow(10,10)));
	};
	this.limit = function(val, min, max){
		if (min == null || val == null) return false;
		if (typeof val == "number" && typeof min == "number" && typeof max != "number"){
			val = val < min ? min : val;
		} else if(typeof val == "number" && typeof min == "number" && typeof max == "number"){
			val = val < min ? min : val;
			val = val > max ? max : val;
		}
		return val;
	};
	this.bound = function(val, min, max){
		return (val>=min&&val<=max)?val:((val>max)?(min+(val%(max-min))):(max+(val%(max-min))));
	};
	this.graph = {
		aroundCircularPoint: function(x,y,r,d){
			with(Math)return{x:x+r*parseFloat(cos(PI*d/180).toFixed(14)),y:y+r*parseFloat(sin(PI*d/180).toFixed(14))};
		}
	};
	this.fact = function(n){
		for (var i=n; i>0; i--) n*=(n-i);
		return n;
	};
	this.randVal = function(arr){
		return arr[(Math.round(Math.random()*(arr.length-1)))];
	};
	this.distance = function(x1, y1, x2, y2){
		return Math.sqrt(Math.pow(x1-x2,2)+Math.pow(y1-y2,2));
	}
}

var $_scjvar = {
	settings: {
		effects: {
			rate: 1,
			defaultLength: 2000
		},
		misc: {
			catchErrors: true,
			logErrors: true,
			logInWindowConsole: false
		}
	},
	effects: {
		fadeTimers: new Array(),
		expHeightTimers: new Array(),
		expWidthTimers: new Array(),
		curHeight: new Array(),
		curWidth: new Array(),
		colorTimers: new Array(),
		curColor: new Array(),
		curPos: new Array(),
		posTimers: new Array(),
		curScroll: new Array(),
		scrollTimers: new Array()
	},
	elements: {
	},
	errors: [],
	logs: []
};

