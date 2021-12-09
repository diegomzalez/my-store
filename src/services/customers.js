const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {
  };
  async create(body) {
    const customer = await models.Customer.create(body, {
      include: ['user']
    });
    if (!customer) {
      throw boom.badRequest('Bad Request');
    };
    return customer;
  }
  async find() {
    return await models.Customer.findAll();
  };
  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('Not Found');
    };
    return customer;
  };
  async update(id, body) {
    const customer = await this.findOne(id);
    return await customer.update(body);
  };
  async delete(id) {
    const customer = await this.findOne(id);
    return await customer.destroy();
  };
};

module.exports = CustomerService;
