echo "Begin install NPM..."
sudo apt-get install -y npm
echo "Begin install AWS-SDK..."
sudo npm install aws-sdk
echo "Atualizar os pacotes para a versão 6.x do Nodejs..."
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
echo "Begin install Nodejs..."
sudo apt-get install -y nodejs
echo "Begin install Express, Mongoose , EJS and Body-parser..."
npm install
echo "Begin install PM2..."
sudo npm install pm2@latest -g
echo "Begin nodejs-legacy..."
sudo apt-get install -y nodejs-legacy
echo "Begin build-essential..."
sudo apt-get install -y build-essential
echo "Game over!"
