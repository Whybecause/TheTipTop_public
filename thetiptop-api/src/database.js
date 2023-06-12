const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.API_DATABASE_NAME, process.env.API_DATABASE_USERNAME, process.env.API_DATABASE_PWD, {
  host: process.env.API_DATABASE_HOST,
  dialect: process.env.API_DATABASE_DIALECT
});

module.exports = sequelize;