import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CartAlbumItem from './CartAlbumItem';
import CartSongItem from './CartSongItem';
import { removeAlbumFromCart, removeSongFromCart } from '../store';
import { Segment, Header, Container, Button, List, Table } from 'semantic-ui-react';
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
    const { cart } = this.props;
    const totalItems = cart.albums.length + cart.songs.length;
    //console.log(cart);

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
            <List divided verticalAlign="middle">
              {cart.albums.map((album) => (
                <CartAlbumItem key={album.id} album={album} handleAlbumDelete={this.props.handleAlbumDelete} />
              ))}
            </List>
          </div>
        ) : null}
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
                  <CartSongItem key={song.id} song={song} handleSongDelete={this.props.handleSongDelete} />
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : null}
        <Button floated="right">Checkout</Button>
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
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleAlbumDelete(e) {
      const albumId = +e.target.value;
      dispatch(removeAlbumFromCart(albumId));
    },
    handleSongDelete(e) {
      const songId = +e.target.value;
      dispatch(removeSongFromCart(songId));
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Cart));
