const router = require('express').Router();
const passport = require('passport');
const OrdersService = require('../services/orders');
const service = new OrdersService();

router.get('/my-orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
