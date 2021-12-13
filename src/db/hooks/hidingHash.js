"use strict";

/**
 * The function hide the user password to send to the response
 * @param {*} user
 * @param {*} options
 * @returns
 */
async function hideHash(user, options) {
  if (Object.keys(user).includes('dataValues')) return delete user.dataValues.password;
  else return await user.map(user => delete user.dataValues.password);
};

module.exports = { hideHash };

