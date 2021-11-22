const router = require('express').Router();
const faker = require('faker');
const orders = [];
for(let i = 0; i < 10; i++) {
  orders.push({
    id: faker.random.uuid(),
    name: faker.commerce.productName(),
    image: faker.image.imageUrl(),
    price: faker.commerce.price(),
    quantity: faker.random.number( 10 ),
  });
}

router.get('/', (req, res) => {
  res.send(orders);
});

router.get('/:id', (req, res) => {
  const order = orders.find(order => order.id === req.params.id);
  if(order) {
    res.send(order);
    } else {
      res.status(404).send({
        message: 'Order not found',
      });
    }
  });

module.exports = router;
