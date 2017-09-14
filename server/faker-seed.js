const db = require('./db');
const _ = require('lodash');
const faker = require('faker');
const { User, Album, Artist, Review, Song } = require('./db/models');

let orderNumber = 123456789;
// let date = new Date();

const defaultAlbumArtistPics = [
  'http://www.chronicle.com/blogs/buildings/files/2011/09/Perdue-Hall.jpg',
  'http://www.masoncontractors.org/images/projects/mclennan-community-college-dennis-f-michaelis-academic-building/mclennan-community-college-dennis-f-michaelis-academic-building-1.jpg',
  'https://www.e-architect.co.uk/images/jpgs/new_york/brooklyn_college_westquad_vinoly0107.jpg',
  'https://www.stchas.edu/images/buildings/ssb-bldg-940.jpg',
  'http://ie-services.com/wp-content/uploads/2014/12/AC_SACNursing.jpg',
  'https://www.ucollege.edu/files/users/webadmin/images/CampusPhotos/Ortner%20Center%20exterior.jpg',
];

const users = [
  {
    name: 'Joe Ortiz',
    email: 'joe@gmail.com',
    isAdmin: true,
    currentOrder: orderNumber,
    password: 'joe',
    salt: 'abcdefghijk',
    googleId: 'lmnop',
  },
];

const albums = [
  {
    name: 'Illinois',
    description: 'great album much wow 5 stars',
    price: 1234,
    year: 1997,
    image: defaultAlbumArtistPics[0],
  },
];

const artists = [
  {
    name: 'Illinois Tech',
    bio: 'Illinois Tech is an avant-garde, modern artist for all your modern needs jackson pollack etc.',
    image: defaultAlbumArtistPics[4],
  },
];

const reviews = [
  {
    score: 1,
    content: 'great album much wow 5 stars, seriously great album much wow 5 stars',
  },
];

const songs = [
  {
    name: 'Illinois',
    trackNumber: 1,
    price: 1234,
  },
];

const seed = () => {
  let seedUsers;
  let seedAlbums;
  let seedSongs;
  let seedReviews;
  let seedArtists;
  return Promise.all(users.map((user) => User.create(user)))
    .then((createdUsers) => {
      seedUsers = createdUsers;
      return Promise.all(artists.map((artist) => Artist.create(artist)));
    })
    .then((createdArtists) => {
      seedArtists = createdArtists;
      return Promise.all(albums.map((album) => Album.create(album)));
    })
    .then((createdAlbums) => {
      seedAlbums = createdAlbums;
      return Promise.all(songs.map((song) => Song.create(song)));
    })
    .then((createdSongs) => {
      seedSongs = createdSongs;
      return Promise.all(reviews.map((review) => Review.create(review)));
    })
    .then((createdReviews) => {
      seedReviews = createdReviews;
      return Promise.all(createdReviews.map((review, index) => seedUsers[index % seedUsers.length].addReview(review)));
    })
    .then(() =>
      Promise.all(
        seedReviews.map((review, index) => {
          if (index % 2 === 0) {
            return seedSongs[index % seedSongs.length].addReview(review);
          } else {
            return seedAlbums[index % seedAlbums.length].addReview(review);
          }
        }),
      ),
    )
    .then(() => Promise.all(seedSongs.map((song, index) => seedAlbums[index % seedAlbums.length].addSong(song))))
    .then(() => Promise.all(seedAlbums.map((album, index) => seedArtists[index % seedArtists.length].addAlbum(album))));
};

const seedDb = () => {
  console.log('syncing db---');
  db
    .sync({ force: true })
    .then(() => {
      console.log('seeding db');
      return seed();
    })
    .catch((err) => {
      console.log('seeding error');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

seedDb();
