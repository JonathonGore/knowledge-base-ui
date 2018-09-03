import Button from '../misc/Button.js';
import Config from '../../config.js';
import Content from '../content/Content.js';
import DismissableAlert from '../alerts/DismissableAlert';
import OrgDisplay from './OrgDisplay';
import PropTypes from 'prop-types';
import React from 'react';
import Settings from './Settings';
import { postData, half } from '../../util/util.js';
import { TwoPaneSplit } from '../general/display.js';
import '../../styles.scss';

const noTeamsText = 'No teams have been created for this organization yet.'

// Organization is responsible for display information about a SINGLE organization.
class Organization extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      message: '',
      showSettings: false,
    };
  }

  // buildSettings conditionally constructs a settings button if the current user is an admin.
  buildSettings = () => {
    // Only display the settings button if the logged in user is an admin
    if (this.props.username === '' || this.props.admins.length === 0 ||
      !this.props.admins.includes(this.props.username)) {
      return '';
    }

    return (
      <Button text={this.state.showSettings ? 'Go back' : 'Settings'}
        icon={this.state.showSettings ? '' : 'cog'}
        onClick={() => this.setState({showSettings: !this.state.showSettings})}/>
    );
  }

  addOrgMember = (name) => {
    const url = Config.serverURL + '/organizations/' + this.props.orgName + '/members';
    const data = {
      username: name,
      admin: false,
    };

    const success = () => {
      this.setState({
        message: (
          <DismissableAlert title={`Successfully added ${name} to ${this.props.orgName}`}
            type='success'/>
        ),
      });
    };

    const failure = (json) => {
      const data = JSON.parse(json);
      this.setState({
        message: (
          <DismissableAlert title={`Unable to add ${name} to ${this.props.orgName}`}
            message={data.message} type='danger'/>
        ),
      });
    };

    postData(url, data, success, failure);
  }

  buildTeamsList() {
    let description = '';
    if (this.props.teams.length === 0) {
      description = noTeamsText;
    }

    return (
        <TwoPaneSplit header='Teams' type={`organizations/${this.props.orgName}`}
          left={half(this.props.teams)} right={half(this.props.teams, false)}
          description={description} />
    );
  }

  render () {
    return (
      <div className='org-container'>
        <OrgDisplay admins={this.props.admins} username={this.props.username}
          settings={this.buildSettings()} org={this.props.org}>
          <div className='org-message-container'>
            {this.state.message}
          </div>
        </OrgDisplay>
        {
          this.state.showSettings ? (
            <Settings org={this.props.orgName} onSubmit={this.addOrgMember}/>
          ) : (
            <div>
              {this.buildTeamsList()}
              <div className='org-top-questions'>
                <div className='org-questions-header'>Top Questions</div>
                <Content org={this.props.orgName} />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

Organization.propTypes = {
  admins: PropTypes.array,
  org: PropTypes.object,
  orgName: PropTypes.string.isRequired,
  teams: PropTypes.array,
  username: PropTypes.string,
};

Organization.defaultProps = {
  admins: [],
  teams: [],
  username: '',
};

export default Organization;
