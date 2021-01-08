'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.js')[env];
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

/**Load Sequelize Models**/
/**Add the Database Models**/
//Add models from database1 folder
fs
    .readdirSync(__dirname + '/Real_data')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
        const model = require(path.join(__dirname + '/Real_data', file))(db.Real_data, Sequelize.DataTypes);
        db[model.name] = model;
    });

// Add models from database2 folder

fs
    .readdirSync(__dirname + '/Simulate_data')
    .filter(file =>
        (file.indexOf('.') !== 0) &&
        (file !== basename) &&
        (file.slice(-3) === '.js'))
    .forEach(file => {
      const model = require(path.join(__dirname + '/Simulate_data', file))(db.Simulate_data, Sequelize.DataTypes);
        db[model.name] = model;
    });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

module.exports = db;
