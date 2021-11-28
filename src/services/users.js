const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
    this.generate();
  };

  generate() {
    for (let i = 0; i < 10; i++) {
      this.users.push({
        id: faker.datatype.uuid(),
        name: faker.name.findName(),
        email: faker.internet.email(),
        address: faker.address.country(),
      });
    };
    this.users.forEach(item => Object.values(item).sort());
  }

  async create(body) {
    const data = {
      id: faker.datatype.uuid(),
      ...body,
      isBlock: faker.datatype.boolean(),
    };
    if (Object.keys(body).length < 3) {
      throw boom.notAcceptable('Insufficient data');
    };
    this.users.push(data);
    return data;
  }
  async find() {
    return await this.users;
  };
  async findOne(id) {
    const user = await this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('user Not Found');
    }
    if (user.isBlock) {
      throw boom.conflict('user Is Block');
    }
    return user;
  };
  async update(id, body) {
    const index = await this.users.findIndex(user => user.id === id);
    if (index === -1) {
      throw boom.notFound('user Not Found');
    }
    if (Number.isInteger(body.price)) {
      body.price = String(body.price);
    };
    const user = this.users[index];
    const update = {
      ...user,
      ...body,
    };
    this.users[index] = update;
    return update;
  };
  async delete(id) {
    const user = await this.users.find(user => user.id === id);
    if (!user) {
      throw boom.notFound('user Not Found');
    };
    this.users.splice(this.users.indexOf(user), 1);
    return user;
  };
};

module.exports = UsersService;
