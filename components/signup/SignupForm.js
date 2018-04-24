import React from 'react';
import { Form, FormGroup, FormControl, Button, ControlLabel, Col, Row, Checkbox } from 'react-bootstrap';
import Config from '../../config.json';
import DismissableAlert from '../alerts/DismissableAlert';
import $ from 'jquery';

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.validUserPass = this.validUserPass.bind(this);
    this.confirmPasswordMatch = this.confirmPasswordMatch.bind(this);
    this.buildError = this.buildError.bind(this);

    this.username = "";
    this.password = "";
    this.email = "";
    this.confirmPassword = "";

    this.state = { addError: props.addError  };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ addError: nextProps.addError });
  }

  validUserPass(obj) {
    return !(obj['username'] === "" || obj['password'] === "");
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
    var map = {};
    map['email'] = this.email.value;
    map['username'] = this.username.value;
    map['password'] = this.password.value;
    map['confirmPassword'] = this.confirmPassword.value;

    return map;
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var preparedData = self.prepareData();

    if (!self.validUserPass(preparedData)) {
      self.state.addError(self.buildError("please enter both a username and password to signup"));
      return
    }

    if(!self.confirmPasswordMatch(preparedData)) {
      self.state.addError(self.buildError("passwords do not match"));
      return
    }

    // Post to backend
    $.ajax({
      type: "POST",
      url: Config.serverURL + "/users",
      data: JSON.stringify(preparedData),
      xhrFields: {
        withCredentials: false
      },
      success: function(json) {
        $.ajax({
          type: "POST",
          url: Config.serverURL + "/login",
          data: JSON.stringify(preparedData),
          xhrFields: {
            withCredentials: true
          },
          success: function(json) {
            // Cause a rerender of our global components
            //self.props.updateLoginStatus(true);
            //self.setState({signupRedirect: true});
            // TODO: Redirect to a relevant page here
            console.log("Successfully logged in");
          },
          error: function (xhr) {
            //TODO: ensure responseText is JSON;
            var data = JSON.parse(xhr.responseText);
            self.state.addError(self.buildError(data['error']));
          }
        });
      },
      error: function (xhr) {
        var data = JSON.parse(xhr.responseText);
        self.state.addError(self.buildError(data['error']));
      }
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>

        <Row className="signup-form-row">
          <Col sm={6} md={6} lg={6}>
            <FormControl className="signup-input" type="email" placeholder="Email" inputRef={ref => { this.email = ref; }}/>
          </Col>
          <Col sm={6} md={6} lg={6}>
            <FormControl className="signup-input" type="text" placeholder="Username" inputRef={ref => { this.username = ref; }}/>
          </Col>
        </Row>

        <Row className="signup-form-row">
          <Col sm={6} md={6} lg={6}>
            <FormControl className="signup-input" type="password" placeholder="Password" inputRef={ref => { this.password = ref; }} />
          </Col>
          <Col sm={6} md={6} lg={6}>
            <FormControl className="signup-input" type="password" placeholder="Confirm Password" inputRef={ref => { this.confirmPassword = ref; }}/>
          </Col>
        </Row>

        <Row>
          <Col sm={12} md={12} lg={12}>
            <Button className="signup-submit" type="submit">Create account</Button>
          </Col>
        </Row>
      </Form>
    );
	}
}

export default SignupForm;
