# Projeto: C2F.LA

## Encurtador de URL

### Instalação do MongoDB 3.4, passo a passo:

Para que a instalação ocorra sem problemas, são necessários as seguintes **condições**:

* Instância AWS Ubuntu Server 14.04 LTS, em execução;
* Acesso por SSH;
* Permissão de usuário/key necessária para instalação através do apt-get e atualização;
* Esteja na máquina pelo terminal usando SSH;
* Lembrando de liberar as portas de conexão do MongoDB, para o grupo ID da instância da aplicação URL Shoterner, em NetWork & Security -> Security Groups -> Edit inbound rules. Exemplo e documentação especifica abaixo:

![Security Mongodb on AWS](http://docs.aws.amazon.com/quickstart/latest/mongodb/images/inbound-rules.png)
[MongoDB on AWS](http://docs.aws.amazon.com/quickstart/latest/mongodb/security.html)


**Passos:**

01 - Execute o comando abaixo para importar a chave pública usada pelo sistema de gerenciamento de pacotes:

`sudo apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 0C49F3730359A14518585931BC711F9BA15703C6`

02 - Crie um arquivo executando o comando abaixo:

`echo "deb [ arch=amd64 ] http://repo.mongodb.org/apt/ubuntu trusty/mongodb-org/3.4 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-3.4.list`

03 - Para atualizar, use:  

`sudo apt-get update`

04 - Para instalar o MongoDB, execute o comando:

`sudo apt-get install -y mongodb-org`

05 - Acesse o arquivo mongodb.conf com o editor Vi, usando o comando:

`sudo vi /etc/mongod.conf`

06 - Comentar a seguinte linha:

`bind_Ip = 127.0.0.1` -> `#bind_Ip = 127.0.0.1`

07 - Acesse o MongoDB e execute os seguintes comandos:

`mongo`

`use c2fla`

`db.counters.insert({ _id: 'url_count', seq: 1 });`

08 - Criar usuário para o serviço acessar o banco com segurança e do super usuário administrador:

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

**Observação: memorize o usuário e senha informado, pois precisará informar na fase de instalação da aplicação de encurtamento de URL.**


09 - Para ativar todas as alterações reinicie o serviço do MongoDB com o comando a seguir:

`sudo service mongod stop`

`sudo mongod --fork --auth --quiet --config /etc/mongod.conf`

10 - Vamos editar o crontab para que o MongoDB retorne caso a instância seja reiniciada, execute o comendo abaixo:

`sudo crontab -e`

 10.1 - Adicione esta linha ao arquivo:

`@reboot sudo mongod --fork --auth --quiet --config /etc/mongod.conf`

**Parabéns, finalizamos a fase de instalação e configuração do banco de dados.**


### Instalação do URL Shoterner Passo a Passo

Para que a instalação ocorra sem problemas, são necessários as seguintes **condições**:

* Instância AWS Ubuntu Server 14.04 LTS, em execução;
* Acesso por SSH;
* Permissão de usuário/key necessária para instalação através do apt-get e atualização;
* Esteja na máquina pelo terminal usando SSH.
* Lembrando de liberar a porta 80. Exemplo e documentação especifica abaixo:

![Security Web Server on AWS](https://s3.us-east-2.amazonaws.com/lenines/c2fla/images/Captura+de+Tela+2017-11-11+às+18.25.05.png)
[Web Server on AWS](http://docs.aws.amazon.com/pt_br/AWSEC2/latest/UserGuide/security-group-rules-reference.html)

**Passos:**

01 - O primeiro comando será para atualizar, use:  

`sudo apt-get update`

02 - Para baixar e instalar o Git, execute o seguinte comando:

`sudo apt-get install -y git`

03 - Baixo o projeto fazendo um clone do repositório com o seguinte comando:   

 `git clone https://github.com/fabiolenine/c2fla.git`

04 - Acessa a pasta com o seguinte comando:

`cd c2fla/`

05 - Para instalar os frameworks: Nodejs, NPM, PM2, Express, Mongoose e body-parser, execute o seguinte comando:

`sh install.sh`

06 - Responda Y, todas as vezes que perguntarem:

>Do you want to continue? [Y/n]

07 - Informe o IP privado, usuário e senha, para a aplicação encurtador de URL acessar o MongoDB, edite o arquivo keys/configdb.js, com o seguinte comando:

`sudo vi keys/configdb.js`

08 - Informe ao serviço de encurtamento de URL o domínio ou IP Publico válido, executando o comando a seguir:

`sudo vi modules/parameters.js`

**Parabéns, finalizamos a fase de instalação e configuração do WebService encurtador de URL.**


### Iniciar o WebService encurtador de URL

Para executar a aplicação WebService há apenas um passo, execute o comando abaixo:

`sh start.sh`

Para monitorar utilize o comando abaixo:

`sudo pm2 monit`

**Parabéns, finalizamos a fase de inicialização do WebService e boa sorte!!!**
