const faker = require('faker');
const boom = require('@hapi/boom');

class CategoriesService {
  constructor() {
    this.categories = [];
    this.generate();
  };
  async generate() {
    for (let index = 0; index < 20; index++) {
      this.categories.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.department(),
      });
    };
  };
  async create(body) {
    const data = {
      id: faker.datatype.uuid(),
      ...body,
    };
    if (Object.keys(body).length < 1) {
      throw boom.notAcceptable('Insufficient data');
    };
    this.categories.push(data);
    return data;
  }
  async find() {
    return await this.categories;
  };
  async findOne(id) {
    const category = await this.categories.find(category => category.id === id);
    if (!category) {
      throw boom.notFound('category Not Found');
    }
    if (category.isBlock) {
      throw boom.conflict('category Is Block');
    }
    return category;
  };
  async update(id, body) {
    const index = await this.categories.findIndex(category => category.id === id);
    if (index === -1) {
      throw boom.notFound('category Not Found');
    }
    if (Number.isInteger(body.price)) {
      body.price = String(body.price);
    };
    const category = this.categories[index];
    const update = {
      ...category,
      ...body,
    };
    this.categories[index] = update;
    return update;
  };
  async delete(id) {
    const category = await this.categories.find(category => category.id === id);
    if (!category) {
      throw boom.notFound('category Not Found');
    };
    this.categories.splice(this.categories.indexOf(category), 1);
    return category;
  };
};

module.exports = CategoriesService;
