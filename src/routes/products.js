const router = require('express').Router();
const ProductsService = require('../services/products');
const service = new ProductsService();
const validatorHandler = require('../middlewares/validator.handler');
const { createProductSchema, updateProductSchema, getProductSchema, deleteProductSchema } = require('../schemas/product.schema');

router.get('/', async (req, res) => {
  const products = await service.find();
  res.status(200).json(products);
});

router.post('/',
  validatorHandler(createProductSchema, 'body'),
  async (req, res, next) => {
    try {
      const product = await service.create(req.body);
      res.status(201).json({
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
      res.status(302).json(product);
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
      res.status(202).json(product);
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  validatorHandler(deleteProductSchema, 'params'),
  async (req, res, next) => {
    try {
      const product = await service.delete(req.params.id);
      res.status(202).json('The product was deleted');
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
