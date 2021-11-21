const router = require('express').Router();
const faker = require('faker');
const { categories } = require('./categories');
const products = [];
for (let i = 0; i < 10; i++) {
  products.push({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
};

router.get('/', (req, res) => {
  res.send(products);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.send({
    message: `Product ${body.name} created successfully`,
    data: body,
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.send({
    message: `Product ${id} updated successfully`,
    data: body,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.send({
    message: `Product ${id} deleted successfully`,
  });
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

module.exports = router;
