'use strict';
const { OrderSchema, ORDER_TABLE } = require('../models/order.model')

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.addColumn(ORDER_TABLE, 'address', OrderSchema.address);
  },

  down: async (queryInterface) => {
    await queryInterface.removeColumn(ORDER_TABLE, 'address', OrderSchema.address);
  },
};

