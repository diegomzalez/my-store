const router = require('express').Router();
const products = require('../routes/products');
const categories = require('../routes/categories');
const login = require('../routes/login');
const users = require('../routes/users');
const orders = require('../routes/orders');
const account = require ('../routes/account');
const newPassword = require('../routes/newPassword');
const checkout = require('../routes/checkout');
const sendEmail = require('../routes/sendEmail');
const passwordRecovery = require('../routes/passwordRecovery');
const signUp = require('../routes/signUp');
const notFound = require('../routes/notFound');
const home = require('../routes/home');
const customers = require('./customer');
const auth = require('./auth');
const profileRouter = require('./profile.router');


module.exports = (function (app) {
  app.use('/api/v1', router);
  router.use('/', home);
  router.use('/products', products);
  router.use('/categories', categories);
  router.use('/login', login);
  router.use('/users', users);
  router.use('/orders', orders);
  router.use('/account', account);
  router.use('/newPassword', newPassword);
  router.use('/checkout', checkout);
  router.use('/sendEmail', sendEmail);
  router.use('/passwordRecovery', passwordRecovery);
  router.use('/singUp', signUp);
  router.use('/customers', customers);
  router.use('/auth', auth);
  router.use('/profile', profileRouter)
  router.use('/*', notFound);
});
