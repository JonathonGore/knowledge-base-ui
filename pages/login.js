import BasicLayout from '../components/BasicLayout.js';
import { Row, Form, FormGroup, FormControl, Button, ControlLabel, Col, Checkbox } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import Router from 'next/router';
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import Logo from '../components/misc/Logo.js';
import Config from '../config.js';
import $ from 'jquery';
import '../styles.scss';

class Signup extends React.Component {

  constructor (props){
    super(props);
    this.addError = this.addError.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validUserPass = this.validUserPass.bind(this);
    this.buildError = this.buildError.bind(this);
    this.username = '';
    this.password = '';
    this.state = { error: ''};
  }

  buildError(message) {
    return (
      <DismissableAlert type='danger' title='Unable to login' message={message} />
    );
  }

  prepareData() {
    var map = {};
    map['username'] = this.username.value;
    map['password'] = this.password.value;

    return map;
  }

  addError(error) {
    this.setState({error: error});
  }

  validUserPass(obj) {
    return !(obj['username'] === '' || obj['password'] === '');
  }

  handleSubmit(e) {
    e.preventDefault();
    var self = this;
    var preparedData = self.prepareData();

    if (!self.validUserPass(preparedData)) {
      self.addError(self.buildError('please enter both a username and password to signup'));
      return;
    }

    // Post loging request to backend
    $.ajax({
      type: 'POST',
      url: Config.serverURL + '/login',
      data: JSON.stringify(preparedData),
      xhrFields: {
        withCredentials: true
      },
      success: function(json) {
        Router.push('/');
      },
      error: function (xhr) {
        var data = JSON.parse(xhr.responseText);
        self.addError(self.buildError(data['message']));
      }
    });
  }


  render() {
    return (
      <BasicLayout>
        <div className="login-page">
          <div className="login-form-container">
            <Logo color={'black'} size={44} inline />
            <div className='login-error-container'>
              {this.state.error}
            </div>
            <Form className='login-form' onSubmit={this.handleSubmit}>
					        <Row className="signup-form-row">
					          <Col sm={12} md={12} lg={12}>
					            <FormControl className="signup-input" type="text" placeholder="Username" inputRef={ref => { this.username = ref; }}/>
					          </Col>
					        </Row>

					        <Row className="signup-form-row">
					          <Col sm={12} md={12} lg={12}>
					            <FormControl className="signup-input" type="password" placeholder="Password" inputRef={ref => { this.password = ref; }} />
					          </Col>
					        </Row>

					        <Row>
					          <Col sm={12} md={12} lg={12}>
					            <Button className="signup-submit" type="submit">Log in</Button>
					          </Col>
					        </Row>
            </Form>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

export default Signup;
