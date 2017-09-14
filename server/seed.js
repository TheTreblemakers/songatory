const db = require('./db');
const { User, Album, Artist, Review, Song } = require('./db/models');

let orderNumber = 123456789;
// let date = new Date();

const defaultAlbumArtistPics = [
  'http://www.chronicle.com/blogs/buildings/files/2011/09/Perdue-Hall.jpg',
  'http://www.masoncontractors.org/images/projects/mclennan-community-college-dennis-f-michaelis-academic-building/mclennan-community-college-dennis-f-michaelis-academic-building-1.jpg',
  'https://www.e-architect.co.uk/images/jpgs/new_york/brooklyn_college_westquad_vinoly0107.jpg',
  'https://www.stchas.edu/images/buildings/ssb-bldg-940.jpg',
  'http://ie-services.com/wp-content/uploads/2014/12/AC_SACNursing.jpg',
  'https://www.ucollege.edu/files/users/webadmin/images/CampusPhotos/Ortner%20Center%20exterior.jpg'
];

const users = [
  {
    name: 'Joe Ortiz',
    email: 'joe@gmail.com',
    isAdmin: true,
    currentOrder: orderNumber,
    password: 'joe',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'George Johnson',
    email: 'george@gmail.com',
    currentOrder: orderNumber + 1,
    password: 'george',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'Chris Superman',
    email: 'chris@gmail.com',
    currentOrder: orderNumber + 2,
    password: 'chris',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'James Jefferson',
    email: 'james@gmail.com',
    currentOrder: orderNumber + 3,
    password: 'james',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'Anita Watt',
    email: 'anita@gmail.com',
    currentOrder: orderNumber + 4,
    password: 'anita',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'Sarah Sarahson',
    email: 'sarah@gmail.com',
    currentOrder: orderNumber + 5,
    password: 'sarah',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'Joann Hansen',
    email: 'joann@gmail.com',
    currentOrder: orderNumber + 6,
    password: 'joann',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
  {
    name: 'Stef Smith',
    email: 'stef@gmail.com',
    currentOrder: orderNumber + 7,
    password: 'stef',
    salt: 'abcdefghijk',
    googleId: 'lmnop'
  },
];

const albums = [
  {
    name: 'Illinois',
    description: 'great album much wow 5 stars',
    price: 1234,
    year: 1997,
    image: defaultAlbumArtistPics[0]
  },
  {
    name: 'Texas',
    description: 'great album much wow 5 stars',
    price: 1234,
    year: 1997,
    image: defaultAlbumArtistPics[1]
  },
  {
    name: 'Florida',
    description: 'great album much wow 5 stars',
    price: 1234,
    year: 1997,
    image: defaultAlbumArtistPics[2]
  },
  {
    name: 'California',
    description: 'great album much wow 5 stars',
    price: 1234,
    year: 1997,
    image: defaultAlbumArtistPics[3]
  }
];

const artists = [
  {
    name: 'Illinois Tech',
    bio: 'Illinois Tech is an avant-garde, modern artist for all your modern needs jackson pollack etc.',
    image: defaultAlbumArtistPics[4]
  },
  {
    name: 'Texas State',
    bio: 'good ole country band from down yonder',
    image: defaultAlbumArtistPics[5]
  },
  {
    name: 'University of Florida',
    bio: 'this bluesy panhandle band will rock the joint with their funky tunes',
    image: defaultAlbumArtistPics[0]
  },
  {
    name: 'California State',
    bio: 'In true california style, this relaxed ambient music is perfect for the beach or relaxing after a fun party with friends',
    image: defaultAlbumArtistPics[1]
  }
];

const reviews = [
  {
    score: 1,
    content: 'great album much wow 5 stars, seriously great album much wow 5 stars',
  },
  {
    score: 2,
    content: 'great album much wow 5 stars, seriously great album much wow 5 stars',
  },
  {
    score: 3,
    content: 'great album much wow 5 stars, seriously great album much wow 5 stars',
  },
  {
    score: 4,
    content: 'great album much wow 5 stars, seriously great album much wow 5 stars',
  }
];

const songs = [
  {
    name: 'Illinois',
    trackNumber: 1,
    price: 1234,
  },
  {
    name: 'Texas',
    trackNumber: 2,
    price: 1234,
  },
  {
    name: 'Florida',
    trackNumber: 1,
    price: 1234,
  },
  {
    name: 'California',
    trackNumber: 1,
    price: 1234,
  },
  {
    name: 'Love',
    trackNumber: 1,
    price: 1234,
  }
];

const seed = () => {
  let seedUsers;
  let seedAlbums;
  let seedSongs;
  let seedReviews;
  let seedArtists;
  return Promise.all(users.map(user =>
    User.create(user))
  )
    .then((createdUsers) => {
      seedUsers = createdUsers;
      return Promise.all(artists.map(artist =>
        Artist.create(artist))
      );
    })
    .then((createdArtists) => {
      seedArtists = createdArtists;
      return Promise.all(albums.map(album =>
        Album.create(album))
      );
    })
    .then((createdAlbums) => {
      seedAlbums = createdAlbums;
      return Promise.all(songs.map(song =>
        Song.create(song))
      );
    })
    .then((createdSongs) => {
      seedSongs = createdSongs;
      return Promise.all(reviews.map(review =>
        Review.create(review))
      );
    })
    .then((createdReviews) => {
      seedReviews = createdReviews;
      return Promise.all(createdReviews.map((review, index) =>
        seedUsers[index % seedUsers.length].addReview(review)
      ));
    })
    .then(() =>
      Promise.all(seedReviews.map((review, index) => {
        if (index % 2 === 0) {
          return seedSongs[index % seedSongs.length].addReview(review);
        } else {
          return seedAlbums[index % seedAlbums.length].addReview(review);
        }
      }))
    )
    .then(() =>
      Promise.all(seedSongs.map((song, index) =>
        seedAlbums[index % seedAlbums.length].addSong(song)
      ))
    )
    .then(() =>
      Promise.all(seedAlbums.map((album, index) =>
        seedArtists[index % seedArtists.length].addAlbum(album)
      ))
    )
    .then(() =>
      Promise.all(seedSongs.map((song, index) =>
        seedArtists[index % seedArtists.length].addSong(song)
      ))
    );
};

const seedDb = () => {
  console.log('syncing db---');
  db.sync({ force: true })
    .then(() => {
      console.log('seeding db');
      return seed();
    })
    .catch(err => {
      console.log('seeding error');
      console.log(err.stack);
    })
    .then(() => {
      db.close();
      return null;
    });
};

seedDb();
