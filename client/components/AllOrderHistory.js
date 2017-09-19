import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Breadcrumb, Grid } from 'semantic-ui-react';
import history from '../history';
import { withRouter, Link } from 'react-router-dom';
import { fetchAllOrders } from '../store/orders';

/**
 * COMPONENT
 */
class AllOrderHistory extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  componentDidMount() {
    this.props.fetchUserOrdersData();
  }

  render() {
    const { orders } = this.props;

    return (
      <Container>
        <h2>All Order History</h2>
        <Table striped>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Order Id</Table.HeaderCell>
              <Table.HeaderCell>Date</Table.HeaderCell>
              <Table.HeaderCell>Product details</Table.HeaderCell>
              <Table.HeaderCell>Total Price</Table.HeaderCell>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {orders.map((order) => (
              <Table.Row key={order.id}>
                <Table.Cell>{order.id}</Table.Cell>
                <Table.Cell>{order.date}</Table.Cell>
                <Table.Cell>
                  <Table>
                    <Table.Header>
                      <Table.Row>
                        <Table.HeaderCell>Name</Table.HeaderCell>
                        <Table.HeaderCell>Type</Table.HeaderCell>
                        <Table.HeaderCell>Status</Table.HeaderCell>
                        <Table.HeaderCell>Subtotal</Table.HeaderCell>
                      </Table.Row>
                    </Table.Header>
                    <Table.Body>
                      {order.albums &&
                        order.albums.map((album) => (
                          <Table.Row key={album.id}>
                            <Table.Cell>
                              <Link to={`/albums/${album.id}`}>{album.name}</Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link to={'/albums/page/1'}>Album</Link>
                            </Table.Cell>
                            <Table.Cell>{album.status ? 'Available' : 'Unavailable'}</Table.Cell>
                            <Table.Cell>{album.order_album_item.price}</Table.Cell>
                          </Table.Row>
                        ))}
                      {order.songs &&
                        order.songs.map((song) => (
                          <Table.Row key={song.id}>
                            <Table.Cell>
                              <Link to={`/songs/${song.id}`}>{song.name}</Link>
                            </Table.Cell>
                            <Table.Cell>
                              <Link to={'/songs/page/1'}>Song</Link>
                            </Table.Cell>
                            <Table.Cell>{song.status ? 'Available' : 'Unavailable'}</Table.Cell>
                            <Table.Cell>{song.order_song_item.price}</Table.Cell>
                          </Table.Row>
                        ))}
                    </Table.Body>
                  </Table>
                </Table.Cell>
                <Table.Cell>
                  {order.albums.reduce((sum, cur) => {
                    return sum + cur.order_album_item.price;
                  }, 0) +
                    order.songs.reduce((sum, cur) => {
                      return sum + cur.order_song_item.price;
                    }, 0)}
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
    email: state.user.email,
    userId: state.user.id,
    orders: state.orders,
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUserOrdersData: () => {
      dispatch(fetchAllOrders());
    },
  };
};

export default withRouter(connect(mapState, mapDispatch)(AllOrderHistory));

/**
 * PROP TYPES
 */
AllOrderHistory.propTypes = {
  email: PropTypes.string,
  orders: PropTypes.array,
};
