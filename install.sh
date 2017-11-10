echo "Begin install Nodejs..."
#Install Nodejs
sudo apt-get install nodejs
echo "Begin install NPM..."
#Install NPM
sudo apt-get install npm
echo "Begin install Express, Mongoose and Body-parser..."
#Install Express, Mongoose and Body-parser
npm install
echo "Begin install PM2..."
#Install PM2
sudo npm install pm2@latest -g
echo "Begin nodejs-legacy..."
#Install nodejs-legacy
sudo apt-get install nodejs-legacy
echo "Game over!"
