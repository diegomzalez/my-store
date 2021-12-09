'use strict';
const { PRODUCT_TABLE, ProductSchema } = require('../models/product.model');
const { CATEGORY_TABLE, CategorySchema } = require('../models/category.model')

module.exports = {
  up: async (queryInterface) => {
    // await queryInterface.addColumn(CATEGORY_TABLE, 'image', CategorySchema.image);
    // await queryInterface.addColumn(CATEGORY_TABLE, 'createdAt', CategorySchema.createdAt);
  },

  down: async (queryInterface) => {
    // await queryInterface.removeColumn(PRODUCT_TABLE, 'description', ProductSchema.description);
    // await queryInterface.removeColumn(CATEGORY_TABLE, 'createdAt', CategorySchema.createdAt);

  },
};
