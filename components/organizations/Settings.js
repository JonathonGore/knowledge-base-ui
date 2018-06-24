import React from 'react';
import AddMembers from '../general/AddMembers';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='org-settings-container'>
        <div className='org-settings-header'>Settings</div>
        <AddMembers />
      </div>
    );
  }
}

export default Settings;
