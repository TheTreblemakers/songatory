import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CartAlbumItem from './CartAlbumItem';
import CartSongItem from './CartSongItem';
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

  render() {
    const { cart } = this.props;
    //console.log(cart);

    return (
      <Container style={this.styles.container}>
        <h2>Cart</h2>
        {
          cart.albums
          ? <div>
              <h3>Albums</h3>
              <List divided verticalAlign='middle'>
              {
                cart.albums.map(album => <CartAlbumItem  key={album.id} album={album} />)
              }
            </List>
          </div>
        : null
        }
        {
          cart.songs
          ?<div>
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
                  cart.songs.map(song => <CartSongItem key={song.id} song={song} />)
                }
              </Table.Body>
            </Table>
          </div>
          : null
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
  return {
    cart: state.cart
  };
};

const mapDispatch = (dispatch) => { };

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, null)(Cart));
