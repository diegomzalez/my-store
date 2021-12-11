const { models } = require('../libs/sequelize');
const { isObjectEmpty } = require('object-is-empty');

class CategoriesService {
  constructor() {
  };
  async find() {
    return await models.Category.findAll();
  }
  async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    return category;
  };
  async create(body) {
    const category = await models.Category.create(body);
    return category;
  };
  async update(id, body) {
    if (isObjectEmpty(body)) throw new Error('Body cannot be empty');
    return await (await this.findOne(id)).update(body);
  };
  async delete(id) {
    const category = await this.findOne(id);
    return await category.destroy(id);
  };
};

module.exports = CategoriesService;
