const { Sequelize, DataTypes } = require("sequelize");
const { Pool } = require('pg'); 
const dotenv = require('dotenv').config()

const debug = true;

// DB Connection
const connection = (debug ? process.env.testString : process.env.connectionString);
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
db.Sequelize = Sequelize;   // Sequelize entrypoint
db.sequelize = sequelize;   // Actual db connection

// Connecting to models
// Note: Create other tables first before creating jeepney table due to FK relationships
// Or add reference check deferral
[db.driver, db.jeepney, db.route, db.tracker] = require('./dbModel') (sequelize, DataTypes)
db.users = require('./userModel') (sequelize, DataTypes)

// NOTE: Reuse DB connection with other stuff
const pool = new Pool({connectionString: connection})

// Exporting modules
module.exports = { db: db, pool: pool }

// Note: To improve security, use Render's api token for sending requests