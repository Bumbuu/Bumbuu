/*****
 * Default user elements for Bumbuu...
 * 2013 Bumbuu
******/

function initiate_default_elements() {
	/* This function simply initiates certain mouse
	   event captures based on the properties of 
	   each standard user control. */
	//sliders
	if (typeof $_ == "undefined") {
		throw new Error("Requires ScriJe API, at http://bumbuu.com/files/js/scrije.lib.js");
		return false;
	}
	var sliders = $_(".bumbuu_slider_handle");
	for (var i=0; i<sliders.div.length; i++)
		$_(sliders.div[i]).mousedown(function(ev) {
			if ($_(this.parentNode).attr("type") == "vertical") {
				var orig_y = (ev.pageY || ev.clientY) - $_(this.parentNode).offset().y;
				var orig_m = parseInt($_(this).css("margin-top"));
				$_(this).mousemove(function(e) {
					var y = (e.pageY || e.clientY) - $_(this.parentNode).offset().y;
					var new_m = orig_m + y-orig_y > $_(this.parentNode).offsetHeight()-$_(this).offsetHeight()/2 ?
								$_(this.parentNode).offsetHeight()-$_(this).offsetHeight()/2 :
								(orig_m + y-orig_y < -$_(this).offsetWidth()/2 ? -$_(this).offsetWidth()/2 : orig_m + y-orig_y);
					$_(this).css("margin-top", new_m+"px");
				});
			} else {
				var orig_x = (ev.pageX || ev.clientX) - $_(this.parentNode).offset().x;
				var orig_m = parseInt($_(this).css("margin-left"));
				$_(this).mousemove(function(e) {
					var x = (e.pageX || e.clientX) - $_(this.parentNode).offset().x;
					var new_m = orig_m + x-orig_x > $_(this.parentNode).offsetWidth()-$_(this).offsetWidth()/2 ?
								$_(this.parentNode).offsetWidth()-$_(this).offsetWidth()/2 :
								(orig_m + x-orig_x < -$_(this).offsetWidth()/2 ? -$_(this).offsetWidth()/2 : orig_m + x-orig_x);
					$_(this).css("margin-left", new_m+"px");
				});
			}
			$_(this).mouseout(function() {
				$_(this).mouseout(false);
				$_(this).mousemove(false);
				$_(this).mouseup(false);
			});
			$_(this).mouseup(function() {
				$_(this).mouseup(false);
				$_(this).mouseout(false);
				$_(this).mousemove(false);
			});
		});
	//labels
	var labels = $_(".bumbuu_label");
	for (var i=0; i<labels.div.length; i++) {
		var label = $_(labels.div[i]);
		var labeled_item = $_("#"+label.attr("for"));
		//if (!labeled_item) continue;
		label.css("display", "block");
		var x = labeled_item.offset().x + labeled_item.offsetWidth()/2 - label.offsetWidth()/2,
			y = labeled_item.offset().y + (label.attr("type")=="above" ? -labeled_item.offsetHeight()/2 - label.offsetHeight() : labeled_item.offsetHeight()*3/2);
		$_(labels.div[i]).css({
			left: x+"px",
			top: y+"px"
		});
		if (!labeled_item.attr("to"))
			labeled_item.attr("to", labels.div[i].id);
		$_(labels.div[i]).css("display", "none");
		labeled_item.mouseover(function() {
			var labeldiv = $_("#"+$_(this).attr("to"));
			labeldiv.effects.fadeTo(90, 400);
		});
		labeled_item.mouseout(function() {
			var labeldiv = $_("#"+$_(this).attr("to"));
			labeldiv.effects.fadeTo(0, 400);
		});
	}
	//checkboxes
	var checkboxes = $_(".bumbuu_checkbox_light, .bumbuu_checkbox_dark");
	for (var i=0; i<checkboxes.div.length; i++)
		$_(checkboxes.div[i]).click(function() {
			$_(this).attr("value", $_(this).attr("value")=="checked" ? "unchecked" : "checked");
		});
	var switch_handles = $_(".bumbuu_switch_light_handle");
		for (var i=0; i<switch_handles.div.length; i++) {
			$_(switch_handles.div[i]).effects.toPosition("margin-left", [0, 40][($_(switch_handles.div[i].parentNode).attr("value")=="on" ? 1 : 0)], 300);
			$_(switch_handles.div[i]).mousedown(function(ev) {
				var orig_x = (ev.pageX || ev.clientX) - $_(this.parentNode).offset().x;
				var orig_m = parseInt($_(this).css("margin-left"));
				var has_moved = false;
				$_(this).mousemove(function(e) {
					has_moved = true;
					var x = (e.pageX || e.clientX) - $_(this.parentNode).offset().x;
					var new_x = orig_m+x-orig_x < 0 ? 0 : (orig_m+x-orig_x > 40 ? 40 : orig_m+x-orig_x);
					$_(this).css("margin-left", new_x+"px");
				});
				$_(this).mouseout(function() {
					var is_on = Math.round(($_(this).offset().x-$_(this.parentNode).offset().x)/40);
					$_(this.parentNode).attr("value", ["off", "on"][is_on]);
					$_(this).effects.toPosition("margin-left", [0, 40][is_on], 300);
					$_(this).mousemove(false);
					$_(this).mouseup(false);
					$_(this).mouseout(false);
				});
				$_(this).mouseup(function() {
					if (!has_moved) //it was a static click
						var is_on = $_(this.parentNode).attr("value")=="on" ? 0 : 1; //toggle
					else var is_on = Math.round(($_(this).offset().x-$_(this.parentNode).offset().x)/40);
					$_(this.parentNode).attr("value", ["off", "on"][is_on]);
					$_(this).effects.toPosition("margin-left", [0, 40][is_on], 300);
					$_(this).mousemove(false);
					$_(this).mouseup(false);
					$_(this).mouseout(false);
				});
			});
		}
}
