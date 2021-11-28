const Joi = require('joi');

const id = Joi.string().uuid();
const email = Joi.string().alphanum().email();
const password = Joi.string().alphanum();

const getLoginSchema = Joi.object({
  id: id.required(),
});
const createLoginSchema = Joi.object({
  email: email.required(),
  password: password.required(),
});
const updateLoginSchema = Joi.object({
  id: id.required(),
  email: email,
  password: password,
});
const deleteLoginSchema = Joi.object({
  id: id.required(),
});

module.exports = { getLoginSchema, createLoginSchema, updateLoginSchema, deleteLoginSchema };
