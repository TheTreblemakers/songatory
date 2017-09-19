import React, { Component } from 'react';
import { withRouter, Link } from 'react-router-dom';
import { Header, Icon, Step } from 'semantic-ui-react';

class StepExampleGroups extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const pathname = this.props.location.pathname.split('/');
    const page = pathname[pathname.length - 1];
    console.log(page);

    return (
      <div>
        <Step.Group>
          <Step as={Link} to={'/cart/checkout/billing'} active={'billing' === page}>
            <Icon name="payment" />
            <Step.Content title="Billing" description="Enter billing information" />
          </Step>
          <Step as={Link} to={'/cart/checkout/confirm'} active={'confirm' === page}>
            <Icon name="info" />
            <Step.Content title="Confirm Your Order" />
          </Step>
          <Step completed={'complete' === page} active={'complete' === page}>
            <Icon name="checkmark" />
            <Step.Content title="Complete" />
          </Step>
        </Step.Group>
      </div>
    );
  }
}

export default withRouter(StepExampleGroups);
