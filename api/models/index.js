'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';  // defaults to development
const config = require(__dirname + '/../config/config.json')[env];
require('dotenv').config();

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

const db = {} // TODO: Convert serial to identity in schema.

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

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

sequelize.authenticate().then(() => {
  console.log('Database connected to jeeps');
}).catch((err) => {
  console.log(err);
});

db.Sequelize = Sequelize;   // Sequelize entrypoint (converts db to a Sequelize class)
db.sequelize = sequelize;   // Actual db connection

module.exports = { db }