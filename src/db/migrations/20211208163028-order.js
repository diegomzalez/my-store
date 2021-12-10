'use strict';

const { DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');
const { ORDER_TABLE } = require('../models/order.model');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      customerId: {
        field: 'customer_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
      },
      total: {
        type: DataTypes.VIRTUAL,
        get() {
          if (this.items.length > 0) {
            return this.items.reduce((total, item) => {
              return total + (item.price * item.OrderProduct.amount)
            }, 0)
          }
        }
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
