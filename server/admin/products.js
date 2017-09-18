const router = require('express').Router();
const { Album, Song } = require('../db/models');
module.exports = router;

// GET /admin/products
router.get('/', (req, res, next) => {
  return Promise.all([Album.findAll(), Song.findAll()])
    .then(data => res.json({ albums: data[0], songs: data[1] }))
    .catch(next);
});

