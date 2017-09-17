import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Input, Icon, Dropdown } from 'semantic-ui-react';
import { logout } from '../store';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.searchOptions = [
      { key: 'Artists', text: 'Artists', value: 'artists' },
      { key: 'Albums', text: 'Albums', value: 'albums' },
      { key: 'Songs', text: 'Songs', value: 'songs' },
    ];
    this.links = [
      { url: '/', name: 'Home' },
      { url: '/artists/page/1', name: 'Artists' },
      { url: '/albums/page/1', name: 'Albums' },
      { url: '/songs/page/1', name: 'Songs' },
    ];
    this.styles = {
      navbar: {
        minHeight: `4em`,
      },
      search: {
        width: `400px`,
      },
      title: {
        fontSize: '1.2em',
        fontFamily: 'Oleo Script',
      },
    };
  }

  render() {
    const { isLoggedIn, handleLogout } = this.props;

    return (
      <Menu inverted pointing floated fixed="top" stackable style={this.styles.navbar}>
        <Menu.Menu>
          <Menu.Item style={this.styles.title}>songatory</Menu.Item>
          <Menu.Item style={this.styles.search}>
            <Input inverted placeholder="What's your jam?" icon="search" iconPosition="left" action="Search" fluid />
          </Menu.Item>
        </Menu.Menu>
        {this.links.map((link) => {
          return (
            <Menu.Item
              active={this.props.location.pathname === link.url}
              key={link.name}
              name={link.name}
              as={Link}
              to={link.url}>
              {link.name}
            </Menu.Item>
          );
        })}
        <Menu.Item position="right" as={Link} to={`/cart`}>
          <Icon link name="cart" size="large" />
        </Menu.Item>
        {isLoggedIn ? (
          <Menu.Item name="Log Out" onClick={handleLogout} />
        ) : (
          <Menu.Menu>
            <Menu.Item name="Login" as={Link} to={`/login`} />
            <Menu.Item name="Sign Up" as={Link} to={`/signup`} />
          </Menu.Menu>
        )}
      </Menu>
    );
  }
}

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
    handleLogout(evt) {
      evt.preventDefault();
      dispatch(logout());
    },
  };
};
export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
