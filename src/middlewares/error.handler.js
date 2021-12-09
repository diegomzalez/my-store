const { ValidationError } = require('sequelize');
function logErros(err, req, res, next) {
  console.error(err);
  next(err);
};

function errorHandler(err, req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  });
};
function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err;
    res.status(output.statusCode).json(output.payload);
  } else {
    next(err);
  };
};
function sequilizeErrorHandler(err, req, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).send({
      statusCode: 409,
      message: err.name,
      errors: err.errors,
    });
  };
  next(err);
};

module.exports = { logErros, errorHandler, boomErrorHandler, sequilizeErrorHandler };
