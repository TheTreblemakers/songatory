const router = require('express').Router();
const { Order } = require('../db/models');
const chalk = require('chalk');
module.exports = router;

// router.param('id', (req, res, next, id) => {
//   Order.findById(id)
//     .then(order => {
//       req.order = order;
//       next();
//     }).catch(next);
// });

// // GET /api/orders/
// router.get('/', (req, res, next) => {
//   Order.findAll()
//     .then(orders => res.json(orders))
//     .catch(next);
// });

// GET /api/orders/
router.get('/', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.user.id,
      fulfilled: true
    }
  })
    .then(orders => res.json(orders))
    .catch(next);
});

router.use('/cart', require('./cart'));
