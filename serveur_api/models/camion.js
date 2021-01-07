'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class camion extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  camion.init({
    nom: DataTypes.STRING,
    vitesse: DataTypes.INTEGER,
    efficacite: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'camion',
  });
  return camion;
};