const router = require('express').Router();

module.exports = router.get('/', (req, res) => {
  res.send('Hello! This is my first API with Node using Express :)');
});
