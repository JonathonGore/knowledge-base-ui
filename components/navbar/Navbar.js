import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import Router from 'next/router';
import Search from './Search.js';
import Logo from '../misc/Logo.js';
import Config from '../../config.js';
import { KB_ORG_SELECTION, KB_DEFAULT_ORG } from '../../constants/constants.js';
import { UsersDropdown, OrgsDropdown } from './Dropdowns.js';
import { postData } from '../../util/util.js';
import { Navbar, NavItem, MenuItem, Nav } from 'react-bootstrap';

const DEFAULT_ORG = {name: KB_DEFAULT_ORG};

class KBNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.buildUserSection = this.buildUserSection.bind(this);
    this.logout = this.logout.bind(this);
    this.onOrgSelect = this.onOrgSelect.bind(this);

    // TODO: React-proptypes
    this.state = {
      isLoggedIn: props.isLoggedIn || false,
      username: props.username || '',
      text: props.text || '',
      orgs: props.orgs || [DEFAULT_ORG],
      org: KB_DEFAULT_ORG,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.username === prevState.username &&
      nextProps.orgs.length === prevState.orgs) {
      return null;
    }

    return ({
      username: nextProps.username,
      isLoggedIn: nextProps.isLoggedIn,
      orgs: nextProps.orgs,
    });
  }

  componentDidMount() {
    this.setState({org: localStorage.getItem(KB_ORG_SELECTION)});
  }

  logout() {
    const url = Config.serverURL + '/logout';
    const success = () => {
      this.setState({isLoggedIn: false});
      // TODO: need to push to a new page - probably the homepage
      localStorage.removeItem(KB_ORG_SELECTION);
    };

    const failure = () => { console.log('unable to logout'); };

    postData(url, {}, success, failure);
  }

  buildOrgsSection() {
    if (!this.state.isLoggedIn) {
      return (
        // TODO: Change to have proper icon
        <NavItem eventKey={3}>Public</NavItem>
      );
    }

    return (<OrgsDropdown onClick={this.onOrgSelect} title={this.state.org} orgs={this.state.orgs}/>);
  }

  buildUserSection() {
    if (!this.state.isLoggedIn) {
      return (
        <NavItem eventKey={3} href='/login'>Login</NavItem>
      );
    }

    return (
      <UsersDropdown username={this.state.username} onLogout={this.logout} />
    );
  }

  onOrgSelect(org) {
    if (localStorage) {
      localStorage.setItem(KB_ORG_SELECTION, org);
    }

    this.setState({org: org});
    Router.push('/questions');
  }

  render() {
    return (
      <Navbar fluid fixedTop className='kb-navbar'>
        <Navbar.Header>
          <Navbar.Brand>
            <Logo color={'#777'} size={'inherit'} className={'kb-navbar-padding'}/>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <NavItem eventKey={1} href='/questions'>Questions</NavItem>
          <NavItem eventKey={2} href='/organizations'>Organizations</NavItem>
          <NavItem eventKey={3} href='/about'>About</NavItem>
        </Nav>
        <Nav pullRight>
          <NavItem eventKey={4} href='/ask'>Ask Question</NavItem>
          {this.buildOrgsSection()}
          {this.buildUserSection()}
        </Nav>
      </Navbar>
    );
  }
}

export default KBNavbar;
