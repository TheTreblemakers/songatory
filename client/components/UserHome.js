import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import history from '../history';
import { withRouter } from 'react-router-dom';
import { UserPanel } from '../components';
import { Container, Divider, Header } from 'semantic-ui-react';
/**
 * COMPONENT
 *  The UserHome component is our 'picture frame' - it displays the UserPanel and anything
 *  else common to our user's page. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const UserHome = (props) => {
  const { email } = props;
  const styles = {
    container: {
      padding: `2em`,
    },
    title: {
      fontSize: '2em',
      fontWeight: 'bold',
    },
  };

  return (
    <Container style={styles.container}>
      <Header style={styles.title}>Welcome, {email}</Header>
      <Divider hidden />
      <UserPanel />
    </Container>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    email: state.user.email,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(UserHome));

/**
 * PROP TYPES
 */
UserHome.propTypes = {};
