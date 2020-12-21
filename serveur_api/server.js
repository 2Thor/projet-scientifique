//imports
var express = require('express');
const { Sequelize } = require('sequelize');

//Instantiate server
var server = express();

//Configure routes
server.get('/',function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.status(200).send('<h1>Bonjour sur mon serveur</h1>');
});

//Launch server
server.listen(8080, function() {
      console.log('Serveur en écoute')
});