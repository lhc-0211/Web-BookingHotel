'use strict';

const {
    Model
} = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize, DataTypes) => {
    class Reservation extends Model {
        static associate(models) {
            //   Reservation.hasMany(models.Room, { foreignKey: 'roomTypeId' })
            Reservation.belongsTo(models.Guest, { foreignKey: 'guestId', targetKey: 'id', as: 'guest' });
            Reservation.hasMany(models.RoomReserved, { foreignKey: 'reservationId' });
            Reservation.hasMany(models.InvoiceGuest, { foreignKey: 'reservationId' });
        }
    }
    Reservation.init({
        startDate: DataTypes.DATE,
        endDate: DataTypes.DATE,
        discountPercent: DataTypes.DECIMAL,
        totalPrice: DataTypes.DECIMAL,
        isBrowsing: DataTypes.BOOLEAN,
    }, {
        sequelize,
        modelName: 'Reservation',
        freezeTableName: true
    });

    Reservation.beforeCreate((Reservation, _) => {
        Reservation.id = uuidv4();
        Reservation.isBrowsing = false;
    });

    return Reservation;
};