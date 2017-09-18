const router = require('express').Router();
const { Order, User, Artist, Album, Song } = require('../db/models');
module.exports = router;

router.use('/orders', require('./orders'));
router.use('/users', require('./users'));
router.use('/products', require('./products'));
