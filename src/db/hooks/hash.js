"use strict";
const bcrypt = require('bcrypt');
/**
 * This function will encrypt the password before writing the data to the database.
 * @param {*} user
 * @param {*} options
 */
async function hashPassword(user, options) {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  return user.password = hashedPassword;
};
module.exports = { hashPassword };
