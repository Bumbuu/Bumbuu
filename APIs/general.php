<?php
//general.php - general functions for use across Bumbuu

class Bumbuu {
	//security
	public static function generate_salt() {
		//default salt length for Bumbuu is 20 characters
		mt_srand(mt_rand()); //seed random number generator
		return substr(hash("sha256", mt_rand()), 0, 20);
	}
}

?>
