import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import CartAlbumItem from './CartAlbumItem';
import CartSongItem from './CartSongItem';
import { removeAlbumFromUserCart, removeSongFromUserCart, fetchUserCart, fetchGuestCart } from '../store';
import { Container, Button, List, Table } from 'semantic-ui-react';
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

  //  componentWillReceiveProps(nextProps) {
  //    const currentUser = nextProps.user;
  //    console.log('current user', currentUser);
  //    if (currentUser.id){
  //      this.props.loadUserCart();
  //    }
  //    else {
  //      this.props.loadGuestCart();
  //    }
  // }


  render() {
    //const cart = this.props.cart;
    return (
      <Container style={this.styles.container}>
        <h2>Cart</h2>
        {
          cart.albums
          && <div>
              <h3>Albums</h3>
              <List divided verticalAlign='middle'>
              {
                cart.albums.map(album => <CartAlbumItem key={album.id} album={album} handleAlbumDelete={this.props.handleAlbumDelete} />
                )
              }
            </List>
          </div>
        }
        {
          cart.songs
          && <div>
            <h3>Songs</h3>
            <Table striped>
              <Table.Header>
                <Table.Row>
                  <Table.HeaderCell>Name</Table.HeaderCell>
                  <Table.HeaderCell>Album Name</Table.HeaderCell>
                  <Table.HeaderCell>Track Number</Table.HeaderCell>
                  <Table.HeaderCell>Price</Table.HeaderCell>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {
                  cart.songs.map(song => <CartSongItem key ={song.id} song={song} handleSongDelete={this.props.handleSongDelete} />)
                }
              </Table.Body>
            </Table>
          </div>
        }
        <Button floated='right'>
          Buy Order
        </Button>
        <Button floated='right'>
          Edit Cart
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
    user: state.user
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
    handleAlbumDelete(e) {
      const albumId = +e.target.value;
      dispatch(removeAlbumFromUserCart(albumId));
    },
    handleSongDelete(e) {
      const songId = +e.target.value;
      dispatch(removeSongFromUserCart(songId));
    }
  };
 };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Cart));
