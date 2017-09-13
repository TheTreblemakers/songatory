import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Grid,
  Header,
  Image,
  List,
  Menu,
  Segment,
  Visibility,
  Search,
  Input,
  Breadcrumb,
  Icon,
} from 'semantic-ui-react';
import { logout } from '../store';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: 'home',
    };
  }

  handleItemClick = (e, { name }) => {
    this.setState({ activeItem: name });
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
          <Menu.Item name="Artists" active={activeItem === 'Artists'} onClick={this.handleItemClick} />
          <Menu.Item name="Albums" active={activeItem === 'Albums'} onClick={this.handleItemClick} />
          <Menu.Item name="Songs" active={activeItem === 'Songs'} onClick={this.handleItemClick} />

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
