const Sequelize = require('sequelize')
const db = require('../db')

const Album = db.define('album', {
  name: {
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
  },
  price: {
    type: Sequelize.INTEGER // in cents! divide by 100 as appropriate
  },
  year: {
    type: Sequelize.INTEGER,
    validate: {
      isValid(value) {
        let currentYear = (new Date()).getFullYear();
        if (value < 0 || value > currentYear) {
          throw new Error('Please select a valid year! For instance, the album\'s year cannot be in the future');
        }
      }
    }
  },
  image: {
    type: Sequelize.STRING,
    // defaultValue: /*** insert default image ***/
  }
})

module.exports = Album

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

