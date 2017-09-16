import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button, Item, Container } from 'semantic-ui-react';
import { fetchAlbum } from '../store';

class Album extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  componentDidMount() {
    this.props.getAlbum(this.props.match.params.id);
  }

  render() {
    const styles = this.styles;
    const album = this.props.album;
    return (
      <Container style={styles.container}>
        <div>Album: {album.name}</div>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    album: state.albums.currentAlbum,
  };
};

const mapDispatch = (dispatch) => ({
  getAlbum: (id) => {
    dispatch(fetchAlbum(id));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Album);
