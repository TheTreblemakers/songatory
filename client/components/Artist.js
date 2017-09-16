import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Image, Button, Item, Container } from 'semantic-ui-react';
import { fetchArtist } from '../store';

class Artist extends Component {
  constructor(props) {
    super(props);
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  componentDidMount() {
    this.props.getArtist(this.props.match.params.id);
  }

  render() {
    const styles = this.styles;
    const artist = this.props.artist;
    return (
      <Container style={styles.container}>
        <div>Artist: {artist.name}</div>
      </Container>
    );
  }
}

const mapState = (state) => {
  return {
    artist: state.artists.currentArtist,
  };
};

const mapDispatch = (dispatch) => ({
  getArtist: (id) => {
    dispatch(fetchArtist(id));
  },
});

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default connect(mapState, mapDispatch)(Artist);
