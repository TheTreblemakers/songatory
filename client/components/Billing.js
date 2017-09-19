import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPayment } from '../store';
import { Dropdown, Segment, Header, Container, Button, List, Table, Divider } from 'semantic-ui-react';

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.paymentOptions = [ { text: 'Credit Card', value: 'credit-card' }, { text: 'Bitcoin', value: 'bitcoin' } ];
  }

  handleChange = (e, { value }) => this.props.setNewPayment(value);

  render() {
    return (
      <div>
        <Dropdown
          onChange={this.handleChange}
          placeholder="Payment Method"
          fluid
          selection
          value={this.props.selectedPayment}
          options={this.paymentOptions}
        />
        <Divider hidden />
        <Button as={Link} disabled={this.props.paymentMethod === ''} to="/cart/checkout/confirm" floated="right">
          Next
        </Button>
        <Button as={Link} to="/cart" floated="right">
          Back
        </Button>
      </div>
    );
  }
}

const mapState = (state) => {
  return { paymentMethod: state.cart.paymentMethod };
};

const mapDispatch = (dispatch) => {
  return {
    setNewPayment: (option) => dispatch(setPayment(option)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Billing));
