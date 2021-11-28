const faker = require('faker');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
  };
  async generate() {
    for (let i = 0; i < 10; i++) {
      await this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: faker.commerce.price(),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    };
  };
  async create(body) {
    const data = {
      id: faker.datatype.uuid(),
      ...body,
      isBlock: faker.datatype.boolean(),
    };
    this.products.push(data);
    return data;
  }
  async find() {
    return await this.products;
  };
  async findOne(id) {
    const product = await this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    }
    if (product.isBlock) {
      throw boom.conflict('Product Is Block');
    }
    return product;
  };
  async update(id, body) {
    const index = await this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw boom.notFound('Product Not Found');
    }
    if (Number.isInteger(body.price)) {
      body.price = String(body.price);
    };
    const product = this.products[index];
    const update = {
      ...product,
      ...body,
    };
    this.products[index] = update;
    return update;
  };
  async delete(id) {
    const product = await this.products.find(product => product.id === id);
    if (!product) {
      throw boom.notFound('Product Not Found');
    };
    this.products.splice(this.products.indexOf(product), 1);
    return product;
  };
};

module.exports = ProductsService;
