'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('RoomType', {
      id: {
        allowNull: false,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        type: Sequelize.UUID,
      },
      roomTypeName: {
        type: Sequelize.STRING
      },
      beds: {
        type: Sequelize.INTEGER
      },
      sleeps: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.STRING
      },
      hotelId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: 'Hotel',
          key: 'id',
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('RoomType');
  }
};


