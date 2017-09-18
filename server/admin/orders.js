const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

// GET /admin/manage/orders
router.get('/', (req, res, next) => {
  Order.findAll()
    .then(orders => res.json(orders))
    .catch(next);
});

// GET /admin/manage/orders/:id
router.get('/:id', (req, res, next) => {
  Order.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(orders => res.json(orders))
    .catch(next);
});
