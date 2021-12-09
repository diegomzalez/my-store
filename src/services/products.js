const { models } = require('../libs/sequelize');
const { Op } = require('sequelize');

class ProductsService {
  constructor() {
  };
  async create(body) {
    const product = await models.Product.create(body);
    return product;
  }
  async find(query) {
    const options = {
      include: ['category'],
      where: {},
    };
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit = limit;
      options.offset = offset;
    };
    const { price } = query;
    if (price) {
      options.where.price = price;
    };
    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    };
    return await models.Product.findAll(options);
  };
  async findOne(id) {
    const product = await models.Product.findByPk(id);
    return product;
  };
  async update(id, body) {
    const product = await this.findOne(id);
    return await product.update(body);
  };
  async delete(id) {
    const product = await this.findOne(id);
    return await product.destroy(id);
  };
};

module.exports = ProductsService;
