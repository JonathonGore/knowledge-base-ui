import Config from '../../config.js';
import DismissableAlert from '../alerts/DismissableAlert.js';
import Logo from '../misc/Logo.js';
import LoginForm from './LoginForm';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { postData } from '../../util/util.js';
import './styles.scss';

class Login extends React.Component {
  constructor (props){
    super(props);

    this.state = {error: ''};
  }

  buildError = (message) => {
    this.setState({
      error: (
        <DismissableAlert type='danger' title='Unable to login' message={message} />
      ),
    });
  }

  validUserPass(obj) {
    return !(obj['username'] === '' || obj['password'] === '');
  }

  handleSubmit = (username, password) => {
    if (!this.validUserPass({username, password})) {
      this.buildError('please enter both a username and password to signup');
      return;
    }

    const url = Config.serverURL + '/login';
    const onSuccess = () => {
      window.location.replace('/'); // Use window location to force hard reload to avoid landing page
    };
    const onError = (response) => {
      const data = JSON.parse(response);
      this.buildError(data['message']);
    };

    postData(url, {username, password}, onSuccess, onError);
  }


  render() {
    return (
      <div className='login-page'>
        <Logo color='black' size={44} inline />
        <div className='login-error-container'>
          {this.state.error}
        </div>
        <LoginForm onSubmit={this.handleSubmit}/>
        <Link href={'/signup'}>
          <a className='login-signup-link'>{this.props.signupText}</a>
        </Link>
      </div>
    );
  }
}

Login.propTypes = {
  signupText: PropTypes.string,
};

Login.defaultProps = {
  signupText: 'Don\'t have an accout? Signup here.',
};

export default Login;
