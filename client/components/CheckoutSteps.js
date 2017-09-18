import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Header, Icon, Step } from 'semantic-ui-react';

class StepExampleGroups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const steps = this.steps;
    const pathname = this.props.location.pathname;
    return (
      <div>
        <Header>{pathname}</Header>
        <Step.Group>
          <Step active>
            <Icon name="payment" />
            <Step.Content title="Billing" description="Enter billing information" />
          </Step>
          <Step disabled icon="info" title="Confirm Order" />
        </Step.Group>
      </div>
    );
  }
}

export default withRouter(StepExampleGroups);
