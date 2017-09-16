const router = require('express').Router();
const { Order, Album, Song } = require('../db/models');
module.exports = router;

// Load cart
router.use('/cart/', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(404);
  } else {
    Order.findOne({ where: { userId: req.user.id, fulfilled: false } })
      .then(order => order ? order : Order.create({ userId: req.user.id }))
      .then(order => {
        req.order = order;
        next();
      })
      .catch(next);
  }
});

// GET /api/orders/cart/
router.get('/cart/', (req, res, next) => {
  res.json({ albums: req.order.albums, songs: req.order.songs });
});

// POST /api/orders/cart/albums/
router.post('/cart/albums/', (req, res, next) => {
  Album.findOne(req.body)
    .then(album => req.order.addAlbum(album))
    .then(() => req.order.reload())
    .then(order => res.json(order.albums))
    .catch(next);
});

// POST /api/orders/cart/songs/
router.post('/cart/songs/', (req, res, next) => {
  Song.findOne(req.body)
    .then(song => req.order.addSong(song))
    .then(() => req.order.reload())
    .then(order => res.json(order.songs))
    .catch(next);
});
