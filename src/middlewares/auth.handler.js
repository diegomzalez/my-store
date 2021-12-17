const boom = require('@hapi/boom');

/**
 * This function verifies if a user has role that it can use in a endpoint
 * @param  {...any} roles
 * @returns closure
 */
function checkRoles(...roles) {
  return (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) {
      next();
    } else {
      next(boom.unauthorized());
    };
  };
};

module.exports = { checkRoles };
