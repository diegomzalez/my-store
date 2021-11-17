const router = require('express').Router();

module.exports = router.get('/categories/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.send([
    {
      categoryId,
      productId,
    },
  ]);
});

