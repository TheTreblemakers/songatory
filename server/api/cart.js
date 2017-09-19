const router = require('express').Router();
const { Order, Album, Song } = require('../db/models');
const Promise = require('bluebird');

module.exports = router;

router.use('/', (req, res, next) => {
  const sessOrder = Order.findOne({
    where: {
      session: req.sessionID,
      userId: null,
      fulfilled: false,
    },
  });

  const curOrder = Order.findOne({
    where: {
      userId: req.user.id,
      fulfilled: false,
    },
  });

  Promise.all([ sessOrder, curOrder ])
    .then(([ sessionOrder, currentOrder ]) => {
      if (sessionOrder === null && currentOrder === null) {
        return Order.create({ userId: req.user.id });
      } else if (sessionOrder === null && currentOrder.id) {
        return currentOrder;
      } else if (sessionOrder.id && currentOrder === null) {
        if (sessionOrder.userId === null) return sessionOrder.update({ userId: req.user.id });
        else return sessionOrder;
      } else if (sessionOrder.id && currentOrder.id) {
        return currentOrder.mergeOrder(sessionOrder);
      }
    })
    .then((order) => {
      req.order = order;
      next();
    })
    .catch(next);
});

// GET /api/orders/cart/
router.get('/', (req, res, next) => {
  res.json({ albums: req.order.albums, songs: req.order.songs });
});

// PUT /api/orders/cart/
router.put('/', (req, res, next) => {
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
