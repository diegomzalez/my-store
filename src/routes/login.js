const router = require('express').Router();
const faker = require('faker');
const categories = require('./categories');
const users  = [];

module.exports = router.get('/', (req, res) => {
  res.send({
    message: 'Login page',
    users,
  });
});
