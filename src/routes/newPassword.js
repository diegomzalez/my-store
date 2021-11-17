const router = require('express').Router();

module.exports = router.get('/new-password', (req, res) => {
  res.send('GET request to the homepage');
});
