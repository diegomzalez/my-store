const router = require('express').Router();
const ProductsService = require('../services/products');
const service = new ProductsService();
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema, queryProductSchema } = require('../schemas/product.schema');

router.get('/',
  validatorHandler(queryProductSchema, 'query'),
  async (req, res, next) => {
    try {
      const products = await service.find(req.query);
      res.statusCode = 302;
      res.status(res.statusCode).json({
        statusCode: res.statusCode,
        message: 'The products was find succesfully',
        products: products,
      });
    } catch (error) {
      next(error);
    };
  });

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const product = await service.create(req.body);
      res.statusCode = 202;
      res.status(res.statusCode).json({
        statusCode: res.statusCode,
        message: 'The product was created succesfully',
        product: product,
      });
    } catch (error) {
      next(error);
    };
  });

router.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const product = await service.findOne(req.params.id);
      res.statusCode = 302;
      res.status(res.statusCode).json({
        statusCode: res.statusCode,
        message: 'The product was find succesfully',
        product: product,
      });
    } catch (error) {
      next(error);
    }
  });


router.patch('/:id',
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const product = await service.update(req.params.id, req.body);
      res.statusCode = 202;
      res.status(res.statusCode).json({
        statusCode: res.statusCode,
        message: 'The product was updated succesfully',
        product: product,
      });
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const product = await service.delete(req.params.id);
      res.statusCode = 202;
      res.status(res.statusCode).json({
        statusCode: res.statusCode,
        message: 'The product was find succesfully',
        product: product,
      });
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
