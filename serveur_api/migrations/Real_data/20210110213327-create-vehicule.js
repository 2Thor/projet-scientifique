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
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Type_vehicule',
          key: 'id'
        }
      },
      idFeu: {
        allowNull: true,
        type: Sequelize.INTEGER,
        references: {
          model: 'Feu_reel',
          key: 'id'
        }
      },
      idCaserne: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Caserne',
          key: 'id'
        }
      },
      idCoordonnee: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'Coordonnee',
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