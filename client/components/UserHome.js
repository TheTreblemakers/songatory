import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import { withRouter } from 'react-router-dom';
import {
  UserPanel,
} from '../components';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const UserHome = (props) => {
  const { email } = props;

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <UserPanel />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email
  };
};

const mapDispatch = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mapState, mapDispatch)(UserHome));

/**
 * PROP TYPES
 */
UserHome.propTypes = {

};
