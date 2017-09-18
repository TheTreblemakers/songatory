const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;

router.param('id', (req, res, next, id) => {
  Category.scope('populated')
    .findById(id)
    .then((category) => {
      req.category = category;
      next();
    })
    .catch(next);
});

// GET /api/categories/
router.get('/', (req, res, next) => {
  Category.findAll().then((categories) => res.json(categories)).catch(next);
});

// GET /api/categories/:id/
router.get('/:id/', (req, res, next) => {
  res.json(req.category);
});
