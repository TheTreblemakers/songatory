const router = require('express').Router();
const { Order } = require('../db/models');
module.exports = router;

// GET /api/orders/
router.get('/', (req, res, next) => {
  Order.findAll({
    where: {
      userId: req.user.id,
      fulfilled: true,
    },
  })
    .then((orders) => res.json(orders))
    .catch(next);
});

router.use('/cart', require('./cart'));
