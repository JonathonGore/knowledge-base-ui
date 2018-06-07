import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import CreateObj from '../components/general/create.js';
import OrgDisplay from '../components/organizations/OrgDisplay';
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
      create: props.router.query['create'] || false,
      org: props.router.query['org'],
    };
  }

  onSubmit() {
    this.setState({
      create: false,
    });

    this.fetchData();
    Router.push('/organizations/' + this.state.org);
  }

  fetchData() {
    if (!this.state.org) {
      return;
    }

    const url = Config.serverURL + '/organizations/' + this.state.org + '/teams';
    const success = (json) => {
      const data = JSON.parse(json);
      this.setState({
        teams: data
      });
    };

    getData(url, success);
  }

  componentDidMount() {
    this.fetchData();
  }

  buildContent() {
    if (this.state.create) {
        return (<CreateObj type={`organizations/${this.state.org}/teams`}
          buttonText='Create Team' placeholder='Create team...' onSubmit={this.onSubmit}/>);
    }

    return (
      <div className='org-container'>
        <OrgDisplay name={this.state.org}/>
        <TwoPaneSplit type='teams' left={half(this.state.teams)} right={half(this.state.teams, false)} />
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
