const User = require('./user');
const Artist = require('./artist');
const Album = require('./album');
const Order = require('./order');
const Review = require('./review');
const Song = require('./song');
const OrderAlbumItem = require('./orderAlbum');

User.hasMany(Order);
User.hasMany(Review);

Artist.belongsToMany(Album, { through: 'artist_album' });

Album.hasMany(Song);
Album.hasMany(Review);

Song.hasMany(Review);

Order.belongsToMany(Album, { through: 'order_album_item' });
Album.belongsToMany(Order, { through: 'order_album_item' });


module.exports = {
  User,
  Artist,
  Album,
  Order,
  Review,
  Song,
  OrderAlbumItem
};
