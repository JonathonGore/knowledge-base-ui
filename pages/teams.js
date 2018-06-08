import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import CreateObj from '../components/general/create.js';
import OrgDisplay from '../components/organizations/OrgDisplay';
import TeamDisplay from '../components/teams/TeamDisplay';
import Router from 'next/router';
import { Header, TwoPaneSplit } from '../components/general/display.js';
import { withRouter } from 'next/router';
import { getData, half } from '../util/util.js';
import '../styles.scss';

class Teams extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      teams: [],
      org: {},
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
    if (!this.state.org) {
      return;
    }

    const url = Config.serverURL + '/organizations/' + this.state.orgName;
    const orgSuccess = (json) => {
      const data = JSON.parse(json);
      this.setState({
        org: data
      });
    };

    getData(url, orgSuccess);

    const teamsURL = url + '/teams';
    const success = (json) => {
      const data = JSON.parse(json);
      this.setState({
        teams: data
      });
    };

    getData(teamsURL, success);
  }

  componentDidMount() {
    this.fetchData();
  }

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

    return (
      <div className='org-container'>
        <OrgDisplay createdOn={this.state.org['created-on']} members={this.state.org['member-count']} name={this.state.orgName}/>
        <TwoPaneSplit type={`organizations/${this.state.orgName}`} left={half(this.state.teams)} right={half(this.state.teams, false)} />
      </div>
    );
  }

  render() {
    return (
      <PageLayout content={this.buildContent()} />
    );
	}
}

export default withRouter(Teams);
