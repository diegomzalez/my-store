'use strict';
const { ORDER_TABLE } = require('../models/order.model');
const { DataTypes } = require('sequelize');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(ORDER_TABLE, 'address', {
      address: {
        allowNull: false,
        type: DataTypes.STRING,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(ORDER_TABLE, 'address');
  },
};

