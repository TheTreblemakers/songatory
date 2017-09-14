import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { auth } from '../store';
import { withRouter, Link } from 'react-router-dom';
import { Container, Form, Message } from 'semantic-ui-react';

const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props;

  return (
    <Container>
      <h2>{displayName}</h2>
      <Form onSubmit={handleSubmit} name={name}>
        <Form.Input label="Email" name="email" type="email" />
        <Form.Input label="Password" name="password" type="password" />
        <Form.Button>Submit</Form.Button>
        {error && error.response && <Message negative> {error.response.data} </Message>}
      </Form>
      <a href="/auth/google">{displayName} with Google</a>
    </Container>
  );
};

const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  };
};

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  };
};

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      // console.log(evt.target);
      evt.preventDefault();
      const formName = evt.target.name;
      const email = evt.target.email.value;
      const password = evt.target.password.value;
      dispatch(auth(email, password, formName));
    }
  };
};

export const Login = withRouter(connect(mapLogin, mapDispatch)(AuthForm));
export const Signup = withRouter(connect(mapSignup, mapDispatch)(AuthForm));

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
};
