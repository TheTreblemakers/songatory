import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Segment } from 'semantic-ui-react';

class CompleteOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const user = this.props.user;
    const email = user.id ? this.props.cart.email : '';
    return (
      <div>
        <Segment textAlign="center">
          You're all set!
          <strong>{email}</strong>
        </Segment>
      </div>
    );
  }
}

const mapState = (state) => {
  return {
    cart: state.cart,
    user: state.user,
  };
};

export default connect(mapState, null)(CompleteOrder);
