import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import { getCookie } from '../../util/util.js';


class UserWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: undefined,
      className: props.className || ''
    };
  }

  componentDidMount() {
    this.setState({username: getCookie('kb-public')});
  }

  render() {
    if (this.state.username === undefined) {
      return <span />;
    }

    if (this.state.username === '') {
      return (
        <span className={'user-widget-container ' + this.state.className}>
          <Link href="/login">
            <a className='user-widget-link'>Login</a>
          </Link>
         </span>
      );
    }

    return (
      <span className={'user-widget-container ' + this.state.className}>
        {this.state.username}
      </span>
    );
	}
}

export default UserWidget;
