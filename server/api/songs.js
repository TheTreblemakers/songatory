const router = require('express').Router();
const {Song, Album } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  Song.findById(id)
    .then(song => {
      req.song = song;
      next();
    }).catch(next);
});

// GET /api/songs/
router.get('/', (req, res, next) => {
  Song.findAll()
    .then(songs => res.json(songs))
    .catch(next);
});

// GET /api/songs/:id/
router.get('/:id/', (req, res, next) => {
  res.json(req.song);
});
