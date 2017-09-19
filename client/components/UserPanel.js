import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import history from '../history';
import { withRouter, Link } from 'react-router-dom';
import {
  UserOrderHistory,
  UserEditUsername,
} from '../components';

/**
 * COMPONENT
 */
class UserPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    this.links = [
      { url: '/home/orders', name: 'View Order History' },
      { url: '/home/update/username', name: 'Update UserName' },
      { url: '/home/update/password', name: 'Update Password' },
    ];
    this.styles = {
      container: {
        padding: `2em`,
      },
    };
  }

  render() {
    const { activeItem } = this.props;
    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid vertical tabular>
            {this.links.map((link) => (
              <Menu.Item
                key={link.name}
                name={link.name}
                active={this.props.location.pathname === link.url || (this.props.location.pathname === '/home' && link.name === 'View Order History')}
                as={Link}
                to={link.url}>
                {link.name}
              </Menu.Item>
            ))}
          </Menu>
        </Grid.Column>

        <Grid.Column stretched width={12}>
          {(activeItem === 'orders' || activeItem === 'home') && <UserOrderHistory />}
          {activeItem === 'username' && <UserEditUsername />}
          {activeItem === 'password' && <h3>change PASSWORD PLACEHOLDER ***</h3>}
        </Grid.Column>
      </Grid>
    );
  }
}

/**
 * CONTAINER
 */
const mapState = (state, ownProps) => {
  console.log(ownProps.location);
  return {
    activeItem: ownProps.location.pathname.split('/').pop(),
  };
};

const mapDispatch = (dispatch) => {
  return {

  };
};

export default withRouter(connect(mapState, mapDispatch)(UserPanel));

/**
 * PROP TYPES
 */
UserPanel.propTypes = {

};
