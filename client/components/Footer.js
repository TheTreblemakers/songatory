import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Container, List, Segment } from 'semantic-ui-react';
import history from '../history';

const Footer = (props) => {
  return (
    <Segment inverted vertical>
      <Container textAlign="center">
        <List horizontal inverted divided link>
          <List.Item as="a" href="#">
            Contact Us
          </List.Item>
          <List.Item as="a" href="#">
            Terms and Conditions
          </List.Item>
          <List.Item as="a" href="#">
            Privacy Policy
          </List.Item>
        </List>
      </Container>
    </Segment>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

export default withRouter(connect(mapState, mapDispatch)(Footer));
