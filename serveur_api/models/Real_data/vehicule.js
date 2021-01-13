'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vehicule.init({
    x: DataTypes.INTEGER,
    y: DataTypes.INTEGER,
    idType: DataTypes.INTEGER,
    idFeu: DataTypes.INTEGER,
    idCaserne: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicule',
  });
  return Vehicule;
};