const body = {
  "price": 400,
};

body.price = String(body.price);
console.log(typeof body.price)
console.log(body.price);
