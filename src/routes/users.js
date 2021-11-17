const router = require('express').Router();

module.exports = router.get('/users', (req, res) => {
  const { limit, offset } = req.query;
  (limit && offset) ? res.send([
    {
      limit,
      offset,
    },
  ]) : res.send('There are no params');
});
