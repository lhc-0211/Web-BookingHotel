'use strict';

const { Model } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Room extends Model {
        static associate(models) {
            // Định nghĩa mối quan hệ giữa Room và các mô hình khác ở đây

            Room.belongsTo(models.RoomType, { foreignKey: 'roomTypeId', targetKey: 'id' });
        }
    }
    Room.init(
        {
            roomName: DataTypes.STRING,
            description: DataTypes.STRING,
            currentPrice: DataTypes.DECIMAL,
            isActive: DataTypes.BOOLEAN,
            imageUrl: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Room',
            freezeTableName: true,
        }
    );

    Room.beforeCreate((room, _) => {
        room.id = uuidv4();
        room.isActive = true;
    });

    return Room;
};
