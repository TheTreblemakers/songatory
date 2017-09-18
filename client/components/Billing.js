import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Segment, Header, Container, Button, List, Table, Divider } from 'semantic-ui-react';

class Billing extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div>
        Billing, yo. Gimme dat green
        <Button as={Link} to="/cart/checkout/confirm" floated="right">
          Next
        </Button>
      </div>
    );
  }
}

export default Billing;
