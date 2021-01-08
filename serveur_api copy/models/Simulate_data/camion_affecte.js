'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Camion_affecte extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Camion_affecte.init({
    idType: DataTypes.INTEGER,
    idFeu: DataTypes.INTEGER,
    idCaserne: DataTypes.INTEGER,
    idPoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Camion_affecte',
  });
  return Camion_affecte;
};