/* global describe beforeEach it */

import {expect} from 'chai';
import React from 'react';
import {shallow} from 'enzyme';
import {UserHome} from './UserHome';

describe('UserHome', () => {
  let userHome;

  beforeEach(() => {
    userHome = shallow(<UserHome email={'cody@email.com'} />);
  });

  it('renders the email in an Header semantic-react-ui tag', () => {
    expect(userHome.find('Header').text()).to.be.equal('Welcome, cody@email.com');
  });
});
