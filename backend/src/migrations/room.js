'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('Room', {
            id: {
                allowNull: false,
                defaultValue: Sequelize.UUIDV4,
                primaryKey: true,
                type: Sequelize.UUID,
            },
            roomName: {
                type: Sequelize.STRING
            },
            description: {
                type: Sequelize.STRING
            },

            roomTypeId: {
                type: Sequelize.UUID,
                allowNull: true,
                references: {
                    model: 'RoomType',
                    key: 'id',
                }
            },
            currentPrice: {
                type: Sequelize.DECIMAL
            },
            isActive: {
                type: Sequelize.BOOLEAN
            },
            imageUrl: {
                type: Sequelize.STRING
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
        await queryInterface.dropTable('Room');
    }
};


