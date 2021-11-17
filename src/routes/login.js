const router = require('express').Router();

module.exports = router.get('/login', (req, res) => {
  res.send('GET request to the homepage');
});
