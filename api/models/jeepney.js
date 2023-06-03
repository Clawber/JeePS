'use strict';require('dotenv').config();

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Jeepney extends Model {
    static associate(models) {
      Jeepney.belongsTo(models.Driver, {foreignKey: 'driverid'});
      Jeepney.belongsTo(models.Route, {foreignKey: 'routeid'});
    }
  }
  Jeepney.init({
    platenumber: {
      type: DataTypes.STRING(8),
      allowNull: false,
      unique: true
    },
    capacity: {
      type: DataTypes.SMALLINT,
      allowNull: false
    },
    coords: {
      type: 'POINT',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Jeepney',
    tableName: 'jeepney',
  });
  return Jeepney;
};