const db = require('./db');
const _ = require('lodash');
const path = require('path');
const faker = require('faker');
const fs = require('fs');
const crypto = require('crypto');
const rp = require('request-promise');
const Promise = require('bluebird');
const { Category, User, Album, Artist, Review, Song } = require('./db/models');

let orderNumber = 123456789;
// let date = new Date();
faker.seed(54321);

const num_users = 100;
const num_categories = 15;
const num_artists = 50;
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

    const generateCategories = () => {
      const filePath = path.join(__dirname, '/genres.txt');
      let genreList = fs.readFileSync(filePath).toString().split('\n');
      genreList = getRandomSubarray(genreList, num_categories);
      let categories = genreList.map((genre) => ({
        name: genre,
      }));
      return Promise.all(
        categories.map((category) => {
          return Category.create(category);
        }),
      );
    };

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
      let trackNumber = 1;
      let songs = _.times(numSongs, () => ({
        name: faker.lorem.words().replace(/\b\w/g, (l) => l.toUpperCase()),
        trackNumber: trackNumber++,
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
        })
        .then(() => {
          return generateCategories();
        })
        .then((createdCategories) => {
          return Album.findAll().map((album) => {
            const numCategories = faker.random.number({ min: 1, max: 3 });
            const albumCategories = getRandomSubarray(createdCategories, numCategories);
            return album.setCategories(albumCategories);
          });
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

const getRandomSubarray = (arr, size) => {
  var shuffled = arr.slice(0),
    i = arr.length,
    temp,
    index;
  while (i--) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffled[index];
    shuffled[index] = shuffled[i];
    shuffled[i] = temp;
  }
  return shuffled.slice(0, size);
};
