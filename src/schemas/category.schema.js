const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string().min(2).max(15);
const image = Joi.string();

const getCategoryrSchema = Joi.object({
  id: id.required(),
});
const createCategoryrSchema = Joi.object({
  name: name.required(),
  image: image.required(),
});
const updateCategoryrSchema = Joi.object({
  name: name,
  image: image,
});
const deleteCategoryrSchema = Joi.object({
  id: id.required(),
});

module.exports = { getCategoryrSchema, createCategoryrSchema, updateCategoryrSchema, deleteCategoryrSchema };
