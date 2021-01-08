//imports
var express = require('express');
const { Sequelize } = require('sequelize');
var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter').router;

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