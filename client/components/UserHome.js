import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Breadcrumb, Grid } from 'semantic-ui-react';
import history from '../history';
import { fetchUserOrders } from '../store/orders';

/**
 * COMPONENT
 */
class UserHome extends Component {
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
    this.props.fetchUserOrdersData();
  }

  render() {
    const { email, orders } = this.props;
    console.log('HEYYYYYY orders:  ', orders);

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <Container >
          <h2>Your Recent Order History</h2>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Order Id</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Product details</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                orders.map(order => (
                  <Table.Row key={order.id}>
                    <Table.Cell>{order.id}</Table.Cell>
                    <Table.Cell>{order.date}</Table.Cell>
                    <Table.Cell>
                      <Table>
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>                               <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        <Table.Body>
                          {order.albums &&
                            order.albums.map(album => (
                              <Table.Row key={album.id}>
                                <Table.Cell>{album.name}</Table.Cell>
                                <Table.Cell>Album</Table.Cell>
                                <Table.Cell>{album.status ? 'Available' : 'Unavailable'}</Table.Cell>
                                <Table.Cell>{album.order_album_item.price}</Table.Cell>
                              </Table.Row>
                            ))
                          }
                          {order.songs &&
                            order.songs.map(song => (
                              <Table.Row key={song.id}>
                                <Table.Cell>{song.name}</Table.Cell>
                                <Table.Cell>Song</Table.Cell>
                                <Table.Cell>{song.status ? 'Available' : 'Unavailable'}</Table.Cell>
                                <Table.Cell>{song.order_song_item.price}</Table.Cell>
                              </Table.Row>
                            ))
                          }
                        </Table.Body>
                      </Table>
                    </Table.Cell>
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
      </div>
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
    orders: state.orders
  };
};

const mapDispatch = (dispatch) => {
  return {
    fetchUserOrdersData: () => {
      dispatch(fetchUserOrders());
    }
  };
};

export default connect(mapState, mapDispatch)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string,
  orders: PropTypes.array,
};
