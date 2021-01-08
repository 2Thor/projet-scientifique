'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class caserne extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  caserne.init({
    nom: DataTypes.STRING,
    max_camion: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'caserne',
  });
  return caserne;
};