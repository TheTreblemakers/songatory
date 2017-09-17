const router = require('express').Router();
const { Song, Artist, Album } = require('../db/models');
module.exports = router;

// POST /api/search?type=""&val=""
router.post('/', (req, res, next) => {
  const queryType = req.query.type;
  const query = req.query.val;
  console.log(`Received ${query} for ${queryType}`);
  const options = {
    where: {
      name: {
        $iLike: `%${query}%`,
      },
    },
  };

  switch (queryType) {
    case 'artists':
      Artist.findAll(options).then((results) => {
        res.json(results);
      });
      break;
    case 'albums':
      Album.findAll(options).then((results) => {
        res.json(results);
      });
      break;
    case 'songs':
      Song.findAll(options).then((results) => {
        res.json(results);
      });
      break;
    default:
      res.json([]);
  }
});
