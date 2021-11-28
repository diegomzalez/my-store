const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string();
const price = Joi.number().integer();
const image = Joi.string().uri();

const getProductSchema = Joi.object({
  id: name.required(),
});
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
});
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
});
const deleteProductSchema = Joi.object({
  id: id.required(),
});


module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema };

