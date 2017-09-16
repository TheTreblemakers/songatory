import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Table, Breadcrumb } from 'semantic-ui-react';
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
                    {/* <Table.Cell> order name</Table.Cell> */}
                    <Table.Cell> {order.id}</Table.Cell>
                    <Table.Cell> {order.date}</Table.Cell>
                    <Table.Cell>
                      <Table >
                        <Table.Header>
                          <Table.Row>
                            <Table.HeaderCell>Product Name</Table.HeaderCell>
                            <Table.HeaderCell>Type</Table.HeaderCell>                               <Table.HeaderCell>Status</Table.HeaderCell>
                            <Table.HeaderCell>Price</Table.HeaderCell>
                          </Table.Row>
                        </Table.Header>
                        {/* <Table.Body>
                          {orders.products.map(product => (
                            <Table.Row key={product.id}>
                              <Table.Cell> {product.name}</Table.Cell>
                              <Table.Cell> {product.type}</Table.Cell>
                              <Table.Cell> {product.status}</Table.Cell>
                              <Table.Cell> {product.price}</Table.Cell>
                            </Table.Row>
                          ))} */}
                        <Table.Body>
                            <Table.Row key="test">
                              <Table.Cell>test</Table.Cell>
                              <Table.Cell>test</Table.Cell>
                              <Table.Cell>test</Table.Cell>
                              <Table.Cell>test</Table.Cell>
                            </Table.Row>
                            <Table.Row key="test2">
                              <Table.Cell>test2</Table.Cell>
                              <Table.Cell>test2</Table.Cell>
                              <Table.Cell>test2</Table.Cell>
                              <Table.Cell>test2</Table.Cell>
                            </Table.Row>
                        </Table.Body>
                      </Table>
                    </Table.Cell>
                    {/* <Table.Cell>order.status</Table.Cell> */}
                    {/* <Table.Cell>order.price</Table.Cell> */}
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
  console.log('userhome state: ', state);
  return {
    email: state.user.email,
    userId: state.user.id,
    orders: [{ id: 1234321, date: '12/21/2014', products: [{ productName: 'Bye Bye Bye', type: 'Song', status: 'Available', price: '$1.21' }, { productName: 'Bye Bye Bye', type: 'Album', status: 'Available', price: '$31.21' }, { productName: 'Genie in a bottle', type: 'Song', status: 'Available', price: '$1.24' }] }, { id: 1234322, date: '12/24/2014', products: [{ productName: 'Bye Bye Bye', type: 'Song', status: 'Available', price: '$1.21' }, { productName: 'Livin la vida loca', type: 'Song', status: 'Available', price: '$1.28' }] }]
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
