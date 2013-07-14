/*****
 * Default user elements for Bumbuu...
 * 2013 Bumbuu
******/

function initiate_default_elements() {
	/* This function simply initiates certain mouse
	   event captures based on the properties of 
	   each standard user control. */
	for (var slider in document.getElementsByClassName("bumbuu_slider")) {
		for (var handle in slider.getElementsByClassName("bumbuu_slider_handle"))
			handle.addEventListener("mousedown", function() {
				slider.addEventListener("mousemove", function(event) {
					var pos_x = (event.clientX || event.pageX);
					var pos_y = (event.clientY || event.pageY);
					//if (handle.getAttribute("type") == "horizontal")
					//	handle.style.marginLeft = 
				});
			});
	}
}
