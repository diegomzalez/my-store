const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {
  };
  async create(body) {
    const order = await models.Order.create(body);
    if (!order) {
      throw boom.badRequest('Bad Request');
    };
    return order;
  };
  async addItem(body) {
    const item = await models.OrderProduct.create(body);
    if (!item) {
      throw boom.badRequest('Bad Request');
    };
    return item;
  };
  async find() {
    return await models.Order.findAll();
  };
  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {association: 'customer',
        include: ['user']},
        'items',
      ]
    });
    if (!order) {
      throw boom.notFound('Not Found');
    };
    return order;
  };
  async update(id, body) {
    const order = await this.findOne(id);
    return await order.update(body);
  };
  async delete(id) {
    const order = await this.findOne(id);
    return await order.destroy(order);
  };
};

module.exports = OrdersService;
