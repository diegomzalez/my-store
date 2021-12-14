const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrdersService {
  constructor() {
  };
  async create(body) {
    const customer = await models.Customer.findOne({
      where: {
        '$user.id$': body,
      },
      include:['user'],
    });
    const order = await models.Order.create({
      customerId: customer.id,
    });
    return order;
  };
  async addItem(body) {
    const item = await models.OrderProduct.create(body);
    if (!item) {
      throw boom.badRequest('Bad Request');
    };
    return item;
  };
  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  };
  /**
   * This method finds all orders in the data base
   * @returns orders
   */
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
