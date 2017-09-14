import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, Table, Breadcrumb } from 'semantic-ui-react';
import history from '../history';
import { fetchSongs } from '../store/songs';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  componentDidMount() {
    this.props.fetchSongsData();
  }

  render() {
    const { songs } = this.props;

    return (
      <Container style={this.styles.container}>
        <h2>All Songs</h2>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Album</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {
              songs.map(song => (
                <Table.Row key={song.id}>
                  <Table.Cell> {song.name}</Table.Cell>
                  <Table.Cell> {song.artist.name}</Table.Cell>
                  <Table.Cell>{song.album.name}</Table.Cell>
                  <Table.Cell>{song.price}</Table.Cell>
                </Table.Row>
              ))
            }
          </Table.Body>

        </Table>
        <Breadcrumb>
          <Breadcrumb.Section active>1</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>2</Breadcrumb.Section>
          <Breadcrumb.Divider />
          <Breadcrumb.Section link>3</Breadcrumb.Section>
        </Breadcrumb>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    songs: state.songs
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchSongsData: () => {
      dispatch(fetchSongs());
    }
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Songs));

/**
 * PROP TYPES
 */
Songs.propTypes = {
  songs: PropTypes.array
};
