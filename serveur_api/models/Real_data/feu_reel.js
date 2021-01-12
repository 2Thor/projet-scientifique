'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Feu_reel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Feu_reel.hasMany(models.Vehicule);
      models.Feu_reel.belongsTo(models.Coordonnee, {
        foreignKey: {
          allowNull: true
        }
      })
    }
  };
  Feu_reel.init({
    intensite: DataTypes.INTEGER,
    idCoordonnee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Feu_reel',
  });
  return Feu_reel;
};