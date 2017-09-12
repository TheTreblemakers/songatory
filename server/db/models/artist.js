const Sequelize = require('sequelize')
const db = require('../db')

const Artist = db.define('artist', {
  name: {
    type: Sequelize.STRING
  },
  bio: {
    type: Sequelize.TEXT
  },
  image: {
    type: Sequelize.STRING,
    // defaultValue: /*** insert default image ***/
  }
})

module.exports = Artist

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

