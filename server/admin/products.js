const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

// GET /admin/manage/products
router.get('/', (req, res, next) => {
  return Promise.all([Album.findAll(), Song.findAll()])
    .then(data => res.json({ albums: data[0], songs: data[1] }))
    .catch(next);
});

// GET /admin/manage/products/:id
router.get('/:id', (req, res, next) => {
  User.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(users => res.json(users))
    .catch(next);
});
