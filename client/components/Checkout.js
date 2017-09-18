import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CartAlbumItem from './CartAlbumItem';
import CartSongItem from './CartSongItem';
import { removeSongFromUserCart, fetchUserCart, fetchGuestCart, removeAlbumFromUserCart } from '../store';
import { Divider, Segment, Header, Container, Button, List, Table } from 'semantic-ui-react';
import history from '../history';

class Checkout extends Component {
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
    const { cart } = this.props;
    const totalItems = cart.albums.length + cart.songs.length;
    return (
      <Container style={this.styles.container}>
        <Header>Confirm Your Order</Header>
        {cart.albums.length > 0 ? (
          <div>
            <h3>Albums</h3>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell />
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Artist</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cart.albums.map((album) => (
                  <CartAlbumItem
                    isCheckout
                    key={album.id}
                    album={album}
                    handleAlbumDelete={this.props.handleAlbumDelete}
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
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Album Name</Table.HeaderCell>
                  <Table.HeaderCell>Track Number</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                  <Table.HeaderCell />
                </Table.Row>
              </Table.Header>
              <Table.Body>
                {cart.songs.map((song) => (
                  <CartSongItem isCheckout key={song.id} song={song} handleSongDelete={this.props.handleSongDelete} />
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : null}
        <Divider />
        <Button floated="right">Next</Button>
        <Button as={Link} to={'/cart'} floated="right">
          Change My Order
        </Button>
      </Container>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  //console.log(state);
  return {
    cart: state.cart,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    loadUserCart() {
      dispatch(fetchUserCart());
    },
    loadGuestCart() {
      dispatch(fetchGuestCart());
    },
    handleAlbumDelete(id) {
      dispatch(removeAlbumFromUserCart(id));
    },
    handleSongDelete(id) {
      dispatch(removeSongFromUserCart(id));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Checkout));
