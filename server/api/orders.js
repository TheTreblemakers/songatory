const router = require('express').Router();
const { Order } = require('../db/models');
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
