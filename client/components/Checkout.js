import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import { CheckoutSteps, Billing, ConfirmOrder } from '../components';
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
    const pathname = this.props.location.pathname;
    return (
      <Container style={this.styles.container}>
        <Header>{pathname}</Header>
        <CheckoutSteps />
        <Route exact path="/cart/checkout/billing" component={Billing} />
        <Route exact path="/cart/checkout/confirm" component={ConfirmOrder} />
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
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Checkout));
