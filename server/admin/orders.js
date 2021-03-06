const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

// GET /admin/orders
router.get('/', (req, res, next) => {
  Order.findAll({ where: { fulfilled: true } }).then((orders) => res.json(orders)).catch(next);
});
