'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  vehicule.init({
    nom: DataTypes.STRING,
    vitesse: DataTypes.INTEGER,
    efficacite: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'vehicule',
  });
  return vehicule;
};