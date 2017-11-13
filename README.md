# Project: C2F.LA

## URL Shortener

[Portuguese version](https://github.com/fabiolenine/c2fla/blob/master/README-PTBR.md)



### Installing MongoDB 3.4, step-by-step:

For installation to occur smoothly, the following **conditions** are required:

* Instance AWS Ubuntu Server 14.04 LTS, running;
* SSH access;
* User / key permission required for installation through apt-get and update;
* Be on the machine by the terminal using SSH;
* Remember to unlock the connection ports of MongoDB, to the group ID of the application instance URL Shoterner, in NetWork & Security -> Security Groups -> Edit inbound rules. Example and documentation specified below:

![Security Mongodb on AWS](http://docs.aws.amazon.com/quickstart/latest/mongodb/images/inbound-rules.png)
[MongoDB on AWS](http://docs.aws.amazon.com/quickstart/latest/mongodb/security.html)

**Steps:**

01 - Execute the following command to import the public key used by the package management system:

`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`

02 - Create a file by executing the command below:

`echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`

03 - To upgrade, use:

`sudo apt-get update`

04 - To install MongoDB, run the command:

`sudo apt-get install -y mongodb-org`

05 - Access the mongodb.conf file with the Vi editor, using the command:

`sudo vi /etc/mongod.conf`

06 - Comment on the following line:

`bind_Ip = 127.0.0.1` -> `#bind_Ip = 127.0.0.1`

07 - Access MongoDB and execute the following commands:

`mongo`

`use c2fla`

`db.counters.insert({ _id: 'url_count', seq: 1 });`

08 - Create user for the service access the bank with security and the super administrator user:

```
use admin

db.createUser({user: "ENTER THE NAME OF ADMIN HERE", pwd: "ENTER THE ADMIN PASSWORD HERE", roles:["root"]})

db.auth("ENTER THE NAME OF ADMIN HERE", "ENTER THE ADMIN PASSWORD HERE")

use c2fla

db.createUser(
   {
     user: "ENTER THE USERNAME OF THE SHORTENER URL",
     pwd: "ENTER THE SHORTENER URL USER PASSWORD HERE",
     roles: [ {role: "readWrite", db: "c2fla"} , { role: "read", db: "admin" }]
   }
)

exit
```

**Note: Memorize the user and password informed, as you will need to inform in the installation phase of the URL shortening application.**

09 - To enable all changes, restart the MongoDB service with the following command:

`sudo service mongod stop`

`sudo mongod --fork --auth --quiet --config /etc/mongod.conf`

10 - Let's edit the crontab so that MongoDB returns if the instance is restarted, run the following command:

`sudo crontab -e`

10.1 - Add this line to the file:

`@reboot sudo mongod --fork --auth --quiet --config /etc/mongod.conf`

**Congratulations, we have completed the installation and configuration phase of the database.**


### Installing the Shoterner URL Step by Step

For installation to occur smoothly, the following **conditions** are required:

* Instance AWS Ubuntu Server 14.04 LTS, running;
* SSH access;
* User / key permission required for installation through apt-get and update;
* Be on the machine by the terminal using SSH.
* Remembering to release port 80. Example and documentation specified below:

![Security Web Server on AWS](https://s3.us-east-2.amazonaws.com/lenines/c2fla/images/Captura+de+Tela+2017-11-11+às+18.25.05.png)
[Web Server on AWS](http://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/security-group-rules-reference.html)

**Steps:**

01 - The first command will be to update, use:

`sudo apt-get update`

02 - To download and install Git, run the following command:

`sudo apt-get install -y git`

03 - Down the project by making a repository clone with the following command:

`git clone <LINK URL REPORSITORY github>`

04 - Access the folder with the following command:

`cd c2fla/`

05 - To install the frameworks: Nodejs, NPM, PM2, Express, Mongoose and body-parser, execute the following command:

`sh install.sh`

06 - Inform the private IP, user and password, for the URL shortcut application to access MongoDB, edit the keys / configdb.js file, with the following command:

`sudo vi keys/configdb.js`

07 - Inform the URL shortening service of the valid public domain or IP, by executing the following command:

`sudo vi modules/parameters.js`

**Congratulations, we have completed the installation and configuration phase of the WebService URL shortener.**


### Starting the URL Shortener WebService

To run the WebService application there is only one step, run the command below:

`sh start.sh`

To monitor use the command below:

`sudo pm2 monit`

**Congratulations, we have finished the WebService startup phase and good luck !!!**
