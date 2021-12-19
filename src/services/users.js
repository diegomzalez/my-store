const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {
  };
  async create(body) {
    if (!body) {
      throw boom.badRequest('Bad Request');
    };
    const newUser = await models.User.create(body);
    return newUser;
  }
  async find() {
    const user = await models.User.findAll({
      include: ['customer']
    });
    return user;
  };
  async findByEmail(email) {
    const user = await models.User.findOne({
      where: { email },
    });
    return user;
  };
  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('Not Found');
    };
    return user;
  };
  async update(id, body) {
    const user = await this.findOne(id);
    return await user.update(body);
  };
  async delete(id) {
    const user = await this.findOne(id);
    return await user.destroy({

    });
  };
};

module.exports = UsersService;
