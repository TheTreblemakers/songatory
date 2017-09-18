import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link, Route, Switch } from 'react-router-dom';
import {
  Albums,
  Album,
  Artists,
  Artist,
  Category,
  Navbar,
  Footer,
  Songs,
  Landing,
  Login,
  Signup,
  SearchResults,
  Cart,
} from '../components';
import { Button, Icon, Container, Grid } from 'semantic-ui-react';
import { fetchUserCart, fetchGuestCart } from '../store';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.styles = {
      body: {
        display: 'flex',
        minHeight: '100vh',
        flexDirection: 'column',
      },
      containerFull: {
        marginTop: '4em',
        flex: '1',
      },
      stickyCart: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed',
      },
    };
  }

  // const cart = props.cart;
  // const itemsInCart = cart.songs.length + cart.albums.length;

  render() {
    const styles = this.styles;
    return (
      <div style={styles.body}>
        <Navbar />
        <Container style={styles.containerFull} fluid>
          <Route exact path="/" component={Landing} />
          <Route exact path="/albums/page/:pageNumber" component={Albums} />
          <Route exact path="/albums/:id" component={Album} />
          <Route exact path="/artists/page/:pageNumber" component={Artists} />
          <Route exact path="/artists/:id" component={Artist} />
          <Route exact path="/songs/page/:pageNumber" component={Songs} />
          <Route exact path="/categories/:id" component={Category} />
          <Route path="/search/results" component={SearchResults} />
          <Route path="/login" component={Login} />
          <Route path="/signup" component={Signup} />
          <Route path="/cart" component={Cart} />
        </Container>
        <Footer />
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
