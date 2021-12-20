const router = require('express').Router();
const passport = require('passport');
const UsersService = require('../services/users');
const service = new UsersService;
const { createUserSchema, updateUserSchema, getUserSchema, deleteUserSchema } = require('../schemas/user.schema');
const validatorHandler = require('../middlewares/validator.handler');
const { checkRoles } = require('../middlewares/auth.handler');

router.get('/',
  passport.authenticate('jwt', { session: false }),
  checkRoles('admin', 'customer'),
  async (req, res, next) => {
    try {
      const users = await service.find();
      res.status(200).send(users);
    } catch (error) {
      next(error);
    }
  });

router.post('/',
  validatorHandler(createUserSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(201).json(await service.create(req.body));
    } catch (error) {
      next(error);
    };
  });

router.get('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(getUserSchema, 'params'),
  async (req, res, next) => {
    try {
      res.status(200).json(await service.findOne(req.params.id));
    } catch (error) {
      next(error);
    };
  });


router.patch('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      res.status(202).json(await service.update(req.params.id, req.body));
    } catch (error) {
      next(error);
    };
  });

router.delete('/:id',
  passport.authenticate('jwt', { session: false }),
  validatorHandler(deleteUserSchema, 'params'),
  async (req, res, next) => {
    try {
      await service.delete(req.params.id);
      res.status(202).json('User deleted');
    } catch (error) {
      next(error);
    };
  });


module.exports = router;
