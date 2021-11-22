const router = require('express').Router();
const faker = require('faker');
const products = [];
for (let i = 0; i < 10; i++) {
  products.push({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
  });
};

router.get('/', (req, res) => {
  res.status(200).json(products);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: `Product ${body.name} created successfully`,
    data: body,
  });
});

router.get('/:id', (req, res) => {
  const id = products.find(product => product.id === req.params.id);
  if (id) {
    res.status(200).json(id);
  } else {
    res.status(404).json({
      message: 'Product not found',
    });
  }
});


router.patch('/:id', (req, res) => {
  const productId = req.params.id;
  const body = req.body;
  const product = products.find(product => product.id === productId);
  if (product) {
    product.name = body.name;
    product.price = body.price;
    res.status(200).json({
      message: `Product ${productId} updated successfully`,
      data: product,
    });
  } else {
    res.status(404).json({
      message: 'Product not found',
    });
  }});

router.delete('/:id', (req, res) => {
  const id = products.find(product => product.id === req.params.id);
  if (id) {
    products.splice(products.indexOf(id), 1);
    res.status(200).json({
      message: `Product ${req.params.id} deleted successfully`,
    });
  } else {
    res.status(404).json({
      message: `Product ${req.params.id} not found`,
    });
  }
});

module.exports = router;
