const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

// GET /api/orders/cart/
router.get('/cart/', (req, res, next) => {
  Order.findOne({ where: { userId: req.user.id, fulfilled: false } })
    .then(order => {
      console.log(order);
      res.json(order || {});
      return null;
    })
    .catch(next);
});
