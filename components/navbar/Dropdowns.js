import PropTypes from 'prop-types';
import { MenuItem, NavDropdown } from 'react-bootstrap';

export const UsersDropdown = (props) => (
  <NavDropdown eventKey={3} title={props.username} id='basic-nav-dropdown'>
    <MenuItem eventKey={3.1} href={'/profile'}>Profile</MenuItem>
    <MenuItem eventKey={3.2}>Settings</MenuItem>
    <MenuItem eventKey={3.3}>Help</MenuItem>
    <MenuItem divider />
    <MenuItem eventKey={3.3} onClick={props.onLogout}>Logout</MenuItem>
  </NavDropdown>
);

UsersDropdown.propTypes = {
  username: PropTypes.string,
  onLogout: PropTypes.func,
};

UsersDropdown.defaultProps = {
  username: '',
  onLogout: () => (console.error('no log out function provided')),
};

export const OrgsDropdown = (props) => (
  <NavDropdown eventKey={4} title={props.title} id='orgs-dropdown' >
    <MenuItem header>Organization</MenuItem>
    <MenuItem key={'public'} onSelect={() => props.onClick('Public')}>{'Public'}</MenuItem>
    {
      props.orgs.map(org =>
        <MenuItem key={org.name} onSelect={() => props.onClick(org.name)}>{org.name}</MenuItem>
      )
    }
    <MenuItem divider />
    <MenuItem href='/organizations/create'>Create Organization</MenuItem>
  </NavDropdown>
);

OrgsDropdown.propTypes = {
  title: PropTypes.node,
  orgs: PropTypes.array,
  onClick: PropTypes.func,
};

OrgsDropdown.defaultProps = {
  title: 'Public',
  orgs: [{name: 'Public', link: '/questions'}],
};
