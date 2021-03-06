const router = require('express').Router();
module.exports = router;

router.use('/users', require('./users'));
router.use('/songs', require('./songs'));
router.use('/albums', require('./albums'));
router.use('/artists', require('./artists'));
router.use('/categories', require('./categories'));
router.use('/search', require('./search'));
router.use('/orders', require('./orders'));
router.use('/guest', require('./guest'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
