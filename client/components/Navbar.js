import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Input, Icon, Dropdown } from 'semantic-ui-react';
import { logout } from '../store';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.searchOptions = [
      { key: 'Artists', text: 'Artists', value: 'artists' },
      { key: 'Albums', text: 'Albums', value: 'albums' },
      { key: 'Songs', text: 'Songs', value: 'songs' },
    ];
    this.links = [
      { url: '/', name: 'Home' },
      { url: '/artists', name: 'Artists' },
      { url: '/albums', name: 'Albums' },
      { url: '/songs', name: 'Songs' },
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
        <Menu.Item position="right">
          <Icon link name="cart" size="large" />
        </Menu.Item>
        <Menu.Item name="Login" as={Link} to={`/login`} />
        <Menu.Item name="Sign Up" as={Link} to={`/signup`} />
      </Menu>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {};
};

const mapDispatch = (dispatch) => {
  return {};
};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar));
