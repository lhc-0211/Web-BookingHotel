'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class RoomReserved extends Model {
    static associate(models) {
      RoomReserved.belongsTo(models.RoomType, { foreignKey: 'roomTypeId', targetKey: 'id', as: 'roomType' })
      RoomReserved.belongsTo(models.Reservation, { foreignKey: 'reservationId', targetKey: 'id' })

    }
  }
  RoomReserved.init({
    price: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'RoomReserved',
    freezeTableName: true

  });

  RoomReserved.beforeCreate((RoomReserved, _) => {
    return RoomReserved.id = uuidv4();
  });

  return RoomReserved;
};