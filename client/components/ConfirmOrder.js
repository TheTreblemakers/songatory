import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateUserCart, updateGuestCart } from '../store';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { CartAlbumItem, CartSongItem } from '../components';
import { Divider, Segment, Header, Container, Button, List, Table } from 'semantic-ui-react';

class ConfirmOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const cart = this.props.cart;
    const user = this.props.user;
    const email = 'test-email@test.com';
    return (
      <div>
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
                  <CartSongItem isCheckout key={song.id} song={song} handleSongDelete={this.props.handleSongDelete} />
                ))}
              </Table.Body>
            </Table>
          </div>
        ) : null}
        <Divider />
        <Button
          as={Link}
          onClick={() => this.props.completeOrder(cart, user, email)}
          to={'/cart/checkout/complete'}
          floated="right">
          Confirm My Order
        </Button>
        <Button as={Link} floated="right" to={'/cart/checkout/billing'}>
          Back
        </Button>
      </div>
    );
  }
}

const mapState = (state) => {
  //console.log(state);
  return {
    cart: state.cart,
    user: state.user,
  };
};

const mapDispatch = (dispatch) => {
  return {
    completeOrder: (cart, user, email) => {
      cart.fulfilled = true;
      cart.email = email;
      if (user.id) {
        dispatch(updateUserCart(cart));
      } else {
        dispatch(updateGuestCart(cart));
      }
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(ConfirmOrder));
