import PageLayout from '../components/content/PageLayout.js';
import Button from '../components/misc/button.js';
import Config from '../config.js';
import Content from '../components/content/Content.js';
import CreateObj from '../components/general/create.js';
import OrgDisplay from '../components/organizations/OrgDisplay';
import TeamDisplay from '../components/teams/TeamDisplay';
import Settings from '../components/organizations/Settings';
import Router from 'next/router';
import React from 'react';
import { TwoPaneSplit } from '../components/general/display.js';
import { withRouter } from 'next/router';
import { getData, half, getUsername } from '../util/util.js';
import '../styles.scss';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      admins: [],
      teams: [],
      org: {},
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

  // Build content determines which type of display to use depending on the url
  buildContent() {
    if (this.state.create) {
      return (<CreateObj type={`organizations/${this.state.orgName}/teams`}
        buttonText='Create Team' placeholder='Create team...' onSubmit={this.onSubmit}/>);
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
          settings={this.buildSettings()} org={this.state.org}/>
        {
          this.state.showSettings ? (
            <Settings />
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
