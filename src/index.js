// Require express
const express = require('express');
const routerApi = require('./routes');
const app = express();
const { logErros, errorHandler, boomErrorHandler, sequilizeErrorHandler } = require('./middlewares/error.handler');
var cors = require('cors');
const passport = require('passport')

// Swagger
const swaggerUi = require('swagger-ui-express'),
  swaggerDocument = require('../swagger.json');

// Cors
app.use(cors());

// Passport
require('./utils/auth/');
app.use(passport.initialize());


// Middlewares
app.use(express.json());

// Server routes
routerApi(app);

// Middlewares
app.use(logErros);
app.use(sequilizeErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Server port
app.listen(process.env.PORT || 3500);
