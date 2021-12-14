const Joi = require('joi');

const id = Joi.number().integer();
const customerId = Joi.number().integer();
const orderId = Joi.number().integer();
const productId = Joi.number().integer();
const amount = Joi.number().integer().min(1);
const address = Joi.string();


const getOrderSchema = Joi.object({
  id: id.required(),
});
const createOrderSchema = Joi.object({
  customerId: customerId.required(),
  // address: address.required(),
});
const updateOrderSchema = Joi.object({
  id,
  customerId,
  address,
});
const deleteOrderSchema = Joi.object({
  id: id.required(),
});
const addItemSchema = Joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
})

module.exports = { getOrderSchema, createOrderSchema, updateOrderSchema, deleteOrderSchema, addItemSchema };
