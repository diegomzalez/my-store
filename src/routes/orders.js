const router = require('express').Router();
const OrdersService = require('../services/orders');
const service = new OrdersService();

router.get('/', async (req, res, next) => {
  try {
    const orders = await service.find();
    res.status(200).json(orders);
  } catch (error) {
    next(error);
  }
});

router.post('/', async (req, res) => {
  try {
    const order = await service.create(req.body);
    res.status(201).json({
      message: 'The order was created succesfully',
      order: order,
    });
  } catch (error) {
    res.status(202).json({
      message: error.message,
    });
  };
});

router.get('/:id', async (req, res, next) => {
  try {
    const order = await service.findOne(req.params.id);
    res.status(302).json(order);
  } catch (error) {
    next(error);
  }
});


router.patch('/:id', async (req, res, next) => {
  try {
    const order = await service.update(req.params.id, req.body);
    res.status(202).json(order);
  } catch (error) {
    next(error);
  };
});

router.delete('/:id', async (req, res, next) => {
  try {
    const order = await service.delete(req.params.id);
    res.status(202).json('The order was deleted');
  } catch (error) {
    next(error);
  };
});

module.exports = router;
