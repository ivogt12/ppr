//do i need the OR here????
if(process.env.NODE_ENV !== "production") require('dotenv').config();

const Sequelize = require("sequelize");


const db = new Sequelize({
  HOST: process.env.PG_HOST || "localhost",
  USER: process.env.PG_USER || "postgres",
  PASSWORD: process.env.PG_PASSWORD || "123",
  DB: process.env.PG_NAME || "testdb",
  dialect: "postgres",
 
  pool: {
    //maximum number of connection in pool
    max: 5,
    
    //minimum number of connection in pool
    min: 0,
    
    //maximum time, in milliseconds, that pool will try to get connection before throwing error
    acquire:  30000,
    
    //maximum time, in milliseconds, that a connection can be idle before being released
    idle: 10000
  }
});

module.exports = db;


























// *********************************************yelp-Clone-that uses SQL commands rather than sequelize, Might be interesting to use later on *********************************************


//Pool is a class provided by the pg library that manages a pool of PostgreSQL client connections.
// const { Pool } = require("pg");

// //Set to production
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
// const pool = new Pool({
//   //set url
//   connectionString: connectionString,

//   //used for heroku shit doesnt matter
//   ssl: isProduction ? { rejectUnauthorized: false } : false,
// });

// //allows other modules in the application to execute SQL queries against the database by calling query(text, params)
// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };

// *********************************************Use Later when configuring Heroku *********************************************/

// const { Pool } = require("pg");
// const isProduction = process.env.NODE_ENV === "production";
// const connectionString = `postgresql://${process.env.PG_USER}:${process.env.PG_PASSWORD}@${process.env.PG_HOST}:${process.env.PG_PORT}/${process.env.PG_DATABASE}`;
// const pool = new Pool({
//   connectionString: isProduction
//     ? process.env.DATABASE_URL // Heroku will supply us with a string called DATABASE_URL for the connectionString,
//     : connectionString,
//   ssl: isProduction ? { rejectUnauthorized: false } : false,
// });

// module.exports = {
//   query: (text, params) => pool.query(text, params),
// };