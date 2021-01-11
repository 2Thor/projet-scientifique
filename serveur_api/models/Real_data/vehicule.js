'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vehicule extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      models.Vehicule.belongsTo(models.Type_vehicule, {
        foreignKey: {
          allowNull: true
        }
      })
      models.Vehicule.belongsTo(models.Feu_reel, {
        foreignKey: {
          allowNull: true
        }
      })
      models.Vehicule.belongsTo(models.Caserne, {
        foreignKey: {
          allowNull: true
        }
      })
      models.Vehicule.belongsTo(models.Coordonnee, {
        foreignKey: {
          allowNull: true
        }
      })
    }
  };
  Vehicule.init({
    idType: DataTypes.INTEGER,
    idFeu: DataTypes.INTEGER,
    idCaserne: DataTypes.INTEGER,
    idCoordonnee: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Vehicule',
  });
  return Vehicule;
};