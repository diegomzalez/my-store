const router = require('express').Router();
const products = require('../routes/products');
const categories = require('../routes/categories');
const users = require('../routes/users');
const orders = require('../routes/orders');
const notFound = require('../routes/notFound');
const home = require('../routes/home');
const customers = require('./customer');
const auth = require('./auth.routes');
const profileRouter = require('./profile.router');


module.exports = (function (app) {
  app.use('/api/v1', router);
  router.use('/', home);
  router.use('/products', products);
  router.use('/categories', categories);
  router.use('/users', users);
  router.use('/orders', orders);
  router.use('/customers', customers);
  router.use('/auth', auth);
  router.use('/profile', profileRouter)
  router.use('/*', notFound);
});
