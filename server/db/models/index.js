const User = require('./user');
const Artist = require('./artist');
const Album = require('./album');
const Order = require('./order');
const Review = require('./review');
const Song = require('./song');

User.hasMany(Order);
User.hasMany(Review);

Artist.hasMany(Album);
Album.belongsTo(Artist);

Album.hasMany(Song);
Song.belongsTo(Album);

Album.hasMany(Review);
Song.hasMany(Review);

Album.addScope('withSongs', {
  include: [ Song ],
});
Artist.addScope('populated', {
  include: [ Album.scope('withSongs') ],
});

module.exports = {
  User,
  Artist,
  Album,
  Order,
  Review,
  Song,
};
