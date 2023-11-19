'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Hotel extends Model {
    static associate(models) {
      // define association here
      Hotel.belongsTo(models.Company, { foreignKey: 'companyId', targetKey: 'id', as: 'company' })
      Hotel.belongsTo(models.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'category' })
      Hotel.belongsTo(models.City, { foreignKey: 'cityId', targetKey: 'id', as: 'cityHotel' })
      Hotel.hasMany(models.RoomType, { foreignKey: 'hotelId' })
    }
  }
  Hotel.init({
    hotelName: DataTypes.STRING,
    description: DataTypes.STRING,
    address: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    imageUrl: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Hotel',
    freezeTableName: true
  });

  Hotel.beforeCreate((hotel, _) => {
    hotel.id = uuidv4();
    hotel.isActive = true;

  });

  return Hotel;
};