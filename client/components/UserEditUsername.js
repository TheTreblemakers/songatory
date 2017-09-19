import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import history from '../history';
import { changeUsername } from '../store';

class UserEditUsername extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      inputError: false,
    };
    this.styles = {
      navbar: {
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
    if (!(this.state.query.includes('@'))) {
      this.setState({ query: '', inputError: true, searchPlaceholder: 'Please use a valid email. You did not include an \"@\"!' });
    } else {
      this.props.handleUpdateUsername(this.state.query, this.props.userId);
    }
  };

  handleChange = (e) => {
    this.setState({ query: e.target.value, inputError: false });
  };

  render() {
    const { isLoggedIn } = this.props;
    const query = this.state.query;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Email/Username</label>
          <input onChange={this.handleChange} placeholder="Please enter your new email here" />
        </Form.Field>
        <Button type='submit'>Submit</Button>
      </Form>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  };
};

const mapDispatch = (dispatch) => ({
  handleUpdateUsername: (email, id) => {
    dispatch(changeUsername(email, id));
  },
});

export default withRouter(connect(mapState, mapDispatch)(UserEditUsername));

/**
 * PROP TYPES
 */
UserEditUsername.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
