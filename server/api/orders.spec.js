/* global describe beforeEach it */

const {expect} = require('chai');
const request = require('supertest');
const db = require('../db');
const app = require('../index');
const Order = db.model('order');

xdescribe('Order routes', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('/api/orders/', () => {
    const today = new Date();

    beforeEach(() => {
      return Order.create({
        date: today,
        session: 'erwf98uw92',
        fulfilled: false,
        paymentMethod: 'credit card'
      });
    });

    it('GET /api/orders', () => {
      return request(app)
        .get('/api/orders')
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('array');
          expect(res.body[0].date).to.be.equal(today);
        });
    });
  }); // end describe('/api/orders')
}); // end describe('Order routes')
