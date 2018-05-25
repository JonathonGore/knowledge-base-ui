import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import Search from './Search.js';

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
        <span className='kb-navbar-text'>
          {this.state.text}
        </span>
        <Search text={'Search...'} />
      </nav>
    );
	}
}

export default Navbar;
