import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Menu, Input, Label, Icon, Dropdown } from 'semantic-ui-react';
import { logout } from '../store';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      queryType: '',
    };
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

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state.query);
  };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value }, () => {
      console.log(this.state);
    });
  };

  render() {
    const { isLoggedIn, handleLogout } = this.props;
    const cart = this.props.cart;
    const itemsInCart = cart.songs.length + cart.albums.length;
    const query = this.state.query;
    const options = [
      { key: 'artists', text: 'Artists', value: 'artists' },
      { key: 'albums', text: 'Albums', value: 'albums' },
      { key: 'songs', text: 'Songs', value: 'songs' },
    ];

    return (
      <Menu inverted floated fixed="top" stackable style={this.styles.navbar}>
        <Menu.Menu>
          <Menu.Item style={this.styles.title}>songatory</Menu.Item>
          <Menu.Item>
            <Form onSubmit={this.handleSubmit} style={this.styles.search}>
              <Form.Field>
                <Input
                  onChange={this.handleChange}
                  label={
                    <Dropdown
                      onChange={this.handleChange}
                      className="field"
                      defaultValue="artists"
                      name="queryType"
                      options={options}
                    />
                  }
                  labelPosition="right"
                  inverted
                  name="query"
                  value={query}
                  placeholder="What's your jam?"
                  icon={<Icon name="search" />}
                  iconPosition="left"
                  fluid
                />
              </Form.Field>
            </Form>
          </Menu.Item>
        </Menu.Menu>
        {this.links.map((link) => {
          return (
            <Menu.Item
              color="teal"
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
          {itemsInCart > 0 && <Label color="teal">{itemsInCart}</Label>}
          <Icon link name="cart" size="big" />
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
    cart: state.cart,
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
