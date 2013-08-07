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
#####user_friends
-	*This might wind up being slightly large...*
*	Friend1: **UNSIGNED INT(64)** (user ID of friend 1)
*	Friend2: **UNSIGNED INT(64)** (user ID of friend 2)

#####user_followers
-	*This might wind up being slightly large...*
*	Followee: **UNSIGNED INT(64)** (user ID of person being followed)
*	Follower: **UNSIGNED INT(64)** (user ID of person following)

#####userlist
*	UserID: **UNSIGNED INT(64)** (unique integer value; indexed; auto-increments)
*	Username: **VARCHAR(40)** (unique textual name)
*	Password: **VARCHAR(255)** (salted SHA256()-encrypted)
<br>_Note that using a varchar maximum length of 255 instead of 256 is more efficient. See [here](http://dev.mysql.com/doc/refman/5.0/en/char.html)._
*	Email: **VARCHAR(254)** (254 is current email length maximum specified in [RFC 5321](http://tools.ietf.org/html/rfc5321#section-4.5.3); is unique)
*	Active: **Boolean** (defaults to `false` until user activates account)
*	JoinDate: **Date**
*	FirstName: **VARCHAR(20)**
*	LastName: **VARCHAR(20)**
*	Country: **ENUM('Unspecified', list of countries...)** (defaults to "Unspecified")
*	Language: **ENUM(supported languages...)** (defaults to "English")
*	PSalt: **CHAR(20)** (salt for password; plaintext)
*	Gender: **ENUM('male','female','unspecified')** (male; female; unspecified, which is default)
*	Icon: **VARCHAR(255)** (contains local URL of uploaded icon at `bumbuu.com/files/users/USERNAME/def.EXT`)
*	Bio: **VARCHAR(1024)** (autobiographical component)
<br>_Note that all preferences from here on will be denoted with the prefix "Pref\_"_
*	Pref\_TimeOffset: **VARCHAR(48)** (PHP timezone; i.e. America/New_York; see [PHP Timezones](http://php.net/manual/en/timezones.php))
*	Pref\_ShowEmail: **ENUM('Everyone', 'OnlyFollowers', 'None')** (default is Everyone)
*	Pref\_ShowBuzzes: **ENUM('Everyone', 'OnlyFollowers', 'None')** (default is Everyone)
*	Pref\_ShowBuzzLocation: **ENUM('Everyone', 'OnlyFollowers', 'None')** (Involves decision to show location in buzzes, but is **not retroactive**; default is OnlyFollowers)
*	Pref\_NotifyFollowRequest: **Boolean** (default is true)
*	Pref\_NotifyNewMessage: **Boolean** (default is true)
*	Pref\_NotifyNewHiveRequest: **Boolean** (default is true)
*	Pref\_ContentCensorLanguage: **Boolean** (default is false)
*	Pref\_ContentCensorContent: **Boolean** (uses algorithm to censor pictures/media in addition to text; default is false)

#####buzzes_USERID
*	BuzzID: **UNSIGNED INT(64)** (unique integer incremented value)
*	Content: **VARCHAR(65535)** (raw textual user content; utf-8)
*	DatePosted: **Date** (date/time stamp of post)
*	Device: **VARCHAR(64)** (could be "Computer", "Windows Phone", "Android", et cetera...)
*	Location: **VARCHAR(64)** (is recorded when **Pref\_ShowBuzzLocation** is set to anything other than 'None')

###bumbuuco_sendata
####bumbuuco_miscInfo
#####CountryList
*	ShortName: **CHAR(2)** (the two-letter abbreviated name of the country or area; unique; primary)
*	FullName: **VARCHAR(50)** (the full name of the country; unique)
*	TimeZone: **VARCHAR(40)** (the corresponding timezone for that country)
