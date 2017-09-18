const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

// GET /admin/manage/orders
router.get('/', (req, res, next) => {
  if (req.user.isAdmin) {
    Order.findAll()
      .then(orders => res.json(orders))
      .catch(next);
  } else {
    res.sendStatus(403).send('You do not have admin privileges and are forbidden from accessing this page');
  }
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
