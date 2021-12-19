const router = require('express').Router();
const passport = require('passport');
const CategoriesService = require('../services/categories');
const service = new CategoriesService();
const validatorHandler = require('../middlewares/validator.handler');
const { getCategoryrSchema, createCategoryrSchema, updateCategoryrSchema, deleteCategoryrSchema } = require('../schemas/category.schema');
const { checkRoles } = require('../middlewares/auth.handler');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      res.status(200).send(await service.find());
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createCategoryrSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json(await service.create(req.body));
    } catch (error) {
      next(error);
    };
  });
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'user'),
  validatorHandler(getCategoryrSchema),
  async (req, res, next) => {
    try {
      res.status(302).json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    };
  });

router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
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
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(deleteCategoryrSchema, "params"),
  async (req, res, next) => {
    try {
      res.status(202).json(await service.delete(req.params.id));
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
