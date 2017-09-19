const Sequelize = require('sequelize');
const db = require('../db');
const Album = require('./album');

const Song = db.define(
  'song',
  {
    name: {
      type: Sequelize.STRING,
    },
    // sampleUrl: {
    //   type: Sequelize.STRING
    // },
    // donwloadUrl: {
    //   type: Sequelize.STRING
    // },
    trackNumber: {
      type: Sequelize.INTEGER,
    },
    // length: {

    // },
    price: {
      type: Sequelize.INTEGER, // in cents! divide by 100 as appropriate
    },
    displayPrice: {
      type: Sequelize.VIRTUAL,
      get() {
        return Number(this.getDataValue('price') / 100).toFixed(2);
      },
    },
    status: {
      type: Sequelize.BOOLEAN,
      defaultValue: true
    },
  },
  {
    defaultScope: {
      include: [Album],
    },
  });

module.exports = Song;

/**
 * instanceMethods
 */

/**
 * classMethods
 */

/**
 * hooks
 */
