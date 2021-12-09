const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string();
const price = Joi.number().integer();
const price_min = Joi.number().integer();
const price_max = Joi.number().integer();

const image = Joi.string().uri();
const description = Joi.string().min(3).max(100);
const isBlock = Joi.boolean();
const categoryId = Joi.number().integer();
const limit = Joi.number().integer();
const offset = Joi.number().integer();


const getProductSchema = Joi.object({
  id: name.required(),
});
const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  description: description.required(),
  isBlock: isBlock.required(),
  categoryId: categoryId.required()
});
const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description,
  isBlock: isBlock,
  categoryId: categoryId,
});
const deleteProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: Joi.number().integer(),
    then: Joi.required()
  })
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema, queryProductSchema };

