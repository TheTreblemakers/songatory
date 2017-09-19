/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Album = db.model('album');

describe('Album routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/albums/', () => {
    const album = {
      name: 'Distributed',
      description: 'Molestiae recusandae vel perspiciatis nemo repellat sunt ea.',
      price: 644,
      year: 1980,
      status: true,
      image: 'https://unsplash.it/g/200/?image=9',
    };

    beforeEach(() => {
      return Album.create({
        name: album.name,
        description: album.description,
        price: album.price,
        year: album.year,
        status: album.status,
        image: album.image,
      });
    });

    it('GET /api/users', () => {
      return request(app)
        .get('/api/albums')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].name).to.be.equal('Distributed');
        });
    });
  }); // end describe('/api/albums)
}); // end describe('Albums routes')
