const router = require('express').Router();

module.exports = router.get('/send-email', (req, res) => {
  res.send('GET request to the homepage');
});
