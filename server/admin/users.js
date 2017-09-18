const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

// GET /admin/manage/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

// GET /admin/manage/users/:id
router.get('/:id', (req, res, next) => {
  User.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(users => res.json(users))
    .catch(next);
});
