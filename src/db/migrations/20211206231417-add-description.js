'use strict';
const { DataTypes } = require('sequelize');
const { PRODUCT_TABLE} = require('../models/product.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', {
        allowNull: false,
        type: DataTypes.TEXT,
    });
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'description');
  },
};
