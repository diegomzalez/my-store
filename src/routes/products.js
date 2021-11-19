const router = require('express').Router();
const faker = require('faker');

module.exports = router.get('/', (req, res) => {
  const { size } = req.query;
  const limit = size || 10;
  const products = [];
  for (let i = 0; i < limit; i++) {
    products.push({
      id: faker.random.uuid(),
      name: faker.commerce.productName(),
      price: faker.commerce.price(),
      image: faker.image.image(),
      description: faker.lorem.paragraph(),
    });
  }
  res.send(products);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.send({
    message: `Product ${body.name} created successfully`,
    data: body,
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
