import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, Button } from 'semantic-ui-react';
import history from '../history';
import { changePassword } from '../store';

class UserEditPassword extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
      inputError: false,
    };
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
    // e.preventDefault();
    console.log(this.state.query);
    // TODO: input validation
    if (this.state.query.length < 4) {
      this.setState({ query: '', inputError: true, searchPlaceholder: 'Please use a valid password. Must be at least 4 characters!' });
    } else {
      this.props.handleUpdatePassword(this.state.query, this.props.userId);
    }
  };

  handleChange = (e) => {
    console.log(this.state);
    this.setState({ query: e.target.value, inputError: false });
  };

  render() {
    const { isLoggedIn } = this.props;
    const query = this.state.query;

    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Field>
          <label>Password</label>
          <input onChange={this.handleChange} placeholder="Please enter your new password here" />
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
  handleUpdatePassword: (password, id) => {
    dispatch(changePassword(password, id));
  },
});

export default withRouter(connect(mapState, mapDispatch)(UserEditPassword));

/**
 * PROP TYPES
 */
UserEditPassword.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
};
