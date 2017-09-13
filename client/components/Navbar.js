import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import history from '../history';
import { Container, Menu, Input, Icon } from 'semantic-ui-react';
import { logout } from '../store';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '/',
      activeItem: 'Home',
    };
  }

  links = [
    { url: '/artists', name: 'Artists' },
    { url: '/albums', name: 'Albums' },
    { url: '/songs', name: 'Songs' },
  ];

  handleItemClick = (e, { name }) => {
    const link = this.links.find((link) => {
      return link.name === name;
    });
    this.setState({ activeItem: link.name, url: link.url }, () => {
      history.push(this.state.url);
    });
  };

  render() {
    let activeItem;
    return (
      <div>
        <Menu inverted fixed="top">
          <Menu.Menu>
            <Menu.Item name="home" active={activeItem === 'home'} onClick={this.handleItemClick}>
              songatory
            </Menu.Item>
            <Menu.Item>
              <Input icon="search" placeholder="Search..." />
            </Menu.Item>
          </Menu.Menu>
          {this.links.map((link) => {
            return (
              <Menu.Item key={link.name} name={link.name} onClick={this.handleItemClick}>
                {link.name}
              </Menu.Item>
            );
          })}
          <Menu.Item position="right">
            <Icon link name="cart" size="large" />
          </Menu.Item>
          <Menu.Item name="Login" onClick={this.handleItemClick} />
          <Menu.Item name="Sign Up" onClick={this.handleItemClick} />
        </Menu>
      </div>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar));
