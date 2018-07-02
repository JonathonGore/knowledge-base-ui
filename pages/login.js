import BasicLayout from '../components/BasicLayout.js';
import LoginPage from '../components/login/Login';
import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BasicLayout>
        <LoginPage />
      </BasicLayout>
    );
  }
}

export default Login;
