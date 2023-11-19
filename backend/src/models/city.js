'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class City extends Model {
    static associate(models) {
      City.hasMany(models.Company, { foreignKey: 'cityId' })
      City.hasMany(models.Hotel, { foreignKey: 'cityId' })
    }
  }
  City.init({
    cityName: DataTypes.STRING,
    imageUrl: DataTypes.STRING,
    position: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'City',
    freezeTableName: true

  });

  City.beforeCreate((City, _) => {
    return City.id = uuidv4();
  });

  return City;
};