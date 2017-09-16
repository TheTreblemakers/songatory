const Sequelize = require('sequelize');
const db = require('../db');

const OrderAlbumItem = db.define('order_album_item', {
  price: {
    type: Sequelize.INTEGER // price at time of purchase
  },
});

module.exports = OrderAlbumItem;
