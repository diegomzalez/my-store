const router = require('express').Router();

module.exports = router.get('/orders', (req, res) => {
  res.send('GET request to the homepage');
});
