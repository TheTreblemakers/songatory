import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import history from '../history';
import { withRouter, Link } from 'react-router-dom';
import { AllOrderHistory, UserOrderHistory, UserEditUsername, UserEditPassword } from '../components';

/**
 * COMPONENT
 */
class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.links = [
      { url: '/home/orders', name: 'Your Order History' },
      { url: '/home/update/username', name: 'Update Username' },
      { url: '/home/update/password', name: 'Update Password' },
    ];
    this.adminLinks = [ { url: '/home/admin/orders', name: 'See All Orders' } ];
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  render() {
    const isAdmin = this.props.isAdmin;
    const { activeItem } = this.props;
    return (
      <Grid>
        <Grid.Column width={4}>
          {isAdmin && (
            <Menu fluid vertical pointing>
              {this.adminLinks.map((link) => (
                <Menu.Item
                  key={link.name}
                  name={link.name}
                  active={
                    this.props.location.pathname === link.url ||
                    (this.props.location.pathname === '/home' && link.name === 'View Order History')
                  }
                  as={Link}
                  to={link.url}>
                  {link.name}
                </Menu.Item>
              ))}
            </Menu>
          )}
          {
            <Menu fluid vertical pointing>
              {this.links.map((link) => (
                <Menu.Item
                  key={link.name}
                  name={link.name}
                  active={
                    this.props.location.pathname === link.url ||
                    (this.props.location.pathname === '/home' && link.name === 'View Order History')
                  }
                  as={Link}
                  to={link.url}>
                  {link.name}
                </Menu.Item>
              ))}
            </Menu>
          }
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {this.props.location.pathname === '/home/admin/orders' && <AllOrderHistory />}
          {this.props.location.pathname === '/home/orders' && <UserOrderHistory />}
          {activeItem === 'username' && <UserEditUsername />}
          {activeItem === 'password' && <UserEditPassword />}
        </Grid.Column>
      </Grid>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  return {
    isAdmin: state.user.isAdmin,
    activeItem: ownProps.location.pathname.split('/').pop(),
  };
};

const mapDispatch = (dispatch) => {
  return {};
};

export default withRouter(connect(mapState, mapDispatch)(UserPanel));

/**
 * PROP TYPES
 */
UserPanel.propTypes = {};
