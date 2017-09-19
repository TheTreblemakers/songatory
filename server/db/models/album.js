const Sequelize = require('sequelize');
const db = require('../db');
const Artist = require('./artist');

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
  displayPrice: {
    type: Sequelize.VIRTUAL,
    get() {
      return (this.getDataValue('price') / 100);
    }
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
  status: {
    type: Sequelize.BOOLEAN,
    defaultValue: true
  },
  image: {
    type: Sequelize.STRING,
    // defaultValue: /*** insert default image ***/
  }
}, {
  defaultScope: {
    include: [ Artist ]
  }
});

module.exports = Album;

/**
 * instanceMethods
 */


/**
 * classMethods
 */


/**
 * hooks
 */

