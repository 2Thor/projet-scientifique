'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Type_vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Type_vehicule.hasMany(models.Vehicule);
    }
  };
  Type_vehicule.init({
    nom: DataTypes.STRING,
    vitesse: DataTypes.INTEGER,
    efficacite: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Type_vehicule',
  });
  return Type_vehicule;
};