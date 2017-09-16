import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-router';
import PropTypes from 'prop-types';
import history from './history';
import { Main } from './components';
import { me, fetchAlbums, fetchArtists } from './store';

/**
 * COMPONENT
 */
class App extends Component {
  componentDidMount() {
    this.props.loadInitialData();
  }

  render() {
    return (
      <Router history={history}>
        <Main />
      </Router>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = {};

const mapDispatch = (dispatch) => {
  return {
    loadInitialData() {
      dispatch(me());
      dispatch(fetchAlbums());
      dispatch(fetchArtists());
    },
  };
};

export default connect(mapState, mapDispatch)(App);

/**
 * PROP TYPES
 */
App.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
};
