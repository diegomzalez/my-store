const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(15);

const getOrderSchema = Joi.object({
  id: id.required(),
});
const createOrderSchema = Joi.object({
  name: name.required(),
});
const updateOrderSchema = Joi.object({
  name: name.required(),
});
const deleteOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, deleteOrderSchema };
