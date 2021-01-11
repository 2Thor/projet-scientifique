'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Vehicules', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      idType: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Type_vehicules',
          key: 'id'
        }
      },
      idFeu: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Feu_reels',
          key: 'id'
        }
      },
      idCaserne: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Casernes',
          key: 'id'
        }
      },
      idCoordonnee: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Coordonnees',
          key: 'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Vehicules');
  }
};