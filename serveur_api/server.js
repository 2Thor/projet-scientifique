//imports
var express = require('express');
const { Sequelize } = require('sequelize');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;
const env = process.env.NODE_ENV || 'development';

//Load the configuration from the config.js
const config = require('./config/config_2_BDD.json')[env];

//Create an empty object which can store our databases
const db = {};

//Extract the database information into an array
const databases = Object.keys(config.databases);

//Loop over the array and create a new Sequelize instance for every database from config.js
for(let i = 0; i < databases.length; ++i) {
    let database = databases[i];
    let dbPath = config.databases[database];
    //Store the database connection in our db object
    db[database] = new Sequelize( dbPath.database, dbPath.username, dbPath.password, dbPath );
}



//Instantiate server
var server = express();

//bodyParser configuration ( permet de récupérer les arguments & paramètres fournit dans le body d'une requete http   )
server.use(bodyParser.urlencoded({ extended: true })); //Force le parse d'objet incult dans d'autre 
server.use(bodyParser.json());

//Configure routes
server.get('/',function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon serveur</h1>');
});

server.use('/api/', apiRouter);

//Launch server
server.listen(8080, function() {
      console.log('Serveur en écoute')
});