const router = require('express').Router();
const { Order, Album, Song } = require('../db/models');
module.exports = router;

// Load cart
router.use('/cart/', (req, res, next) => {
  if (req.user) {
    res.sendStatus(404);
  } else {
    Order.findOne({ where: { session: req.sessionID, fulfilled: false } })
      .then((order) => (order ? order : Order.create({ session: req.sessionID })))
      .then((order) => {
        req.order = order;
        next();
      })
      .catch(next);
  }
});

// GET /api/guest/cart/
router.get('/cart/', (req, res, next) => {
  res.json({ albums: req.order.albums, songs: req.order.songs });
});

// PUT /api/guest/cart/
router.put('/cart/', (req, res, next) => {
  req.order
    .update(req.body)
    .then((order) => {
      res.json(order);
    })
    .catch(next);
});

// POST /api/guest/cart/albums/
router.post('/cart/albums/', (req, res, next) => {
  Album.findById(req.body.id)
    .then((album) => req.order.addAlbum(album))
    .then(() => req.order.reload())
    .then((order) => res.json(order.albums))
    .catch(next);
});

// POST /api/guest/cart/songs/
router.post('/cart/songs/', (req, res, next) => {
  Song.findById(req.body.id)
    .then((song) => req.order.addSong(song))
    .then(() => req.order.reload())
    .then((order) => res.json(order.songs))
    .catch(next);
});

// DELETE /api/guest/cart/albums/:id/
router.delete('/cart/albums/:id', (req, res, next) => {
  Album.findById(req.params.id)
    .then((album) => req.order.removeAlbum(album))
    .then(() => req.order.reload())
    .then((order) => res.json(order.albums))
    .catch(next);
});

// DELETE /api/guest/cart/songs/:id/
router.delete('/cart/songs/:id', (req, res, next) => {
  Song.findById(req.params.id)
    .then((song) => req.order.removeSong(song))
    .then(() => req.order.reload())
    .then((order) => res.json(order.songs))
    .catch(next);
});
