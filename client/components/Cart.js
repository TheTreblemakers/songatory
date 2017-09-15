import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import CartItem from './CartItem';
import { Container, Button, List } from 'semantic-ui-react';
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
        <List divided verticalAlign='middle'>
          {
            fakeCart.map(item => {
              return <CartItem key={item.id} item={item} />;
            })
          }
        </List>
        <Button floated='right'>
          Buy Order
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
export default withRouter(connect(null, null)(Cart));

/**
 * PROP TYPES
 */
Cart.propTypes = {
  cart: PropTypes.array.isRequired
};
