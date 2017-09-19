const Sequelize = require('sequelize');
const db = require('../db');
const Album = require('./album');
const Song = require('./song');
const Promise = require('bluebird');

const Order = db.define(
  'order',
  {
    date: {
      type: Sequelize.DATE,
    },
    email: {
      type: Sequelize.STRING,
      validate: {
        isEmail: true,
      },
    },
    name: {
      type: Sequelize.STRING,
    },
    session: {
      type: Sequelize.STRING,
    },
    fulfilled: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    paymentMethod: {
      type: Sequelize.STRING,
    },
  },
  {
    defaultScope: {
      include: [ Album, Song ],
    },
    hooks: {
      beforeValidate: (order) => {
        return Order.findOne({ where: { userId: order.userId, fulfilled: false } }).then((matchedOrder) => {
          if (matchedOrder && matchedOrder.id !== order.id) {
            return Sequelize.Promise.reject(new Error('User already has an unfulfilled order'));
          } else {
            return order;
          }
        });
      },
      afterUpdate: (order) => {
        if (order.changed().indexOf('fulfilled') !== -1) {
          return order.reload()
            .then(fetchedOrder => Promise.all([
              fetchedOrder.albums.map(album => album.order_album_item.update({ price: album.price })),
              fetchedOrder.songs.map(song => song.order_song_item.update({ price: song.price }))
            ]));
        }
      },
    },
  }
);

Order.prototype.mergeOrder = function (newOrder) {
  const albumsPromise = Promise.map(newOrder.albums, (album) => this.addAlbum(album));
  const songsPromise = Promise.map(newOrder.songs, (song) => this.addSong(song));

  return Promise.all([ albumsPromise, songsPromise ])
    .then(() => newOrder.destroy())
    .then(() => this.reload());
};

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
