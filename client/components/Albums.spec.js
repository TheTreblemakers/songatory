import {expect} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import Albums from './Albums';
import Album from './Album';

describe('Albums', () => {
  let albums;
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

  beforeEach(() => {
    albums= shallow(<Albums albums={fakeAlbums} />);
  });

  xit('passes its own albums prop to <Album />', () => {
      expect(albums.find(Album).props().albums).to.be.deep.equal(fakeAlbums);
   });

});
