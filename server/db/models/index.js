const User = require('./user');
const Artist = require('./artist');
const Album = require('./album');
const Order = require('./order');
const Category = require('./category');
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
Album.addScope('populated', {
  include: [ Song, Artist, Category ],
});
Artist.addScope('populated', {
  include: [ Album.scope('withSongs') ],
});

Artist.belongsToMany(Category, { through: 'ArtistCategory' });
Album.belongsToMany(Category, { through: 'AlbumCategory' });
Category.belongsToMany(Artist, { through: 'ArtistCategory' });
Category.belongsToMany(Album, { through: 'AlbumCategory' });

module.exports = {
  User,
  Artist,
  Album,
  Category,
  Order,
  Review,
  Song,
};
