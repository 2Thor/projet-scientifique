WARNING : FAIRE TOUTE CES COMMANDES DANS LE DOSSIER DU SERVEUR

Installer nodejs : https://nodejs.org/en/

npm init
npm install express 

npm install -g nodemon !! En administrateur !!

test --> nodemon

( Si pas les autorisations suivre les instructions ci-dessous )
En powershell administrateur :
Get-ExecutionPolicy
Set-ExecutionPolicy Unrestricted

------------ Installation de l'ORM Sequelize -----------------

npm install -g sequelize-cli

sequelize db:migrate

https://medium.com/unetiq/using-multiple-databases-with-nodejs-and-sequelize-59e0abcbbe6f

npm install body-parser --save

npm install bcrypt --save

SEQUELIZE DATABABSE 

sequelize model:create --attributes "nom:string vitesse:integer efficacite:integer" --name vehicule
sequelize model:create --attributes "nom:string vitesse:integer efficacite:integer" --name camion
sequelize model:create --attributes "idType:integer idFeu:integer idCaserne:integer idPoint:integer" --name Camion_affecte