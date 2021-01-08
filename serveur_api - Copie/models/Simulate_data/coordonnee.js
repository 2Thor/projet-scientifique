'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class coordonnee extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  coordonnee.init({
    latitude: DataTypes.INTEGER,
    longitude: DataTypes.INTEGER,
    idFeu: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'coordonnee',
  });
  return coordonnee;
};