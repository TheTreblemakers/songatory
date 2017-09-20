import {expect} from 'chai';
import {fetchAlbums, getAlbums} from './albums';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';
import history from '../history';

const mockAxios = new MockAdapter(axios);
const middlewares = [thunkMiddleware];
const mockStore = configureMockStore(middlewares);

describe('Albums Reducer Test', () => {
   const fakeAlbums = [
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
    const initialState = {albums: []};

    beforeEach(() => {
        store = mockStore(initialState);
    });

    afterEach(() => {
        store.clearActions();
    });

    describe('fetchAlbums', () => {
            xit('dispatches the GET ALBUMS action', () => {
            mockAxios.onGet('/api/albums').reply(200, fakeAlbums);
            return store.dispatch(fetchAlbums())
                .then(() => {
                const actions = store.getActions();
                //expect(actions[0]).toEqual(getAlbums());
                console.log(actions);
                expect(actions[0].type).to.be.equal('GET_ALBUMS');
                //expect(actions[0].albums).to.be.deep.equal(fakeAlbums);
                });
            });
        });
    });

    describe('action creators', () => {

        describe('getAlbums', () => {
            it('returns expected action description', () => {
                const actionDescriptor = getAlbums(fakeAlbums);
                expect(actionDescriptor).to.be.deep.equal({
                    type: 'GET_ALBUMS',
                    albums: fakeAlbums
                });
            });
        });
    });
});
