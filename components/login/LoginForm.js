import PropTypes from 'prop-types';
import React from 'react';
import { Form, FormControl, Button, Col } from 'react-bootstrap';
import './styles.scss';

let username = {};
let password = {};

const onSubmitWrapper = (e, onSubmit, username, password) => {
  e.preventDefault();

  onSubmit(username, password);
};

const LoginForm = (props) => (
  <Form className='login-form' onSubmit={(e) => onSubmitWrapper(e, props.onSubmit, username.value, password.value)}>
    <FormControl className='login-input' type='text' placeholder={props.usernamePlaceholder}
      inputRef={ref => { username = ref; }}/>
    <FormControl className='login-input' type='password' placeholder={props.passwordPlaceholder}
      inputRef={ref => { password = ref; }} />
    <Button className='signup-submit' type='submit'>{props.loginText}</Button>
  </Form>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  loginText: PropTypes.string,
  passwordPlaceholder: PropTypes.string,
  usernamePlaceholder: PropTypes.string,
};

LoginForm.defaultProps = {
  loginText: 'Log in',
  passwordPlaceholder: 'Password',
  usernamePlaceholder: 'Username',
};

export default LoginForm;
