const Joi = require('joi');

const id = Joi.string().uuid();
const number = Joi.number().integer().min(1).max(100);
const total = Joi.number().integer();
const address = Joi.string();

const getOrderSchema = Joi.object({
  id: id.required(),
});
const createOrderSchema = Joi.object({
  number: number.required(),
  total: total.required(),
  address: address.required(),
});
const updateOrderSchema = Joi.object({
  id: id.required(),
  number: number,
  total: total,
  address: address,
});
const deleteOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, deleteOrderSchema };
