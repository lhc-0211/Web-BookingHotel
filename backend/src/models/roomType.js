'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class RoomType extends Model {
    static associate(models) {
      RoomType.hasMany(models.Room, { foreignKey: 'roomTypeId' })
      RoomType.belongsTo(models.Hotel, { foreignKey: 'hotelId', targetKey: 'id' });
      RoomType.hasMany(models.RoomReserved, { foreignKey: 'roomTypeId' });
    }
  }
  RoomType.init({
    roomTypeName: DataTypes.STRING,
    beds: DataTypes.INTEGER,
    sleeps: DataTypes.INTEGER,
    description: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'RoomType',
    freezeTableName: true
  });

  RoomType.beforeCreate((RoomType, _) => {
    return RoomType.id = uuidv4();
  });

  return RoomType;
};