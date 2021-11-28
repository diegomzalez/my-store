// Require express
const express = require('express');
const routerApi = require('./routes');
const app = express();
const { logErros, errorHandler, boomErrorHandler } = require('./middlewares/error.handler')

// Middlewares
app.use(express.json());

// Server routes
routerApi(app);

// Middlewares
app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

// Server port
app.listen(3500);
