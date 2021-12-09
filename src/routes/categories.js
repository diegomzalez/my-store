const router = require('express').Router();
const CategoriesService = require('../services/categories');
const service = new CategoriesService();
const validatorHandler = require('../middlewares/validator.handler');
const { getCategoryrSchema, createCategoryrSchema, updateCategoryrSchema, deleteCategoryrSchema } = require('../schemas/category.schema');

router.get('/', async (req, res) => {
  res.status(200).send(await service.find());
});

router.post('/',
  validatorHandler(createCategoryrSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json({
        message: 'The category was created succesfully',
        category: await service.create(req.body),
      });
    } catch (error) {
      next(error);
    };
  });
router.get('/:id',
  validatorHandler(getCategoryrSchema),
  async (req, res, next) => {
    try {
      res.status(302).json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    };
  });

router.patch('/:id',
  validatorHandler(getCategoryrSchema, "params"),
  validatorHandler(updateCategoryrSchema, "body"),
  async (req, res, next) => {
    try {
      res.status(202).json(await service.update(req.params.id, req.body));
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  validatorHandler(deleteCategoryrSchema, "params"),
  async (req, res, next) => {

    try {
      await service.delete(req.params.id);
      res.status(202).json('The category was deleted');
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
