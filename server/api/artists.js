const router = require('express').Router();
const { Artist } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  Artist.scope('populated')
    .findById(id)
    .then((artist) => {
      req.artist = artist;
      next();
    })
    .catch(next);
});

// GET /api/artists/
router.get('/', (req, res, next) => {
  Artist.findAll().then((artists) => res.json(artists)).catch(next);
});

// GET /api/artists/:id/
router.get('/:id/', (req, res, next) => {
  res.json(req.artist);
});
