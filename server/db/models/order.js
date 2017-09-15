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
}, {
  hooks: {
    beforeValidate: order => {
      return Order.findOne({ where: { userId: order.userId, fulfilled: false } })
        .then(matchedOrder => {
          if (matchedOrder) {
            return Sequelize.Promise.reject(new Error('User already has an unfulfilled order'));
          } else {
            return order;
          }
        });
    },
  },
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

