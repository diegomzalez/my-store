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

module.exports = (function (app) {
  app.use('/api/v1/', home);
  app.use('/api/v1/products', products);
  app.use('/api/v1/categories', categories);
  app.use('/api/v1/login', login);
  app.use('/api/v1/users', users);
  app.use('/api/v1/orders', orders);
  app.use('/api/v1/account', account);
  app.use('/api/v1/newPassword', newPassword);
  app.use('/api/v1/checkout', checkout);
  app.use('/api/v1/sendEmail', sendEmail);
  app.use('/api/v1/passwordRecovery', passwordRecovery);
  app.use('/api/v1/singUp', signUp);
  app.use('/api/v1/*', notFound);
});
