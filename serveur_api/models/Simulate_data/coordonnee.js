'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Coordonnee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Coordonnee.hasMany(models.Caserne);
      models.Coordonnee.hasMany(models.Feu_reel);
      models.Coordonnee.hasMany(models.Vehicule);
    }
  };
  Coordonnee.init({
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Coordonnee',
  });
  return Coordonnee;
};