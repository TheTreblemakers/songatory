/* global describe beforeEach it */

const { expect } = require('chai');
const db = require('../index');
const User = db.model('user');
const Order = db.model('order');
const Album = db.model('album');
const OrderAlbumItem = db.model('order_album_item');

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

  describe('hooks', () => {
    let order, album;
    beforeEach(() => {
      return Order.create({ fulfilled: false })
        .then(newOrder => {
          order = newOrder;
          return Album.create({ price: 100 });
        })
        .then(newAlbum => {
          album = newAlbum;
          return order.addAlbum(album);
        });
    });

    it('should not set price before update', () => {
        return OrderAlbumItem.findOne({ where: { orderId: order.id, albumId: album.id } })
        .then(item => {
          expect(item.price).to.equal(null);
        });
    });

    it('should set a fixed price for associations when order becomes fulfilled', () => {
      return order.update({ paymentMethod: 'paypal', fulfilled: true })
        .then(() => album.update({ price: 200 }))
        .then(() => OrderAlbumItem.findOne({ where: { orderId: order.id, albumId: album.id } }))
        .then(item => {
          expect(item.price).to.equal(100);
        });
    });
  }); // end describe('hooks')
}); // end describe('Order model')
