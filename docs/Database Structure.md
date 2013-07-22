MySQL Database Format
=====================

_Below is a draft of the MySQL database structure for Bumbuu..._

Format: <br>
###bumbuuco_MySQL DB USER
####bumbuuco_DBNAME (MORE INFORMATION) <br>
#####TABLE NAME
*	EXAMPLE COLUMN: **DATA TYPE** (MORE INFORMATION)

-------------------------------

###bumbuuco_usrdata
####bumbuuco_users
#####user_relationships
-	*This might wind up being slightly large...*
*	Friend1: **UNSIGNED INT(64)** (user ID of friend 1)
*	Friend2: **UNSIGNED INT(64)** (user ID of friend 2)	
*	Followee: **UNSIGNED INT(64)** (user ID of person being followed)
*	Follower: **UNSIGNED INT(64)** (user ID of person following)

#####userlist
*	UserID: **UNSIGNED INT(64)** (unique integer value; indexed; auto-increments)
*	Username: **VARCHAR(40)** (unique textual name)
*	Password: **VARCHAR(255)** (salted SHA256()-encrypted)
_Note that using a varchar maximum length of 255 instead of 256 is more efficient. See [here](http://dev.mysql.com/doc/refman/5.0/en/char.html)._
*	Email: **VARCHAR(254)** (254 is current email length maximum specified in [RFC 5321](http://tools.ietf.org/html/rfc5321#section-4.5.3); is unique)
*	Active: **Boolean** (defaults to `false` until user activates account)
*	JoinDate: **Date**
*	RealName: **VARCHAR(40)**
*	Country: **VARCHAR(64)**
*	PSalt: **CHAR(20)** (salt for password; plaintext)
*	Gender: **CHAR(1)** ("m"=male; "f"=female; "u"=unspecified, which is default)
*	Icon: **VARCHAR(255)** (contains local URL of uploaded icon at bumbuu.com/files/users/**USERNAME**/def.**EXT**)
*	Bio: **VARCHAR(1024)** (autobiographical component)
<br>_Note that all preferences from here on will be denoted with the prefix "Pref\_"_
*	Pref\_TimeOffset: **String** (PHP timezone; i.e. America/New_York; see [PHP Timezones](http://php.net/manual/en/timezones.php))
*	Pref\_ShowEmail: **String** ("Everyone", List of people, "Only Followers", "None")
*	Pref\_ShowBuzzes: **String** ("Everyone", List of people, "Only Followers", "None")
*	Pref\_ShowBuzzLocation: **String** (Involves decision to show location in buzzes, but is **not retroactive**; "Everyone", List of people, "Only Followers", "None")
*	Pref\_NotifyFollowRequest: **Boolean**
*	Pref\_NotifyNewMessage: **Boolean**
*	Pref\_NotifyNewHiveRequest: **Boolean**
*	Pref\_ContentCensorLanguage: **Boolean**
*	Pref\_ContentCensorContent: **Boolean** (uses algorithm to censor pictures/media in addition to text)

#####buzzes_USERID
*	BuzzID: **Integer** (unique integer incremented value)
*	Content: **String**
*	DatePosted: **Date**
*	Device: **String** (could be "Computer", "Windows Phone", "Android", et cetera...)
