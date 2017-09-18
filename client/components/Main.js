import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Route } from 'react-router-dom';
import {
  Albums,
  Album,
  EditAlbum,
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
  UserHome,
} from '../components';
import { Container } from 'semantic-ui-react';

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const { isAdmin } = props;

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
    stickyCart: {
      margin: 0,
      top: 'auto',
      right: 20,
      bottom: 20,
      left: 'auto',
      position: 'fixed',
    },
  };

  // const cart = props.cart;
  // const itemsInCart = cart.songs.length + cart.albums.length;

  return (
    <div style={styles.body}>
      <Navbar />
      <Container style={styles.containerFull} fluid>
        <Route exact path="/" component={Landing} />
        <Route exact path="/albums/page/:pageNumber" component={Albums} />
        <Route exact path="/albums/:id" component={Album} />
        { isAdmin && <Route exact path="/albums/:id/edit" component={EditAlbum} /> }
        <Route exact path="/artists/page/:pageNumber" component={Artists} />
        <Route exact path="/artists/:id" component={Artist} />
        <Route exact path="/songs/page/:pageNumber" component={Songs} />
        <Route exact path="/categories/:id" component={Category} />
        <Route path="/search/results" component={SearchResults} />
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route path="/cart" component={Cart} />
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
    isAdmin: state.user.isAdmin || false,
  };
};

export default withRouter(connect(mapState)(Main));

/**
 * PROP TYPES
 */
Main.propTypes = {
  isAdmin: PropTypes.bool,
};
