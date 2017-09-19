import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Divider, Container, Icon, Table, Breadcrumb, Button } from 'semantic-ui-react';
import { addSongToUserCart, addSongToGuestCart } from '../store';
import history from '../history';
import { fetchSongs } from '../store/songs';

class Songs extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  // componentDidMount() {
  //   this.props.fetchSongsData();
  // }

  render() {
    const { songs, isLoggedIn } = this.props;
    const currentPage = this.props.match.params.pageNumber;
    const songsPerPage = 50;
    const start = (currentPage - 1) * songsPerPage;
    const end = start + songsPerPage;
    const pageSongs = songs.slice(start, end);
    const styles = this.styles;
    const numberOfPages = Math.ceil(songs.length / songsPerPage);
    const pageList = new Array(numberOfPages);
    for (let i = 0; i < pageList.length; i++) pageList[i] = i + 1;

    return (
      <Container style={this.styles.container}>
        <h2>All Songs</h2>
        <Breadcrumb size="small">
          {pageList.map((pageNumber) => {
            const pageUrl = `/songs/page/${pageNumber}`;
            if (pageNumber === numberOfPages) {
              return (
                <Breadcrumb.Section link key={pageNumber} as={Link} to={pageUrl} active={currentPage === pageNumber}>
                  {pageNumber}
                </Breadcrumb.Section>
              );
            }
            return (
              <span key={pageNumber}>
                <Breadcrumb.Section link as={Link} to={pageUrl} active={currentPage === pageNumber}>
                  {pageNumber}
                </Breadcrumb.Section>
                <Breadcrumb.Divider icon="right angle" />
              </span>
            );
          })}
        </Breadcrumb>
        <Divider />
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Name</Table.HeaderCell>
              <Table.HeaderCell>Artist</Table.HeaderCell>
              <Table.HeaderCell>Album</Table.HeaderCell>
              <Table.HeaderCell>Price</Table.HeaderCell>
              <Table.HeaderCell />
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {pageSongs.map((song) => (
              <Table.Row key={song.id}>
                <Table.Cell> {song.name}</Table.Cell>
                <Table.Cell> {song.album.artist.name}</Table.Cell>
                <Table.Cell>{song.album.name}</Table.Cell>
                <Table.Cell>$ {song.displayPrice}</Table.Cell>
                <Table.Cell>
                  <Button
                    animated="vertical"
                    onClick={() => {
                      this.props.handleAddToCart(song.id, isLoggedIn);
                    }}>
                    <Button.Content hidden>Buy</Button.Content>
                    <Button.Content visible>
                      <Icon name="add to cart" />
                    </Button.Content>
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    songs: state.songs,
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAddToCart(songId, isLoggedIn) {
      if (isLoggedIn) {
        dispatch(addSongToUserCart({ id: songId }));
      } else {
        dispatch(addSongToGuestCart({ id: songId }));
      }
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Songs));

/**
 * PROP TYPES
 */
Songs.propTypes = {
  songs: PropTypes.array,
};
