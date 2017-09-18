const router = require('express').Router();
const { User } = require('../db/models');
module.exports = router;

// GET /admin/users
router.get('/', (req, res, next) => {
  User.findAll()
    .then(users => res.json(users))
    .catch(next);
});

// GET /admin/users/:id
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(users => res.json(users))
    .catch(next);
});
