const { Sequelize, DataTypes } = require("sequelize");
const { Pool } = require('pg'); 
const dotenv = require('dotenv').config()

// DB Connection
// (change this to internal conn once deployed on Render) (OK)
const connection = process.env.connectionString;
const sequelize = new Sequelize(connection, {
    dialect: "postgres"
});

// Checking if connection is done
sequelize.authenticate().then(() => {
    console.log('Database connected to jeeps');
}).catch((err) => {
    console.log(err);
});

const db = {}
db.Sequelize = Sequelize;
db.sequelize = sequelize;

//connecting to model
db.users = require('./userModel') (sequelize, DataTypes)

// NOTE: Reuse DB connection with other stuff
const pool = new Pool({connectionString: connection})

// Exporting modules
module.exports = { db: db, pool: pool }

// Note: To improve security, use Render's api token for sending requests