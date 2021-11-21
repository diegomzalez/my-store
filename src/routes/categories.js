const router = require('express').Router();
const faker = require('faker');
const categories = [
  {
    id: faker.random.uuid(),
  }
];

router.get('/', (req, res) => {
  res.send(categories);
});

router.get('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const category = categories.map(category => category.id);
  if (category.includes(categoryId)) {
    res.send("XD");
  } else {
    res.send(`Category ${categoryId} not found`);
  };
});

module.exports = router;
