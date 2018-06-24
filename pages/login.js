import BasicLayout from '../components/BasicLayout.js';
import Router from 'next/router';
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import Logo from '../components/misc/Logo.js';
import Link from 'next/link';
import Config from '../config.js';
import { postData } from '../util/util.js';
import { Row, Form, FormGroup, FormControl, Button, Col } from 'react-bootstrap';
import '../styles.scss';

const SIGNUP_TEXT = "Don't have an accout? Signup here."

class Login extends React.Component {
  constructor (props){
    super(props);
    this.addError = this.addError.bind(this);
    this.prepareData = this.prepareData.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.validUserPass = this.validUserPass.bind(this);
    
    this.username = '';
    this.password = '';
    this.state = {error: ''};
  }

  buildError(message) {
    return (
      <DismissableAlert type='danger' title='Unable to login' message={message} />
    );
  }

  prepareData() {
		return ({
			username: this.username.value,
			password: this.password.value
		});
  }

  addError(error) {
    this.setState({error: error});
  }

  validUserPass(obj) {
    return !(obj['username'] === '' || obj['password'] === '');
  }

  handleSubmit(e) {
    e.preventDefault();
    const preparedData = this.prepareData();

    if (!this.validUserPass(preparedData)) {
      this.addError(this.buildError('please enter both a username and password to signup'));
      return;
    }

		const url = Config.serverURL + '/login';
		const onSuccess = () => { Router.push('/') };
		const onError = (response) => {
			const data = JSON.parse(response);
			this.addError(this.buildError(data['message']));
		};

		postData(url, preparedData, onSuccess, onError);
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
						<Link href={'/signup'}>
							<a className='login-signup-link'>{SIGNUP_TEXT}</a>
						</Link>
          </div>
        </div>
      </BasicLayout>
    );
  }
}

export default Login;
