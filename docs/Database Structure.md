MySQL Database Format
=====================

_Below is a draft of the MySQL database structure for Bumbuu..._

Format: <br>
###bumbuuco_MySQL DB USER
####bumbuuco_DBNAME (MORE INFORMATION) <br>
#####TABLE NAME
*	EXAMPLE COLUMN: _DATA TYPE_ (MORE INFORMATION)

-------------------------------

###bumbuuco_usrdata
####bumbuuco_users
#####user_USERID
*	UserID: _BIGINT_ (unique integer value; indexed)
*	Username: _VARCHAR()_ (**debate: can be changed or not?**)
*	Password: _CHAR(256)_ (salted SHA256()-encrypted)
*	Email: _VARCHAR(254)_ (254 is current email length maximum specified in [RFC 5321](http://tools.ietf.org/html/rfc5321#section-4.5.3))
*	Active: _Boolean_
*	JoinDate: _Date_
*	RealName: _VARCHAR(40)_
*	Country: _VARCHAR(64)_
*	PSalt: _CHAR(20)_ (salt for password; plaintext)
*	Gender: _CHAR(1)_ ("m"=male; "f"=female; "u"=unspecified)
*	Icon: _VARCHAR(256)_ (contains local URL of uploaded icon at bumbuu.com/files/users/<USERNAME>/def.<EXT>)
<br>**Note that all preferences from here on will be denoted with the prefix "Pref\_"**
*	Pref\_TimeOffset: _String_ (PHP timezone; i.e. America/New_York; see [PHP Timezones](http://php.net/manual/en/timezones.php))
*	Pref\_ShowEmail: _String_ ("Everyone", List of people, "Only Followers", "None")
*	Pref\_ShowBuzzes: _String_ ("Everyone", List of people, "Only Followers", "None")
*	Pref\_ShowBuzzLocation: _String_ (Involves decision to show location in buzzes, but is **not retroactive**; "Everyone", List of people, "Only Followers", "None")
*	Pref\_NotifyFollowRequest: _Boolean_
*	Pref\_NotifyNewMessage: _Boolean_
*	Pref\_NotifyNewHiveRequest: _Boolean_
*	Pref\_ContentCensorLanguage: _Boolean_
*	Pref\_ContentCensorContent: _Boolean_ (uses algorithm to censor pictures/media in addition to text)

#####buzzes_USERID
*	BuzzID: _Integer_ (unique integer incremented value)
*	Content: _String_
*	DatePosted: _Date_
*	Device: _String_ (could be "Computer", "Windows Phone", "Android", et cetera...)

#####followers_USERID
*	UserID: _String_ (unique string value of other users)
