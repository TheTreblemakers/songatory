const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

// GET /api/orders/cart/
router.get('/cart/', (req, res, next) => {
  Order.findOne({ where: { userId: req.user.id } })
    .then(order => res.json(order))
    .catch(next);
});