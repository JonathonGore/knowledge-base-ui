import PropTypes from 'prop-types';
import React from 'react';
import Button from '../misc/Button';
import Config from '../../config';
import { deleteData } from '../../util/util';
import './styles.scss';

const deleteOrgText = 'Click to delete your organization forever...';

// Danger zone display operations for an organization that are "dangerous".
// This includes things like deleting and renaming of the organization.
class DangerZone extends React.Component {
  constructor(props) {
    super(props);
    this.deleteOrg = this.deleteOrg.bind(this);
  }

  buildDeleteOrgURL(org) {
    return `${Config.serverURL}/organizations/${org}`;
  }

  deleteOrg() {
    // TODO: Handle errors gracefully.
    const onSuccess = () => {
      alert('successfully deleted organization');
    };
    const onFailure = () => {
      alert('unable to delete organizaiton');
    };
    deleteData(this.buildDeleteOrgURL(this.props.org), onSuccess, onFailure);
  }

  render() {
    return (
      <div className='org-danger-zone-container'>
        <div className='org-danger-zone-header'>Danger Zone</div>
        <div className='org-danger-boundary'>
          <span className='org-danger-description'>
            {deleteOrgText}
          </span>
          <Button className='org-danger-button' onClick={this.deleteOrg} text='Delete Organization' />
        </div>
      </div>
    );
  }
}

DangerZone.propTypes = {
  org: PropTypes.string.isRequired,
};

export default DangerZone;
