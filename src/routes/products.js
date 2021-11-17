const router = require('express').Router();
const faker = require('faker');

module.exports = router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push(faker.commerce.product());
  }
  res.send(products);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.send([
    {
      id,
      name: 'A Book',
      price: 10,
    },
  ]);
});
