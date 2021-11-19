// Require express
const express = require('express');
const routerApi = require('./routes');
const app = express();

// Middlewares
app.use(express.json());

// Server routes
routerApi(app);

// Server port
app.listen(3500);
