import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Menu, Input, Label, Icon, Dropdown } from 'semantic-ui-react';
import { makeQuery } from '../store/search';
import { logout } from '../store';
import history from '../history';

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.defaultPlaceholder = "What's your jam?";
    this.state = {
      query: '',
      queryType: 'artists',
      inputError: false,
      searchPlaceholder: this.defaultPlaceholder,
    };
    this.searchOptions = [
      { key: 'Artists', text: 'Artists', value: 'artists' },
      { key: 'Albums', text: 'Albums', value: 'albums' },
      { key: 'Songs', text: 'Songs', value: 'songs' },
    ];
    this.links = [
      { url: '/artists/page/1', name: 'Artists' },
      { url: '/albums/page/1', name: 'Albums' },
      { url: '/songs/page/1', name: 'Songs' },
    ];
    this.styles = {
      navbar: {
        // minHeight: `3.5em`,
        height: `3.8em`,
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
    if (this.state.query.length < 3) {
      this.setState({ query: '', inputError: true, searchPlaceholder: 'Please enter at least three characters' });
    } else {
      this.props.search(this.state.query, this.state.queryType);
    }
  };

  handleChange = (e, { name, value }) => {
    this.setState({ searchPlaceholder: this.defaultPlaceholder, [name]: value, inputError: false }, () => {});
  };

  render() {
    const { isLoggedIn, user, handleLogout } = this.props;
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
          <Menu.Item
            color="teal"
            active={this.props.location.pathname === '/'}
            as={Link}
            to={'/'}
            style={this.styles.title}>
            songatory
          </Menu.Item>
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
                  error={this.state.inputError}
                  name="query"
                  value={query}
                  placeholder={this.state.searchPlaceholder}
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
          <Menu.Menu>
            <Menu.Item name={`Log Out`} onClick={handleLogout} />
            <Menu.Item color="teal" active={this.props.location.pathname === '/home'} as={Link} to={'/home'}>
              <Icon name="user" size="big" />
            </Menu.Item>
          </Menu.Menu>
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
    // isLoggedIn: !!state.user,
    user: state.user,
    cart: state.cart,
  };
};

const mapDispatch = (dispatch) => ({
  search: (query, queryType) => {
    dispatch(makeQuery(query, queryType));
  },
  handleLogout: (evt) => {
    evt.preventDefault();
    dispatch(logout());
  },
});

export default withRouter(connect(mapState, mapDispatch)(Navbar));

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
  handleLogout: PropTypes.func.isRequired,
};
