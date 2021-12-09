const { models } = require('../libs/sequelize');
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
    const category = await this.findOne(id);
    return await category.update(body);
  };
  async delete(id) {
    const category = await this.findOne(id);
    return await category.destroy(id);
  };
};

module.exports = CategoriesService;
