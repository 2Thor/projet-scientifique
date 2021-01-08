'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class feu_reel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  feu_reel.init({
    intensite: DataTypes.INTEGER,
    idPoint: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'feu_reel',
  });
  return feu_reel;
};