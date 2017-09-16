/* global describe beforeEach afterEach it */

import {expect} from 'chai';
import {fetchCart} from './cart';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Cart Reducer Test', () => {
   const fakeCart = [
        {
            displayPrice: 12.34,
            id: 1,
            name: "Illinois",
            description: "great album much wow 5 stars",
            price: 1234,
            year: 1997,
            image: "http://www.chronicle.com/blogs/buildings/files/2011/09/Perdue-Hall.jpg",
            createdAt: "2017-09-14T15:52:35.079Z",
            updatedAt: "2017-09-14T15:52:35.079Z"
        },
        {
            displayPrice: 12.34,
            id: 2,
            name: "Florida",
            description: "great album much wow 5 stars",
            price: 1234,
            year: 1997,
            image: "https://www.e-architect.co.uk/images/jpgs/new_york/brooklyn_college_westquad_vinoly0107.jpg",
            createdAt: "2017-09-14T15:52:35.079Z",
            updatedAt: "2017-09-14T15:52:35.079Z"
        },
        {
            displayPrice: 12.34,
            id: 3,
            name: "California",
            description: "great album much wow 5 stars",
            price: 1234,
            year: 1997,
            image: "https://www.stchas.edu/images/buildings/ssb-bldg-940.jpg",
            createdAt: "2017-09-14T15:52:35.079Z",
            updatedAt: "2017-09-14T15:52:35.079Z"
        }
    ];

describe('thunk creators', () => {
  let store;

  const initialState = {cart: []};

  beforeEach(() => {
    store = mockStore(initialState);
  });

  afterEach(() => {
    store.clearActions();
  });

  describe('fetchCart', () => {
    xit('eventually dispatches the GET CART action', () => {
      mockAxios.onGet('/api/orders/cart').replyOnce(200, fakeCart);
      return store.dispatch(fetchCart())
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.be.equal('GET_CART');
          expect(actions[0].user).to.be.deep.equal(fakeCart);
        });
    });
  });
});

    describe('action creators', () => {

        describe('getCart', () => {
            xit('returns expected action description', () => {
                const actionDescriptor = getCart(fakeCart);
                expect(actionDescriptor).to.be.deep.equal({
                    type: 'GET_CART',
                    order: fakeCart
                });
            });
        });
    });
});
