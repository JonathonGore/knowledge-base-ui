import AddMembers from '../general/AddMembers';
import React from 'react';
import './styles.scss';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='org-settings-container'>
        <div className='org-settings-header'>Settings</div>
        <AddMembers onSubmit={this.props.onSubmit}/>
      </div>
    );
  }
}

export default Settings;
