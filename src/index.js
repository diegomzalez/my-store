// Require express
const express = require('express');
const routerApi = require('./routes');
const app = express();
const { logErros, errorHandler, boomErrorHandler } = require('./middlewares/error.handler');
var cors = require('cors');

// Swagger
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

// Cors
app.use(cors());

// Middlewares
app.use(express.json());

// Server routes
routerApi(app);

// Cors

// Middlewares
app.use(logErros);
app.use(boomErrorHandler);
app.use(errorHandler);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server port
app.listen(process.env.PORT || 3500);
