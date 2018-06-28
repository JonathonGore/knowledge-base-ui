import PageLayout from '../components/content/PageLayout.js';
import Button from '../components/misc/button.js';
import Config from '../config.js';
import Content from '../components/content/Content.js';
import CreateObj from '../components/general/create.js';
import DismissableAlert from '../components/alerts/DismissableAlert';
import OrgDisplay from '../components/organizations/OrgDisplay';
import TeamDisplay from '../components/teams/TeamDisplay';
import Settings from '../components/organizations/Settings';
import Router from 'next/router';
import React from 'react';
import { TwoPaneSplit } from '../components/general/display.js';
import { withRouter } from 'next/router';
import { postData, getData, half, getUsername } from '../util/util.js';
import '../styles.scss';

const TEAM_SUBTEXT = 'Teams allow you to manage your knowledge groups within an organization.';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);
    this.addOrgMember = this.addOrgMember.bind(this);

    this.state = {
      admins: [],
      teams: [],
      org: {},
      message: '',
      showSettings: false,
      username: '',
      create: props.router.query['create'] || false,
      orgName: props.router.query['org'] || false,
      teamName: props.router.query['team'] || false,
    };
  }

  onSubmit() {
    this.setState({
      create: false,
    });

    this.fetchData();
    Router.push('/organizations/' + this.state.orgName);
  }

  buildSettings() {
    // Only display the settings button if the logged in user is an admin
    if (this.state.username === '' || this.state.admins.length === 0 ||
      !this.state.admins.includes(this.state.username)) {
      return '';
    }

    return (
      <Button text={this.state.showSettings ? 'Go back' : 'Settings'}
        icon={this.state.showSettings ? '' : 'cog'}
        onClick={() => this.setState({showSettings: !this.state.showSettings})}/>
    );
  }

  fetchData() {
    // Only fetch the data we are displaying an organization
    if (!this.state.org) {
      return;
    }

    // Retrieve that data for the requested org (as specified in the url)
    const url = Config.serverURL + '/organizations/' + this.state.orgName;
    const orgSuccess = (json) => {
      const data = JSON.parse(json);
      this.setState({
        org: data
      });
    };

    getData(url, orgSuccess);

    // Retrieve the list of teams belonging to the specified org
    const teamsURL = url + '/teams';
    const success = (json) => {
      const data = JSON.parse(json);
      this.setState({
        teams: data
      });
    };

    getData(teamsURL, success);

    // Determine if the user is an admin
    const adminsURL = url + '/members?admin=true';
    const adminsSuccess = (json) => {
      const data = JSON.parse(json);
      this.setState({
        admins: data
      });
    };

    getData(adminsURL, adminsSuccess);
  }

  componentDidMount() {
    this.setState({
      username: getUsername(),
    });

    this.fetchData();
  }

  addOrgMember(name) {
    const url = Config.serverURL + '/organizations/' + this.state.orgName + '/members';
    const data = {
      username: name,
      admin: false,
    }

    const success = () => {
      this.setState({
        message: (
          <DismissableAlert title={`Successfully add ${name} to ${this.state.orgName}`}
            type='success'/>
        ),
      });
    };

    const failure = (json) => {
        const data = JSON.parse(json);
        this.setState({
          message: (
            <DismissableAlert title={`Unable to add ${name} to ${this.state.orgName}`}
              message={data.message} type='danger'/>
          ),
        });
    };

    postData(url, data, success, failure);
  }

  // Build content determines which type of display to use depending on the url
  buildContent() {
    if (this.state.create) {
      return (<CreateObj type={`organizations/${this.state.orgName}/teams`}
        subtext={TEAM_SUBTEXT}
        buttonText='Create Team' title='Create Team' onSubmit={this.onSubmit}/>);
    }

    if (this.state.orgName && this.state.teamName) {
      return (
        <TeamDisplay teamName={this.state.teamName} orgName={this.state.orgName}/>
      );
    }

    // TODO: We should limit the number of teams displayed for an org
    return (
      <div className='org-container'>
        <OrgDisplay admins={this.state.admins} username={this.state.username}
          settings={this.buildSettings()} org={this.state.org}>
          <div className='org-message-container'>
            {this.state.message}
          </div>
        </OrgDisplay>
        {
          this.state.showSettings ? (
            <Settings onSubmit={this.addOrgMember}/>
          ) : (
            <div>
              <TwoPaneSplit type={`organizations/${this.state.orgName}`}
                left={half(this.state.teams)} right={half(this.state.teams, false)} />
              <div className='org-top-questions'>
                <div className='org-questions-header'>Top Questions</div>
                <Content org={this.state.orgName} />
              </div>
            </div>
          )
        }
      </div>
    );
  }

  render() {
    return (
      <PageLayout>
        {this.buildContent()}
      </PageLayout>
    );
  }
}

export default withRouter(Teams);
