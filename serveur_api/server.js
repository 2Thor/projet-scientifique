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
    const sequelize = new Sequelize('S7_Project', 'postgres', 'admin', {
        host: 'localhost',
        dialect: 'postgres',
      });
      try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
});