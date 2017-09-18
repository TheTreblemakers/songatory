const router = require('express').Router();
const { Album } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  Album.scope('populated')
    .findById(id)
    .then((album) => {
      req.album = album;
      next();
    })
    .catch(next);
});

// PUT /admin/albums/:id/
router.post('/:id/', (req, res, next) => {
  return req.album.update(req.body)
    .then(album => res.json(album))
    .catch(next);
});
