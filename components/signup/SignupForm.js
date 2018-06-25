import React from 'react';
import Router from 'next/router';
import Config from '../../config.js';
import DismissableAlert from '../alerts/DismissableAlert';
import { postData } from '../../util/util.js';
import { Form, FormGroup, FormControl, Button, Col, Row } from 'react-bootstrap';
import $ from 'jquery';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.buildError = this.buildError.bind(this);

    this.username = '';
    this.password = '';
    this.email = '';
    this.confirmPassword = '';

    this.state = { addError: props.addError  };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ addError: nextProps.addError });
  }

  validUserPass(obj) {
    return !(obj['username'] === '' || obj['password'] === '');
  }

  confirmPasswordMatch(obj) {
    return obj['password'] === obj['confirmPassword'];
  }

  buildError(message) {
    return (
      <DismissableAlert type='danger' title='Unable to signup' message={message} />
    );
  }

  prepareData() {
    return {
      email: this.email.value,
      username: this.username.value,
      password: this.password.value,
      confirmPassword: this.confirmPassword.value,
    };
  }

  handleSubmit(e) {
    e.preventDefault();

    const preparedData = this.prepareData();

    if (!this.validUserPass(preparedData)) {
      return this.state.addError(this.buildError('please enter both a username and password to signup'));
    }

    if(!this.confirmPasswordMatch(preparedData)) {
      return this.state.addError(this.buildError('passwords do not match'));
    }

    const surl = Config.serverURL + '/users';
    const error = (text) => {
      this.state.addError(this.buildError(JSON.parse(text)['message']));
    };
    const success = (json) => {
      const lurl = Config.serverURL + '/login';
      postData(lurl, preparedData, () => { Router.push('/'); }, error);
    };

    postData(surl, preparedData, success, error, false);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        <Row className='signup-form-row'>
          <Col sm={6} md={6} lg={6}>
            <FormControl className='signup-input' type='email' placeholder='Email' inputRef={ref => { this.email = ref; }}/>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <FormControl className='signup-input' type='text' placeholder='Username' inputRef={ref => { this.username = ref; }}/>
          </Col>
        </Row>

        <Row className='signup-form-row'>
          <Col sm={6} md={6} lg={6}>
            <FormControl className='signup-input' type='password' placeholder='Password' inputRef={ref => { this.password = ref; }} />
          </Col>
          <Col sm={6} md={6} lg={6}>
            <FormControl className='signup-input' type='password' placeholder='Confirm Password' inputRef={ref => { this.confirmPassword = ref; }}/>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={12} lg={12}>
            <Button className='signup-submit' type='submit'>Create account</Button>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SignupForm;
