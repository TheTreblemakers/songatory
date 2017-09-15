import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
<<<<<<< HEAD
import { withRouter } from 'react-router-dom';
import history from '../history';
import { SearchBar } from '../components';
import { Container, Menu, Input, Icon } from 'semantic-ui-react';
=======
import { withRouter, Link } from 'react-router-dom';
import { Menu, Input, Icon } from 'semantic-ui-react';
>>>>>>> 3a991575e66499d3e05afc8bed46da0f29c6377b
import { logout } from '../store';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      url: '/',
      activeItem: 'Home',
    };
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

<<<<<<< HEAD
  handleItemClick = (e, { name }) => {
    const link = this.links.find((link) => {
      return link.name === name;
    });
    this.setState({ activeItem: link.name, url: link.url }, () => {
      history.push(this.state.url);
    });
  };

=======
>>>>>>> 3a991575e66499d3e05afc8bed46da0f29c6377b
  render() {
    let activeItem;
    return (
      <Menu inverted floated fixed="top" stackable style={this.styles.navbar}>
        <Menu.Menu>
          <Menu.Item style={this.styles.title}>songatory</Menu.Item>
          <Menu.Item style={this.styles.search}>
            <SearchBar />
          </Menu.Item>
        </Menu.Menu>
        {this.links.map((link) => {
          return (
            <Menu.Item key={link.name} name={link.name} as={Link} to={link.url}>
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
const mapState = (state) => {};

const mapDispatch = (dispatch) => {};

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Navbar));
