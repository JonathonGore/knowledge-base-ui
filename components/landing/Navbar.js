import Button from '../misc/Button.js';
import Router from 'next/router';
import './navbar.scss';

const onClick = () => {
  Router.push('/login');
};

const Navbar = (props) => (
  <nav className='landing-navbar bg-light'>
    <div className='landing-container'>
      <a className='landing-navbar-brand' href='#'>Start Bootstrap</a>
      <Button onClick={onClick} style='alt-primary'>Login</Button>
    </div>
  </nav>
);

export default Navbar;
