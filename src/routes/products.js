const router = require('express').Router();
const passport = require('passport');
const ProductsService = require('../services/products');
const service = new ProductsService();
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema, queryProductSchema } = require('../schemas/product.schema');
const { checkRoles } = require('../middlewares/auth.handler');


router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.find(req.query));
    } catch (error) {
      next(error);
    };
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json(await service.create(req.body));
    } catch (error) {
      next(error);
    };
  });

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    }
  });


router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.update(req.params.id, req.body));
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin'),
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(200).json('Product deleted');
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
