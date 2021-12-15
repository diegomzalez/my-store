const router = require('express').Router();
const passport = require('passport');
const AuthService = require('../services/auth.service');
const service = new AuthService();

router.post('/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.status(201).json(service.signToken(req.user))
    } catch (error) {
      next(error);
    };
  }
);
router.post('/recovery',
  async (req, res, next) => {
    try {
      const { email } = req.body;
      res.status(200).json(await service.sendRecovery(email));
    } catch (error) {
      next(error);
    };
  }
);

module.exports = router;
