import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Albums, Artists, Navbar, Footer, Songs, Landing, Login, Signup, UserHome } from '../components';
import { Container, Grid } from 'semantic-ui-react';
import { logout } from '../store';
import { Route, Switch } from 'react-router-dom';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { children, handleClick, isLoggedIn } = props;

  const styles = {
    body: {
      display: 'flex',
      minHeight: '100vh',
      flexDirection: 'column',
    },
    containerFull: {
      marginTop: '4em',
      flex: '1',
    },
  };

  return (
    <div style={styles.body}>
      <Navbar />
      <Container style={styles.containerFull} fluid>
        <Route exact path="/" component={Landing} />
        <Route path="/albums" component={Albums} />
        <Route path="/artists" component={Artists} />
        <Route path="/songs" component={Songs} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/home" component={UserHome} />
      </Container>
      <Footer />
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleClick() {
      dispatch(logout());
    },
  };
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
};
