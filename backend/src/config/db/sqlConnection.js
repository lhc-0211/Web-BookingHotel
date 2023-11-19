
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('bookingmanagement', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,

});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database.');
    }
}

module.exports = connectDB;