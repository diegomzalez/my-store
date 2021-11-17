// Require express
const express = require('express');
const routerApi = require('./routes');
const app = express();

// Server routes
routerApi(app);

// Server port
app.listen(3500);
