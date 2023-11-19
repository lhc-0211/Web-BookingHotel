'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class Guest extends Model {
    static associate(models) {
      // define association here
      Guest.hasMany(models.Reservation, { foreignKey: 'guestId' })
      Guest.hasMany(models.InvoiceGuest, { foreignKey: 'guestId' })

    }
  }
  Guest.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    detail: DataTypes.STRING,
    accountType: DataTypes.STRING,

  }, {
    sequelize,
    modelName: 'Guest',
    freezeTableName: true

  });

  Guest.beforeCreate((guest, _) => {
    guest.id = uuidv4();
    guest.accountType = 'guest';

  });

  return Guest;
};