const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

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

router.use('/manage', require('./manage'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
