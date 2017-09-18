const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

// GET /admin/manage/users
router.get('/', (req, res, next) => {
  if (req.user.isAdmin) {
    User.findAll()
      .then(users => res.json(users))
      .catch(next);
  } else {
    res.sendStatus(403).send('You do not have admin privileges and are forbidden from accessing this page');
  }
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
