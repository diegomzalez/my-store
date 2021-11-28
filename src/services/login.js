const faker = require('faker');
const boom = require('@hapi/boom');


class LoginService {
  constructor() {
    this.logins = [];
    this.generate();
  }
  generate() {
    for (let index = 0; index < 100; index++) {
      this.logins.push({
        id: faker.datatype.uuid(),
        email: faker.internet.email(),
        password: faker.internet.password(),
      });
    };
  };
  async create(body) {
    const data = {
      id: faker.datatype.uuid(),
      ...body,
    };
    if (Object.keys(body).length < 2) {
      throw boom.notAcceptable('Insufficient data');
    };
    this.logins.push(data);
    return data;
  }
  async find() {
    return await this.logins;
  };
  async findOne(id) {
    const login = await this.logins.find(login => login.id === id);
    if (!login) {
      throw boom.notFound('login Not Found');
    }
    if (login.isBlock) {
      throw boom.conflict('login Is Block');
    }
    return login;
  };
  async update(id, body) {
    const index = await this.logins.findIndex(login => login.id === id);
    if (index === -1) {
      throw boom.notFound('login Not Found');
    }
    if (Number.isInteger(body.price)) {
      body.price = String(body.price);
    };
    const login = this.logins[index];
    const update = {
      ...login,
      ...body,
    };
    this.logins[index] = update;
    return update;
  };
  async delete(id) {
    const login = await this.logins.find(login => login.id === id);
    if (!login) {
      throw boom.notFound('login Not Found');
    };
    this.logins.splice(this.logins.indexOf(login), 1);
    return login;
  };
};
module.exports = LoginService;
