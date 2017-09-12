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
    type: Sequelize.INTEGER
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

