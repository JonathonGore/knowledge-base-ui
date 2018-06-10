import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import CreateObj from '../components/general/create.js';
import Router from 'next/router';
import { Header, TwoPaneSplit } from '../components/general/display.js';
import { withRouter } from 'next/router';
import { getData, half } from '../util/util.js';
import '../styles.scss';

const ORGS_DESCRIPTION = 'Organizations allow you to organize questions in public or private for your company.';
const POPULAR_ORGS = 'Popular Organizations:';

const OrgsInfo = (props) => (
  <div className='org-info'>
    {ORGS_DESCRIPTION}
  </div>
);

class Organizations extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      orgs: [],
      create: props.router.query['create'] || false,
    };
  }

  onSubmit() {
    this.setState({create: false});
    this.fetchData();
    Router.push('/organizations');
  }

  fetchData() {
    const url = Config.serverURL + '/organizations';
    const success = (json) => {
      this.setState({
        orgs: JSON.parse(json)
      });
    };

    getData(url, success);
  }

  componentDidMount() {
    this.fetchData();
  }

  buildContent() {
    if (this.state.create) {
      return <CreateObj type='organizations' buttonText='Create Organization'
        placeholder='Create organization...' onSubmit={this.onSubmit}/>;
    }

    return (
      <div id='org-container' className='org-container'>
        <Header onClick={() => { Router.push('/organizations/create'); }}
          info={<OrgsInfo />} title='Organizations' buttonText='Create Organization'/>
        <TwoPaneSplit header={POPULAR_ORGS} type='organizations' left={half(this.state.orgs)} right={half(this.state.orgs, false)} />
      </div>
    );
  }

  render() {
    return (
      <PageLayout content={this.buildContent()} />
    );
  }
}

export default withRouter(Organizations);
