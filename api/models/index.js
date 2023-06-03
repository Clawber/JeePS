'use strict';

require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';  // replace with 'production' for deployment
const config = require(__dirname + '/../config/config.json')[env];
const { Pool } = require('pg')
const db = {}

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

console.log(__dirname)
fs.readdirSync(__dirname)
.filter(file => {
  console.log(file)
  return (
    file.indexOf('.') !== 0 &&
    file !== basename &&
    file.slice(-3) === '.js' &&
    file.indexOf('.test.js') === -1
  );
})
.forEach(file => {
  const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
  console.log(model.name);
  db[model.name] = model;
});

console.log(db)

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Checking if connection is done
sequelize.authenticate().then(() => {
    console.log('Database connected to jeeps');
}).catch((err) => {
  console.log(err);
});

db.Sequelize = Sequelize;   // Sequelize entrypoint (converts db to a Sequelize class)
db.sequelize = sequelize;   // Actual db connection

// Note: You can use sequelize.sync() to automatically synchronize all models. (see server.js)

// Connecting to models
// Note: Create other tables first before creating jeepney table due to FK relationships
// Or add reference check deferral
// [db.driver, db.jeepney, db.route, db.tracker] = require('./dbModel') (sequelize, DataTypes)
// db.users = require('./userModel') (sequelize, DataTypes)

// NOTE: Reuse DB connection with other stuff
const pool = new Pool({connectionString: config.connection})

// Exporting modules
module.exports = { db: db, pool: pool }

// Note: To improve security, use Render's api token for sending requests