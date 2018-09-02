import AddMembers from '../general/AddMembers';
import DangerZone from './DangerZone';
import PropTypes from 'prop-types';
import React from 'react';
import './styles.scss';

// Settings used for displaying settings for a particular
// organization.
class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='org-settings-container'>
        <div className='org-settings-header'>Settings</div>
        <AddMembers onSubmit={this.props.onSubmit}/>
        <DangerZone org={this.props.org}/>
      </div>
    );
  }
}

Settings.propTypes = {
  onSubmit: PropTypes.func,
  org: PropTypes.string.isRequired,
};

export default Settings;
