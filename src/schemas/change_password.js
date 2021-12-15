const Joi = require('joi');

const token = Joi.string();
const password = Joi.string().min(3);

const changePassordSchema = Joi.object({
  token: token.required(),
  password: password.required(),
});

module.exports = changePassordSchema;
