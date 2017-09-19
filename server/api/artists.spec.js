/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Artist = db.model('artist');

describe('Artist routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/artists/', () => {
    const artist = {
      name: 'Firewall Evolve',
      bio: 'Totam voluptatem alias accusamus molestias. Aliquam autem alias nisi.',
      image: 'https://unsplash.it/200/?image=1047',
    };

    beforeEach(() => {
      return Artist.create({
        name: artist.name,
        bio: artist.bio,
        image: artist.image,
      });
    });

    it('GET /api/artists', () => {
      return request(app)
        .get('/api/artists')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].bio).to.be.equal('Totam voluptatem alias accusamus molestias. Aliquam autem alias nisi.');
      });
    });
  }); // end describe('/api/albums)
}); // end describe('Albums routes')
