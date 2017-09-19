import { expect } from 'chai';
import { getUserOrders, fetchUserOrders } from './orders';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Orders Reducer Test', () => {
  const date1 = new Date(2017, 8, 14);
  const date2 = new Date(2017, 8, 15);
  const date3 = new Date(2017, 8, 16);
  const fakeOrders = [
    {
      date: date1,
      session: 'aaw98wefwefw9ef',
      fulfilled: true,
      paymentMethod: 'credit card',
      createdAt: '2017-09-14T15:52:35.079Z',
      updatedAt: '2017-09-14T15:52:35.079Z',
      userId: 2
    },
    {
      date: date2,
      session: 'fwef2rfe444w9ef',
      fulfilled: false,
      paymentMethod: 'credit card',
      createdAt: '2017-09-15T15:52:35.079Z',
      updatedAt: '2017-09-15T15:52:35.079Z',
      userId: 3
    },
    {
      date: date3,
      session: 'erf4tyh5456yh',
      fulfilled: true,
      paymentMethod: 'paypal',
      createdAt: '2017-09-16T15:52:35.079Z',
      updatedAt: '2017-09-16T15:52:35.079Z',
      userId: 1
    }
  ];

  describe('thunk creators', () => {
    let store;
    const initialState = { orders: [] };

    beforeEach(() => {
      mockAxios.reset();
      store = mockStore(initialState);
    });

    afterEach(() => {
      store.clearActions();
    });

    describe('fetchUserOrders', () => {
      it('dispatches the GET_USERORDERS action', () => {
        mockAxios.onGet('/api/orders').reply(200, fakeOrders);
        return store.dispatch(fetchUserOrders())
          .then(() => {
            const actions = store.getActions();
            expect(actions[0]).toEqual(getUserOrders());
            console.log(actions);
            expect(actions[0].type).to.equal('GET_USERORDERS');
            expect(actions[0].orders).to.deep.equal(fakeOrders);
          });
      });
    });
  });

  describe('action creators', () => {

    describe('getUserOrders', () => {
      it('returns expected action description', () => {
        const actionDescriptor = getUserOrders(fakeOrders);
        expect(actionDescriptor).to.deep.equal({
          type: 'GET_USERORDERS',
          orders: fakeOrders
        });
      });
    });
  });
});
