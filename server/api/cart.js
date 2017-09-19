const router = require('express').Router();
const { Order, Album, Song } = require('../db/models');
module.exports = router;

// Load cart
router.use('/', (req, res, next) => {
  if (!req.user) {
    res.sendStatus(404);
  } else {
    Order.findOne({ where: { session: req.sessionID, userId: null, fulfilled: false } })
      .then(order => {
        if (!order){
          return Order.create({ userId: req.user.id, session: req.sessionID });
        }
        else {
          return order;
        }
     })
      .then(order => {
        if (order.userId === null) return order.update({userId: req.user.id}).then(updatedOrder => updatedOrder);
        else return order;
      })
      .then(order => {
        req.order = order;
        next();
      })
      .catch(next);
  }
});

// GET /api/orders/cart/
router.get('/', (req, res, next) => {
  res.json({ albums: req.order.albums, songs: req.order.songs });
});

// POST /api/orders/cart/albums/
router.post('/albums/', (req, res, next) => {
  Album.findById(req.body.id)
    .then(album => req.order.addAlbum(album))
    .then(() => req.order.reload())
    .then(order => res.json(order.albums))
    .catch(next);
});

// POST /api/orders/cart/songs/
router.post('/songs/', (req, res, next) => {
  Song.findById(req.body.id)
    .then(song => req.order.addSong(song))
    .then(() => req.order.reload())
    .then(order => res.json(order.songs))
    .catch(next);
});

// DELETE /api/orders/cart/albums/:id/
router.delete('/albums/:id', (req, res, next) => {
  Album.findById(req.params.id)
    .then(album => req.order.removeAlbum(album))
    .then(() => req.order.reload())
    .then(order => res.json(order.albums))
    .catch(next);
});

// DELETE /api/orders/cart/songs/:id/
router.delete('/songs/:id', (req, res, next) => {
  Song.findById(req.params.id)
    .then(song => req.order.removeSong(song))
    .then(() => req.order.reload())
    .then(order => res.json(order.songs))
    .catch(next);
});
