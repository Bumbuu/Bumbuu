/*****
 * Default user elements for Bumbuu...
 * 2013 Bumbuu
******/

function initiate_default_elements() {
	/* This function simply initiates certain mouse
	   event captures based on the properties of 
	   each standard user control. */
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
	var checkboxes = $_(".bumbuu_checkbox_light, .bumbuu_checkbox_dark");
	for (var i=0; i<checkboxes.div.length; i++)
		$_(checkboxes.div[i]).click(function() {
			$_(this).attr("value", $_(this).attr("value")=="checked" ? "unchecked" : "checked");
		});
	var switches = $_(".bumbuu_switch_light");
		for (var i=0; i<switches.div.length; i++) {
			$_(switches.div[i]).click(function(e) {
				var handle = this.getElementsByClassName("bumbuu_switch_light_handle")[0];
				
			});
}
