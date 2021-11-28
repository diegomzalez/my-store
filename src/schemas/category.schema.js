const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(2).max(15);

const getCategoryrSchema = Joi.object({
  id: id.required(),
});
const createCategoryrSchema = Joi.object({
  name: name.required(),
});
const updateCategoryrSchema = Joi.object({
  name: name.required(),
});
const deleteCategoryrSchema = Joi.object({
  id: id.required(),
});

module.exports = { getCategoryrSchema, createCategoryrSchema, updateCategoryrSchema, deleteCategoryrSchema };
