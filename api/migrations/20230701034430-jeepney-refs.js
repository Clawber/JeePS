'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('jeepney', 'driverid', {
      type: Sequelize.INTEGER,
      references: {
        model: 'driver',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE',
    });

    await queryInterface.addColumn('jeepney', 'routeid', {
      type: Sequelize.INTEGER,
      references: {
        model: 'route',
        key: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'CASCADE'
    })
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('jeepney', 'driverid');
    await queryInterface.removeColumn('jeepney', 'routeid');
  }
};
