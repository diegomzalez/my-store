const router = require('express').Router();
const LoginService = require('../services/login');
const service = new LoginService();
const validatorHandler = require('../middlewares/validator.handler');
const { getLoginSchema, createLoginSchema, updateLoginSchema, deleteLoginSchema } = require('../schemas/login.schema');

router.get('/', async (req, res) => {
  res.status(200).json(await service.find());
});
router.post('/',
  validatorHandler(createLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json({
        message: 'The login was created succesfully',
        login: await service.create(req.body),
      });
    } catch (error) {
      next(error);
    };
  });
router.get('/:id',
  validatorHandler(getLoginSchema, 'params'),
  async (req, res, next) => {
    try {
      res.status(302).json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    };
  });
router.patch('/:id',
  validatorHandler(getLoginSchema, 'params'),
  validatorHandler(updateLoginSchema, 'body'),
  async (req, res, next) => {
    try {
      const login = await service.update(req.params.id, req.body);
      res.status(202).json(login);
    } catch (error) {
      next(error);
    };
  });
router.delete('/:id',
  validatorHandler(deleteLoginSchema, 'params'),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(202).json(`The login was deleted`);
    } catch (error) {
      next(error);
    };
  });

module.exports = router;
