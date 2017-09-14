const db = require('./db');
const _ = require('lodash');
const faker = require('faker');
const crypto = require('crypto');
const { User, Album, Artist, Review, Song } = require('./db/models');

let orderNumber = 123456789;
// let date = new Date();
faker.seed(12345);

const defaultAlbumArtistPics = [
  'http://www.chronicle.com/blogs/buildings/files/2011/09/Perdue-Hall.jpg',
  'http://www.masoncontractors.org/images/projects/mclennan-community-college-dennis-f-michaelis-academic-building/mclennan-community-college-dennis-f-michaelis-academic-building-1.jpg',
  'https://www.e-architect.co.uk/images/jpgs/new_york/brooklyn_college_westquad_vinoly0107.jpg',
  'https://www.stchas.edu/images/buildings/ssb-bldg-940.jpg',
  'http://ie-services.com/wp-content/uploads/2014/12/AC_SACNursing.jpg',
  'https://www.ucollege.edu/files/users/webadmin/images/CampusPhotos/Ortner%20Center%20exterior.jpg',
];

const num_users = 100;
const num_albums = 100;
const num_artists = 100;
const num_reviews = 100;
const num_songs = 100;

let users = _.times(num_users, () => ({
  name: faker.name.findName(),
  email: faker.internet.email(),
  isAdmin: Math.random() < 0.05 ? true : false,
  currentOrder: faker.random.number(),
  password: faker.internet.password(),
  salt: crypto.randomBytes(16).toString('base64'),
  googleId: faker.internet.userName(),
}));

let albums = _.times(num_albums, () => ({
  name: faker.lorem.words().replace(/\b\w/g, (l) => l.toUpperCase()),
  description: faker.lorem.paragraph(),
  price: faker.random.number({ min: 500, max: 1000 }),
  year: faker.date.past(100).getFullYear(),
  image: faker.internet.url(),
}));

let artists = _.times(num_albums, () => ({
  name: (faker.hacker.noun() + ' ' + faker.company.bsBuzz()).replace(/\b\w/g, (l) => l.toUpperCase()),
  bio: faker.lorem.paragraphs(),
  image: defaultAlbumArtistPics[4],
}));

let reviews = _.times(num_albums, () => ({
  score: faker.random.number({ min: 0, max: 5 }),
  content: faker.lorem.paragraph(),
}));

let songs = _.times(num_albums, () => ({
  name: faker.lorem.words().replace(/\b\w/g, (l) => l.toUpperCase()),
  trackNumber: faker.random.number({ min: 1, max: 20 }),
  price: faker.random.number({ min: 25, max: 99 }),
}));

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
