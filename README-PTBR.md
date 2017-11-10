# Projecto: C2F.LA

## Encurtador de URL

### Instalação Passo a Passo

Para que a instalação ocorra sem problemas, são necessários as seguintes **condições**:

* Instância AWS Ubuntu Server 14.04 LTS, em execução;
* Acesso por SSH;
* Permissão de usuário/key necessária para instalação através do apt-get e atualização;
* Esteja na máquina pelo terminal usando SSH.

**Passos:**

01 - O primeiro comando será para atualizar, use:  

`sudo apt-get update`

02 - Para baixar e instalar o Git, execute o seguinte comando:

`sudo apt-get install git`

03 - Responda Y, quando perguntar:

>Do you want to continue? [Y/n]

04 - Baixo o projeto fazendo um clone do repositório com o seguinte comando:   

 `git clone https://github.com/fabiolenine/c2fla.git`

05 - Acessa a pasta com o seguinte comando:

`cd c2fla/`

06 - Para instalar os frameworks: Nodejs, NPM, PM2, Express, Mongoose e body-parser, execute o seguinte comando:

`sh install.sh`

07 - Responda Y, todas as vezes que perguntarem:

>Do you want to continue? [Y/n]

08 - 
