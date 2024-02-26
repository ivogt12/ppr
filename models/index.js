//initialize Sequelize

const dbConfig = require("../config/database.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.MAX,
    min: dbConfig.MIN,
    acquire: dbConfig.AQUIRE,
    idle: dbConfig.IDLE
  }
});

//create database object that schemas/models are contained in
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

//User Schema
db.user = require("../controllers/api/users.js")(sequelize, Sequelize);

module.exports = db;