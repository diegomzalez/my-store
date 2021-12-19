'use strict';
const { CUSTOMER_TABLE } = require('../models/customer.model')
const { USER_TABLE } = require('../models/user.model')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: true,
      type: Sequelize.DataTypes.INTEGER,
      unique: true,
      references: {
        model: USER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'cascade'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      field: 'user_id',
      allowNull: false,
      type: Sequelize.DataTypes.INTEGER,
      unique: true,
      references: {
        model: USER_TABLE,
        key: 'id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'cascade'
    });
  }
};
