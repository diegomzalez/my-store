'use strict';
const { DataTypes } = require('sequelize');

const { PRODUCT_TABLE } = require('../models/product.model')
const { CATEGORY_TABLE } = require('../models/category.model');
module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(PRODUCT_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      price: {
        allowNull: false,
        type: DataTypes.DECIMAL,
      },
      image: {
        allowNull: true,
        type: DataTypes.CHAR,
      },
      isBlock: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
      categoryId: {
        field: 'category_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: CATEGORY_TABLE,
          key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'cascade'
      }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(PRODUCT_TABLE);
  },
};

