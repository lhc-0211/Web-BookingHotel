'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Company extends Model {
    static associate(models) {
      // define association here
      Company.belongsTo(models.City, { foreignKey: 'cityId', targetKey: 'id', as: 'city' })
      Company.hasMany(models.Hotel, { foreignKey: 'companyId' })
    }
  }
  Company.init({
    companyName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    companyAddress: DataTypes.STRING,
    phone: DataTypes.STRING,
    detail: DataTypes.STRING,
    isActive: DataTypes.BOOLEAN,
    accountType: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Company',
    freezeTableName: true

  });

  Company.beforeCreate((company, _) => {
    company.id = uuidv4();
    company.accountType = 'company';
  });

  return Company;
};