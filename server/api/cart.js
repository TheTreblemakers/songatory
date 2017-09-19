const router = require('express').Router();
const { Order, Album, Song } = require('../db/models');
const Promise = require('bluebird');
module.exports = router;

// Load cart
router.use('/', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(404);
  } else {
    // console.log('sessionID: ', req.sessionID);
    const orders = [
      Order.findOne({ where: { userId: req.user.id, fulfilled: false } }),
      Order.findOne({ where: { session: req.sessionID, fulfilled: false } }),
    ];

    Promise.all(orders)
      .then(([ userOrder, sessionOrder ]) => {
        // console.log('USER ORDER IS????', userOrder);
        if (!userOrder) {
          // console.log('------ NO USER ORDER ------');
          return sessionOrder.update({ userId: req.user.id });
        } else {
          const mergeAlbums = Promise.map(sessionOrder.albums, (album) => {
            userOrder.addAlbum(album);
          });
          const mergeSongs = Promise.map(sessionOrder.songs, (song) => {
            userOrder.addSong(song);
          });
          return Promise.all([ mergeAlbums, mergeSongs ]).then(() => userOrder);
        }
      })
      .then((userOrder) => {
        console.log('MERGED USER ORDER????? ', userOrder.albums.length, userOrder.songs.length);
        req.order = userOrder;
        next();
      })
      .catch(next);
  }
});

// GET /api/orders/cart/
router.get('/', (req, res, next) => {
  res.json({ albums: req.order.albums, songs: req.order.songs });
});

// PUT /api/orders/cart/
router.put('/', (req, res, next) => {
  console.log(req.order);
  req.order
    .update(req.body)
    .then((order) => {
      res.json(order);
    })
    .catch(next);
});

// POST /api/orders/cart/albums/
router.post('/albums/', (req, res, next) => {
  Album.findById(req.body.id)
    .then((album) => req.order.addAlbum(album))
    .then(() => req.order.reload())
    .then((order) => res.json(order.albums))
    .catch(next);
});

// POST /api/orders/cart/songs/
router.post('/songs/', (req, res, next) => {
  Song.findById(req.body.id)
    .then((song) => req.order.addSong(song))
    .then(() => req.order.reload())
    .then((order) => res.json(order.songs))
    .catch(next);
});

// DELETE /api/orders/cart/albums/:id/
router.delete('/albums/:id', (req, res, next) => {
  Album.findById(req.params.id)
    .then((album) => req.order.removeAlbum(album))
    .then(() => req.order.reload())
    .then((order) => res.json(order.albums))
    .catch(next);
});

// DELETE /api/orders/cart/songs/:id/
router.delete('/songs/:id', (req, res, next) => {
  Song.findById(req.params.id)
    .then((song) => req.order.removeSong(song))
    .then(() => req.order.reload())
    .then((order) => res.json(order.songs))
    .catch(next);
});
