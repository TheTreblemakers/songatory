const Sequelize = require('sequelize');
const db = require('../db');

const Review = db.define('review', {
  score: {
    type: Sequelize.INTEGER, // divide score by 10 to get 0.0 to 5.0 rating/scale
    validate: {
      min: 0,
      max: 5
    }
  },
  content: {
    type: Sequelize.TEXT,
    allowNull: true,
    validate: {
      len: [50, 1000]
    }
  }
});

module.exports = Review;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

