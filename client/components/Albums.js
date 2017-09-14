import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import history from '../history';

class Albums extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return <div>All albums here!</div>;
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {}
};

const mapDispatch = (dispatch) => {
  return {}
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Albums));
