import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import CreateObj from '../components/general/create.js';
import Organization from '../components/organizations/Organization';
import TeamDisplay from '../components/teams/TeamDisplay';
import Router from 'next/router';
import React from 'react';
import { withRouter } from 'next/router';
import { getAsync, getUsername } from '../util/util.js';
import '../styles.scss';

const TEAM_SUBTEXT = 'Teams allow you to manage your knowledge groups within an organization.';

class Teams extends React.Component {

  static async requestOrgData(org, options) {
    const orgURL = Config.serverURL + '/organizations/' + org;
    const teamsURL = orgURL + '/teams';
    const adminsURL = orgURL + '/members?admin=true';

    try {
      const orgRequest = getAsync(orgURL, { headers: options.headers });
      const teamsRequest = getAsync(teamsURL, { headers: options.headers });
      const adminsRequest = getAsync(adminsURL, { headers: options.headers });

      const [org, teams, admins] = await Promise.all([orgRequest, teamsRequest, adminsRequest]);

      return {
        username: options.username,
        admins: admins.data,
        org: org.data,
        teams: teams.data,
      }
    } catch (error) {
      console.error(`Received ${error} when requesting org data`);
    }

    return {
      username: options.username,
    }
  }

  static async requestTeamData(org, team, options) {
    const url = `${Config.serverURL}/organizations/${org}/teams/${team}`;
    try {
      const result = await getAsync(url, { headers: options.headers });
      return {
        username: options.username,
        team: result.data,
      }
    } catch (error) {
      console.error(`Received ${error} when requesting team`);
    }

    return {
      username: options.username,
    };
  }

  static async getInitialProps({ req }) {
    const username = req.cookies[Config.PUBLIC_COOKIE_NAME];
    const headers = {
        Cookie: `${Config.COOKIE_NAME}=${req.cookies[Config.COOKIE_NAME]}`,
    };

    const create = false;

    // The case where we are displaying a single team
    if (req.params.org && req.params.team) {
      return Teams.requestTeamData(req.params.org, req.params.team, {username, headers});
    } else if (req.params.org && create) {

    } else if (req.params.org) {
      return Teams.requestOrgData(req.params.org, {username, headers});
    }

    return {
      username,
    };
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      create: props.router.query['create'] || false,
      orgName: props.router.query['org'] || false,
      teamName: props.router.query['team'] || false,
    };
  }

  onSubmit() {
    this.setState({
      create: false,
    });

    Router.push('/organizations/' + this.state.orgName);
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
        <TeamDisplay team={this.props.team} teamName={this.state.teamName} orgName={this.state.orgName}/>
      );
    }

    // TODO: We should limit the number of teams displayed for an org
    return (
      <Organization org={this.props.org} orgName={this.state.orgName}
        username={this.props.username} teams={this.props.teams} admins={this.props.admins}/>
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
