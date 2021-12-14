const router = require('express').Router();
const passport = require('passport');
const { checkRoles } = require('../middlewares/auth.handler');
const OrdersService = require('../services/orders');
const service = new OrdersService();
const validatorHandler = require('../middlewares/validator.handler');
const { getOrderSchema, createOrderSchema, updateOrderSchema, deleteOrderSchema, addItemSchema } = require('../schemas/order.schema');

router.get('/',
  async (req, res, next) => {
    try {
      res.status(200).json(await service.find());
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  passport.authenticate('jwt', { session: false }),
  // validatorHandler(createOrderSchema, 'body'),
  async (req, res) => {
    try {
      res.status(201).json({
        message: 'The order was created succesfully',
        order: await service.create(req.user.sub),
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    };
  });

router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      res.status(302).json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    }
  });


router.patch('/:id',
  validatorHandler(getOrderSchema, 'params'),
  validatorHandler(updateOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(202).json(await service.update(req.params.id, req.body));
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  validatorHandler(deleteOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(202).json('The order was deleted');
    } catch (error) {
      next(error);
    };
  });
  router.post('/add-item',
  validatorHandler(addItemSchema, 'body'),
  async (req, res) => {
    try {
      res.status(201).json({
        message: 'The order was created succesfully',
        item: await service.addItem(req.body),
      });
    } catch (error) {
      res.status(400).json({
        message: error.message,
      });
    };
  });

module.exports = router;
