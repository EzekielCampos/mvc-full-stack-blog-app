const Sequelize = require('sequelize');
require('dotenv').config();


const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'postgres',
    port: parseInt(process.env.DB_PORT, 10),
  });


module.exports = sequelize;
