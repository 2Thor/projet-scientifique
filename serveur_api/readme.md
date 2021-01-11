WARNING : FAIRE TOUTES CES COMMANDES DANS LE DOSSIER DU SERVEUR

Installer nodejs : https://nodejs.org/en/

npm init
npm install express 

npm install -g nodemon !! En administrateur !!

npm install body-parser --save

npm install bcrypt --save

test --> nodemon

( Si pas les autorisations suivre les instructions ci-dessous )
En powershell administrateur :
Get-ExecutionPolicy
Set-ExecutionPolicy Unrestricted

------------ Installation de l'ORM Sequelize -----------------

npm install -g sequelize-cli

npm run sequelize:database1:migrate

Ne pa faire : sequelize db:migrate

https://medium.com/unetiq/using-multiple-databases-with-nodejs-and-sequelize-59e0abcbbe6f

SEQUELIZE DATABABSE 

sequelize model:create --attributes "nom:string vitesse:integer efficacite:integer" --name type_vehicule
sequelize model:create --attributes "idType:integer idFeu:integer idCaserne:integer idCoordonnee:integer" --name vehicule
sequelize model:create --attributes "intensite:integer idCoordonnee:integer" --name feu_simule
sequelize model:create --attributes "latitude:integer longitude:integer" --name Coordonnee
sequelize model:create --attributes "nom:string max_camion:integer idCoordonnee:integer" --name caserne
sequelize model:create --attributes "intensite:integer idCoordonnee:integer" --name feu_reel