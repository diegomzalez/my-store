const router = require('express').Router();
const faker = require('faker');
const users = [];
for(let i = 0; i < 10; i++) {
  users.push({
    id: faker.random.uuid(),
    name: faker.name.findName(),
    email: faker.internet.email(),
    avatar: faker.internet.avatar()
  });
}
router.get('/', (req, res) => {
  res.json(users);
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find(user => user.id === id);
  if(user) {
    res.send(user);
  } else {
    res.sendStatus(404);
  }
})


module.exports = router;
