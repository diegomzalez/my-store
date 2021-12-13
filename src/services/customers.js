const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcrypt = require('bcrypt');

class CustomerService {
  constructor() {
  };
  async find() {
    const customers = await models.Customer.findAll();
    return customers;
  };
  async create(body) {
    const hash = bcrypt.hashSync(body.user.password, 10);
    const data = {
      ...body,
      user: {
        ...body.user,
        password: hash,
      },
    };
    const customer = await models.Customer.create(data, {
      include: ['user']
    });
    if (!customer) {
      throw boom.badRequest('Bad Request');
    };
    delete customer.user.dataValues.password;
    return customer;
  }
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
