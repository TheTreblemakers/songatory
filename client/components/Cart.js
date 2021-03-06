import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { CartAlbumItem, CartSongItem } from '../components';
import {
  removeSongFromUserCart,
  removeAlbumFromUserCart,
  removeAlbumFromGuestCart,
  removeSongFromGuestCart,
} from '../store';
import { Segment, Header, Container, Button, List, Table, Divider } from 'semantic-ui-react';
import history from '../history';

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  render() {
    const { cart, isLoggedIn, handleAlbumDelete, handleSongDelete } = this.props;
    const totalItems = cart.albums.length + cart.songs.length;
    //console.log(cart);
    //const cart = this.props.cart;
    return (
      <Container style={this.styles.container}>
        {totalItems === 0 ? (
          <Segment>
            <Header>Your cart is empty</Header>
          </Segment>
        ) : (
          <Header>Current Order</Header>
        )}
        {cart.albums.length > 0 ? (
          <div>
            <h3>Albums</h3>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Year</Table.HeaderCell>
                  <Table.HeaderCell>Artist</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cart.albums.map((album) => (
                  <CartAlbumItem
                    key={album.id}
                    album={album}
                    isLoggedIn={isLoggedIn}
                    handleAlbumDelete={handleAlbumDelete}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : null}
        <Divider hidden />
        {cart.songs.length > 0 ? (
          <div>
            <h3>Songs</h3>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Title</Table.HeaderCell>
                  <Table.HeaderCell>Album</Table.HeaderCell>
                  <Table.HeaderCell>Track #</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cart.songs.map((song) => (
                  <CartSongItem key={song.id} song={song} isLoggedIn={isLoggedIn} handleSongDelete={handleSongDelete} />
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : null}
        <Divider hidden />
        {totalItems > 0 ? (
          <Button as={Link} to="/cart/checkout/billing" floated="right">
            Checkout
          </Button>
        ) : (
          ''
        )}
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    cart: state.cart,
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAlbumDelete(albumId, isLoggedIn) {
      if (isLoggedIn) {
        dispatch(removeAlbumFromUserCart(albumId));
      } else {
        dispatch(removeAlbumFromGuestCart(albumId));
      }
    },
    handleSongDelete(songId, isLoggedIn) {
      if (isLoggedIn) {
        dispatch(removeSongFromUserCart(songId));
      } else {
        dispatch(removeSongFromGuestCart(songId));
      }
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Cart));
