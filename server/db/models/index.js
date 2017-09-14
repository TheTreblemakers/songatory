const User = require('./user');
const Artist = require('./artist');
const Album = require('./album');
const Order = require('./order');
const Review = require('./review');
const Song = require('./song');

User.hasMany(Order);
User.hasMany(Review);

Artist.belongsToMany(Album, { through: 'artist_album' });
Artist.hasMany(Song);
Song.belongsTo(Artist);

Album.hasMany(Song);
Song.belongsTo(Album);
Album.hasMany(Review);

Song.hasMany(Review);


module.exports = {
  User,
  Artist,
  Album,
  Order,
  Review,
  Song
};
