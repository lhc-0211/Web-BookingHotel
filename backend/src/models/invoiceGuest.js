'use strict';

const {
  Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
  class InvoiceGuest extends Model {
    static associate(models) {
      InvoiceGuest.belongsTo(models.Guest, { foreignKey: 'guestId', targetKey: 'id' })
      InvoiceGuest.belongsTo(models.Reservation, { foreignKey: 'reservationId', targetKey: 'id' })

    }
  }
  InvoiceGuest.init({
    invoiceAmount: DataTypes.DECIMAL,
  }, {
    sequelize,
    modelName: 'InvoiceGuest',
    freezeTableName: true

  });

  InvoiceGuest.beforeCreate((InvoiceGuest, _) => {
    return InvoiceGuest.id = uuidv4();
  });

  return InvoiceGuest;
};