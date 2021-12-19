const router = require('express').Router();
const passport = require('passport');
const CustomerService = require('../services/customers');
const validationHandler = require('../middlewares/validator.handler');
const {
  createCustomerSchema,
  getCustomerSchema,
  updateCustomerSchema,
} = require('../schemas/customer.schema');
const service = new CustomerService();

router.get('/',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const customers = await service.find();
      res.status(200).send(customers);
    } catch (error) {
      next(error);
    }
  });
router.post('/',
  passport.authenticate('jwt', { session: false }),
  validationHandler(createCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);
router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.findOne(req.params.id))
    } catch (err) {
      next(err);
    };
  }
);


router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCustomerSchema, 'params'),
  validationHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(200).json(await service.update(id, body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validationHandler(getCustomerSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      res.status(200).json(await service.delete(id));
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
