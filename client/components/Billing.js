import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { setPayment, setEmail } from '../store';
import {
  Message,
  Input,
  Form,
  Dropdown,
  Segment,
  Header,
  Container,
  Button,
  List,
  Table,
  Divider,
} from 'semantic-ui-react';
import history from '../history';

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailError: false,
      paymentError: false,
    };
    this.paymentOptions = [
      { icon: 'credit card', text: 'Credit Card', value: 'credit-card' },
      { icon: 'bitcoin', text: 'Bitcoin', value: 'bitcoin' },
      { icon: 'paypal', text: 'Paypal', value: 'paypal' },
    ];
  }

  paymentChange = (e, { value }) => {
    this.setState({ paymentError: false }, () => {
      this.props.setNewPayment(value);
    });
  };
  emailChange = (e, { value }) => {
    this.setState({ emailError: false }, () => {
      this.props.setNewEmail(value);
    });
  };

  handleSubmit = () => {
    // validate inputs
    const orderEmail = this.props.orderEmail;
    const paymentMethod = this.props.paymentMethod;
    if (orderEmail === '') {
      this.setState({ emailError: true });
    }
    if (paymentMethod === '') {
      this.setState({ paymentError: true });
    } else {
      history.push('/cart/checkout/confirm');
    }
  };

  render() {
    const user = this.props.user;
    const emailError = this.state.emailError;
    const paymentError = this.state.paymentError;
    const email = user.id ? user.email : 'Enter your email';
    return (
      <div>
        <Form>
          <Form.Group widths="equal">
            <Form.Input
              error={emailError}
              onChange={this.emailChange}
              value={this.props.orderEmail}
              required
              label="Email"
              placeholder={emailError ? 'Please enter a valid email' : email}
            />
            <Form.Select
              label="Payment"
              onChange={this.paymentChange}
              error={paymentError}
              required
              options={this.paymentOptions}
              value={this.props.selectedPayment}
              placeholder={paymentError ? 'Please enter a valid payment option' : 'Payment'}
            />
          </Form.Group>
          <Form.Checkbox label="I agree to the Terms and Conditions" />
        </Form>
        <Divider hidden />
        <Button onClick={this.handleSubmit} floated="right">
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
  return {
    user: state.user,
    orderEmail: state.cart.email,
    paymentMethod: state.cart.paymentMethod,
  };
};

const mapDispatch = (dispatch) => {
  return {
    setNewPayment: (option) => dispatch(setPayment(option)),
    setNewEmail: (email) => dispatch(setEmail(email)),
  };
};

export default withRouter(connect(mapState, mapDispatch)(Billing));
