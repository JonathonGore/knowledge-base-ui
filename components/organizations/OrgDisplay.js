import DismissableAlert from '../alerts/DismissableAlert.js';
import moment from 'moment';
import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { Header } from '../general/display';
import '../../styles.scss';

const DATE_FORMAT = 'MMM Do YYYY';
const CREATE_TEAM_TEXT = 'Create Team';

const Stats = (props) => (
  <div className='org-display-stats'>
    <span className='org-display-dob'>Organization Since: {moment(props.createdOn).format(DATE_FORMAT)}</span>
    <span className='org-display-members'>Members: {props.members}</span>
  </div>
);

Stats.propTypes = {
  members: PropTypes.number,
  createdOn: PropTypes.string,
};

Stats.defaultProps = {
  members: 0,
  createdOn: '',
};

class OrgDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  addError(title, message) {
    this.setState({
      error: <DismissableAlert type='danger' title={title} message={message} />
    });
  }

  createClicked() {
    if (this.props.username === '' || this.props.admins.length === 0) {
      this.addError('Unable to create team.', 'Action unavailable at this time. Try again later.');
      return;
    }

    if (!this.props.admins.includes(this.props.username)) {
      this.addError('Unable to create team.', 'Must be member of organization to create team.');
      return;
    }

    Router.push('/organizations/' + this.props.org.name + '/create');
  }

  render() {
    return (
      <div className='org-display'>
        {this.props.children}
        <div className='login-error-container'>
          {this.state.error}
        </div>
        <Header onClick={() => { this.createClicked(); }}
          info={<Stats createdOn={this.props.org['created-on']} members={this.props.org['member-count']}/>}
          title={this.props.org.name} buttonText={CREATE_TEAM_TEXT} settings={this.props.settings}/>
      </div>
    );
  }
}

OrgDisplay.propTypes = {
  admins: PropTypes.array,
  name: PropTypes.string,
  org: PropTypes.object,
  settings: PropTypes.node,
  username: PropTypes.string,
};

OrgDisplay.defaultProps = {
  admins: [],
  name: '',
  org: {},
  settings: '',
  username: '',
};

export default OrgDisplay;
