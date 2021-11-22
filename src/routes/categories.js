const router = require('express').Router();
const faker = require('faker');
const categories = [];
for (let i = 0; i < 10; i++) {
  categories.push({
    id: faker.random.uuid(),
    name: faker.commerce.department(),
    image: faker.image.imageUrl(),
  });
}

router.get('/', (req, res) => {
  res.status(200).json(categories);
});

router.get('/:id', (req, res) => {
  const category = categories.find(category => category.id === req.params.id);
  if (category) {
    res.status(302).json(category);
  } else {
    res.status(404).json(`Category ${req.params.id} doesn't exist`);
  };
});

module.exports = router;
