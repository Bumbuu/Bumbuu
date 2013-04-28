MySQL Database Format
=====================

_Below is a draft of the MySQL database structure for Bumbuu..._

Format: <br>
###bumbuuco_MySQL DB USER
####bumbuuco_DBNAME (MORE INFORMATION) <br>
#####TABLE NAME
*	EXAMPLE COLUMN: _DATA TYPE_ (MORE INFORMATION)

-------------------------------

###bumbuuco_userdata
####bumbuuco_users
#####user_USERID
*	UserID: _String_ (unique string value)
*	Username: _String_ (**debate: can be changed or not?**)
*	Password: _String_ (salted SHA256()-encrypted)
*	Email: _String_
*	Active: _Boolean_
*	JoinDate: _Date_
*	RealName: _String_
*	Country: _String_
*	PSalt: _String_ (salt for password; plaintext)
*	Gender: _String_ 
*	Icon: _String_ (contains local URL of uploaded icon at bumbuu.com/files/users/<USERNAME>/def.<EXT>)
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
*	Content: _String_ (blob)
*	DatePosted: _Date_
*	Device: _String_ (could be "Computer", "Windows Phone", "Android", et cetera...)

#####followers_USERID
*	UserID: _String_ (unique string value of other users)
