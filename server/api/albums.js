const router = require('express').Router();
const {Album} = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  Album.findById(id)
    .then(album => {
      req.album = album;
      next();
    }).catch(next);
});

// GET /api/albums/
router.get('/', (req, res, next) => {
  Album.findAll()
    .then(albums => res.json(albums))
    .catch(next);
});

// GET /api/albums/:id/
router.get('/:id/', (req, res, next) => {
  res.json(req.album);
});
