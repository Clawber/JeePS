const { Sequelize, DataTypes } = require("sequelize");
const { Pool } = require('pg');

// DB Connection
// (change this to internal conn once deployed on Render)
const connection = 'postgres://admin:FWq5lKmt9n8rGtyDZoUPGuTkrR8XM7v6@dpg-cgtqnlt269vbmevdbd9g-a.singapore-postgres.render.com:5432/jeeps?ssl=true';
const sequelize = new Sequelize(connection, {
    dialect: "postgres",
    host: 'localhost'
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
db.sequelize.sync();

// NOTE: Reuse DB connection with other stuff
const pool = new Pool({connectionString: connection})

// Exporting modules
module.exports = { db, pool }

// Note: To improve security, use Render's api token for sending requests