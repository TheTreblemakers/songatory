const router = require('express').Router();
module.exports = router;

// Authorization Check
router.use((req, res, next) => {
  if (req.user && req.user.isAdmin) {
      next();
  } else {
    res.status(403).send('Forbidden');
  }
});

router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));

router.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
