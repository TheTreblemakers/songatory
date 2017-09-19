const router = require('express').Router();
const {User} = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => res.json(users))
    .catch(next);
});

router.put('/username/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.update({
        email: req.body.email
      });
    })
    .then(user => res.json(user))
    .catch(next);
});

router.put('/password/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      return user.update({
        password: req.body.password
      });
    })
    .then(user => res.json(user))
    .catch(next);
});
