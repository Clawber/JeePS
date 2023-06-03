'use strict';
const { Model } = require('sequelize');
require('dotenv').config();

module.exports = (sequelize, DataTypes) => {
  class Driver extends Model {
    static associate(models) {
      Driver.hasMany(models.Jeepney, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        foreignKey: 'driverid'
      });
    }
  }
  Driver.init({
    firstname: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING(50),
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Driver',
    tableName: 'driver',
  });
  return Driver;
};