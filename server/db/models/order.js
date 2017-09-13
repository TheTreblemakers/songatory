const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  date: {
    type: Sequelize.DATE
  },
  session: {
    type: Sequelize.STRING
  },
  fulfilled: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  paymentMethod: {
    type: Sequelize.STRING
  }
});

module.exports = Order;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

