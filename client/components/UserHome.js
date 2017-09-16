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
    console.log(this.props);

    return (
      <div>
        <h3>Welcome, {email}</h3>
        <Container >
          <h2>Your Orders History</h2>
          <Table striped>
            <Table.Header>
              <Table.Row>
                <Table.HeaderCell>Product Name</Table.HeaderCell>
                <Table.HeaderCell>Type</Table.HeaderCell>
                <Table.HeaderCell>Date</Table.HeaderCell>
                <Table.HeaderCell>Status</Table.HeaderCell>
                <Table.HeaderCell>Price</Table.HeaderCell>
              </Table.Row>
            </Table.Header>

            <Table.Body>
              {
                orders.map(order => (
                  <Table.Row key={order.id}>
                     <Table.Cell> order name</Table.Cell> 
                    <Table.Cell> {order.date}</Table.Cell>
                     <Table.Cell>order.status</Table.Cell> 
                     <Table.Cell>order.price</Table.Cell> 
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
    orders: []
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
  email: PropTypes.string
};
