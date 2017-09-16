const User = require('./user');
const Artist = require('./artist');
const Album = require('./album');
const Order = require('./order');
const Review = require('./review');
const Song = require('./song');
const OrderAlbumItem = require('./orderAlbum');
const OrderSongItem = require('./orderSong');

User.hasMany(Order);
User.hasMany(Review);

Artist.hasMany(Album);
Album.belongsTo(Artist);

Album.hasMany(Song);
Song.belongsTo(Album);

Album.hasMany(Review);
Song.hasMany(Review);


Order.belongsToMany(Album, { through: 'order_album_item' });
Album.belongsToMany(Order, { through: 'order_album_item' });

Order.belongsToMany(Song, { through: 'order_song_item' });
Song.belongsToMany(Order, { through: 'order_song_item' });

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
  OrderAlbumItem,
  OrderSongItem,
};
