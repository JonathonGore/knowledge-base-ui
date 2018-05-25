import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import Search from './Search.js';
import UserWidget from './UserWidget.js';
import Logo from '../misc/Logo.js';

class Navbar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text || ''
    };
  }

  render() {
    return (
      <nav className='kb-navbar'>
        <Logo color={'black'} size={'inherit'} className={'kb-navbar-padding'}/>
        <span className='kb-navbar-text kb-navbar-padding'>
          {this.state.text}
        </span>
        <Search text={'Search...'} />
        <UserWidget className='kb-navbar-padding' />
      </nav>
    );
	}
}

export default Navbar;
