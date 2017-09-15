/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');
const Order = db.model('order');

describe('Order model', () => {
  beforeEach(() => {
    return db.sync({force: true});
  });

  describe('validations', () => {
    let user;
    beforeEach(() => {
      return User.create({ email: 'test@test.com'})
        .then(newUser => {
          user = newUser;
          return Order.create({ userId: user.id, fulfilled: false });
        });
    });

    it('should disallow adding a new order when a User has another one that is unfulfilled', () => {
      return Order.build({ userId: user.id, fulfilled: false }).validate()
        .then(() => {
          throw new Error('validation should fail when user already has a cart');
        }, err => {
          expect(err).to.be.an('error');
        });
    });
  }); // end describe('validations')
}); // end describe('user model')
