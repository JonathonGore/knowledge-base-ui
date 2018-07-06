import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import CreateObj from '../components/general/create.js';
import Organization from '../components/organizations/Organization';
import TeamDisplay from '../components/teams/TeamDisplay';
import Router from 'next/router';
import React from 'react';
import { withRouter } from 'next/router';
import { getData, getUsername } from '../util/util.js';
import '../styles.scss';

const TEAM_SUBTEXT = 'Teams allow you to manage your knowledge groups within an organization.';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      admins: [],
      teams: [],
      org: {},
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
      return (
        <CreateObj type={`organizations/${this.state.orgName}/teams`}
          subtext={TEAM_SUBTEXT}
          buttonText='Create Team' title='Create Team' onSubmit={this.onSubmit}/>
      );
    }

    if (this.state.orgName && this.state.teamName) {
      return (
        <TeamDisplay teamName={this.state.teamName} orgName={this.state.orgName}/>
      );
    }

    // TODO: We should limit the number of teams displayed for an org
    return (
      <Organization org={this.state.org} orgName={this.state.orgName}
        username={this.state.username} teams={this.state.teams} admins={this.state.admins}/>
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
