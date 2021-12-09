const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class LoginService {
  constructor() {
  }
  async create(body) {
  };
  async find() {
    const logins = models.Login.findAll();
    if(!logins) {
      throw boom.notFound();
    };
    return logins;
  };
  async findOne(id) {
  };
  async update(id, body) {
  };
  async delete(id) {
  };
};
module.exports = LoginService;
