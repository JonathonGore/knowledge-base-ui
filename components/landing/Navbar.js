import Button from '../misc/Button.js';
import PropTypes from 'prop-types';
import Router from 'next/router';
import './navbar.scss';

const onClick = () => {
  Router.push('/login');
};

const NavLink = (props) => (
  <a className='landing-nav-link' href={props.href}>
    {props.text}
  </a>
);

const Navbar = (props) => (
  <nav className='landing-navbar bg-light'>
    <div className='landing-container'>
      <a className='landing-navbar-brand' href='#'>Knowledge-Base</a>
      <div className='landing-nav-right'>
        <NavLink text='about' href='/about' />
        <NavLink text='login' href='/login' />
      </div>
    </div>
  </nav>
);

NavLink.propTypes = {
  href: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}

export default Navbar;
