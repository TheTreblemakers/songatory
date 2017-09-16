const Sequelize = require('sequelize');
const db = require('../db');

const OrderSongItem = db.define('order_song_item', {
  price: {
    type: Sequelize.INTEGER // price at time of purchase
  },
});

module.exports = OrderSongItem;
