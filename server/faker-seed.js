const db = require('./db');
const _ = require('lodash');
const faker = require('faker');
const crypto = require('crypto');
const rp = require('request-promise');
const Promise = require('bluebird');
const { User, Album, Artist, Review, Song } = require('./db/models');

let orderNumber = 123456789;
// let date = new Date();
faker.seed(54321);

const num_users = 100;
const num_artists = 16;
const maxAlbumsPerArtist = 5;
const maxSongsPerAlbum = 12;
const num_reviews = 100;

let imgIds;

var options = {
  uri: 'https://unsplash.it/list',
  headers: {
    'User-Agent': 'Request-Promise',
  },
  json: true, // Automatically parses the JSON string in the response
};

rp(options)
  .then((imgList) => {
    imgIds = imgList.map((img) => {
      return img.id;
    });
  })
  .then(() => {
    let reviews = _.times(num_reviews, () => ({
      score: faker.random.number({ min: 0, max: 5 }),
      content: faker.lorem.paragraph(),
    }));

    const generateUsers = () => {
      let users = _.times(num_users, () => ({
        name: faker.name.findName(),
        email: faker.internet.email(),
        isAdmin: Math.random() < 0.05 ? true : false,
        currentOrder: faker.random.number(),
        password: faker.internet.password(),
        salt: crypto.randomBytes(16).toString('base64'),
        googleId: faker.internet.userName(),
      }));

      users.push({
        name: `admin`,
        email: 'admin@equifax.com',
        isAdmin: true,
        currentOrder: faker.random.number(),
        password: `admin`,
        salt: '12345',
        googleId: faker.internet.userName(),
      });

      return Promise.all(
        users.map((user) => {
          return User.create(user);
        }),
      );
    };

    const generateSongs = () => {
      const numSongs = faker.random.number({ min: 5, max: maxSongsPerAlbum });
      let songs = _.times(numSongs, () => ({
        name: faker.lorem.words().replace(/\b\w/g, (l) => l.toUpperCase()),
        trackNumber: faker.random.number({ min: 1, max: 20 }),
        price: faker.random.number({ min: 25, max: 99 }),
      }));
      return Promise.all(
        songs.map((song) => {
          return Song.create(song);
        }),
      );
    };

    const generateArtists = () => {
      let artists = _.times(num_artists, () => {
        const id = imgIds[Math.floor(Math.random() * imgIds.length)];
        return {
          name: (faker.hacker.noun() + ' ' + faker.company.bsBuzz()).replace(/\b\w/g, (l) => l.toUpperCase()),
          bio: faker.lorem.sentences(),
          image: `https://unsplash.it/200/?image=${id}`,
        };
      });
      return Promise.all(
        artists.map((artist) => {
          return Artist.create(artist);
        }),
      );
    };

    const generateAlbums = () => {
      const numAlbums = faker.random.number({ min: 1, max: maxAlbumsPerArtist });
      let albums = _.times(numAlbums, () => {
        const id = imgIds[Math.floor(Math.random() * imgIds.length)];
        return {
          name: faker.lorem.words().replace(/\b\w/g, (l) => l.toUpperCase()),
          description: faker.lorem.sentence(),
          price: faker.random.number({ min: 500, max: 1000 }),
          year: faker.date.past(100).getFullYear(),
          image: `https://unsplash.it/g/200/?image=${id}`,
        };
      });

      return Promise.all(
        albums.map((album) => {
          return Album.create(album);
        }),
      );
    };

    const seed = () => {
      return generateArtists()
        .map((artist) => {
          return generateAlbums()
            .map((album) => {
              return generateSongs().then((songs) => {
                return album.setSongs(songs);
              });
            })
            .then((albums) => {
              return artist.setAlbums(albums);
            });
        })
        .then(() => {
          return generateUsers();
        });
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
  });
