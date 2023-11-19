'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    static associate(models) {
      // define association here

    }
  }
  Admin.init({
    adminName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    accountType: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Admin',
    freezeTableName: true

  });

  Admin.beforeCreate((admin, _) => {
    admin.id = uuidv4();
    admin.accountType = 'admin';
  });

  return Admin;
};