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
#####friends
-	*This might wind up being slightly large...*
*	Friend1: **BIGINT(256)** (user ID of friend 1)
*	Friend2: **BIGINT(256)** (user ID of friend 2)	

#####userlist
*	UserID: **BIGINT(256)** (unique integer value; indexed; auto-increments)
*	Username: **VARCHAR(60)** (**debate: can be changed or not?**)
*	Password: **VARCHAR(256)** (salted SHA256()-encrypted)
*	Email: **VARCHAR(254)** (254 is current email length maximum specified in [RFC 5321](http://tools.ietf.org/html/rfc5321#section-4.5.3))
*	Active: **Boolean**
*	JoinDate: **Date**
*	RealName: **VARCHAR(40)**
*	Country: **VARCHAR(64)**
*	PSalt: **CHAR(20)** (salt for password; plaintext)
*	Gender: **CHAR(1)** ("m"=male; "f"=female; "u"=unspecified)
*	Icon: **VARCHAR(256)** (contains local URL of uploaded icon at bumbuu.com/files/users/**USERNAME**/def.**EXT**)
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

#####followers_USERID
*	UserID: **String** (unique string value of other users)
