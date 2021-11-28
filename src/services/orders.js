const faker = require('faker');
const boom = require('@hapi/boom');

class OrdersService {
  constructor() {
    this.orders = [];
    this.generate();
  };
  async generate() {
    for (let i = 0; i < 10; i++) {
      await this.orders.push({
        id: faker.datatype.uuid(),
        number: faker.datatype.number(10),
        total: faker.datatype.number(1000),
        address: faker.address.country(),
      });
    };
  };
  async create(body) {
    const data = {
      id: faker.datatype.uuid(),
      ...body,
      isBlock: faker.datatype.boolean(),
    };
    if (Object.keys(body).length < 3) {
      throw boom.notAcceptable('Insufficient data');
    };
    this.orders.push(data);
    return data;
  }
  async find() {
    return await this.orders;
  };
  async findOne(id) {
    const order = await this.orders.find(order => order.id === id);
    if (!order) {
      throw boom.notFound('order Not Found');
    }
    return order;
  };
  async update(id, body) {
    const index = await this.orders.findIndex(order => order.id === id);
    if (index === -1) {
      throw boom.notFound('order Not Found');
    }
    if (Number.isInteger(body.price)) {
      body.price = String(body.price);
    };
    const order = this.orders[index];
    const update = {
      ...order,
      ...body,
    };
    this.orders[index] = update;
    return update;
  };
  async delete(id) {
    const order = await this.orders.find(order => order.id === id);
    if (!order) {
      throw boom.notFound('order Not Found');
    };
    this.orders.splice(this.orders.indexOf(order), 1);
    return order;
  };
};

module.exports = OrdersService;
