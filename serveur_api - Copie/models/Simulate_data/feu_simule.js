'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feu_simule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  feu_simule.init({
    intensite: DataTypes.INTEGER,
    idPoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feu_simule',
  });
  return feu_simule;
};