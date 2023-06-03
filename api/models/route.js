'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Route extends Model {
    static associate(models) {
      Route.hasMany(models.Jeepney, {
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
        foreignKey: 'routeid',
      });
    }
  }
  Route.init({
    name: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    color: {
      type: DataTypes.STRING(50),
      allowNull: false
    },
    path: {
      type: 'PATH',
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Route',
    tableName: "route",
  });
  return Route;
};