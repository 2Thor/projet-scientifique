'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feu_simule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Feu_reel.belongsTo(models.Coordonne, {
        foreignKey: {
          allowNull: true
        }
      })
    }
  };
  Feu_simule.init({
    intensite: DataTypes.INTEGER,
    idCoordonnee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feu_simule',
  });
  return Feu_simule;
};