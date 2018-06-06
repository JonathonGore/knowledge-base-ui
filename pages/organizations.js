import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import CreateOrg from '../components/organizations/CreateOrg.js';
import Button from '../components/misc/button.js';
import Router from 'next/router';
import moment from 'moment';
import { withRouter } from 'next/router';
import { getData } from '../util/util.js';
import '../styles.scss';

// Computes either the first or second half of the array
const half = (arr, first=true) => {
  let i = 0;
  let end = Math.ceil(arr.length / 2);
  if (!first) {
    i = end;
    end = arr.length;
  }

  const result = [];
  for (; i < end; i++) {
    result.push(arr[i]);
  }

  return result;
}

const OrgHeader = (props) => (
  <div className='org-header'>
    <div className='org-tab'>Organizations</div>
    <span className='org-btn-container'>
      <Button text='Create Organization' onClick={props.onClick}/>
    </span>
  </div>
);

const DATE_FORMAT = 'MMM Do YYYY';

const OrgPreview = (props) => (
  <div className='org-preview'>
    <div className='org-preview-name'>{props.name}</div>
    <div className='org-preview-stats'>
      <span className='org-preview-members'>Members: {props.members}</span>
      <span className='org-preview-dob'>Created On: {moment(props['created-on']).format(DATE_FORMAT)}</span>
    </div>
  </div>
);

const OrgPanel = (props) => (
  <div className='org-panel'>
    {
      props.orgs.map(org =>
        <OrgPreview key={org.id} {...org}/>
      )
    }
  </div>
);

const OrgDisplay = (props) => (
  <div className='org-display'>
    <OrgPanel orgs={half(props.orgs)}/>
    <OrgPanel orgs={half(props.orgs, false)}/>
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
    this.setState({
      create: false,
    });

    this.fetchData();
    Router.push('/organizations');
  }

  fetchData() {
    const url = Config.serverURL + '/organizations';
    const success = (json) => {
      const data = JSON.parse(json);
      this.setState({
        orgs: data
      });
    };

    getData(url, success);
  }

  componentDidMount() {
    this.fetchData();
  }

  buildContent() {
    if (this.state.create) {
        return <CreateOrg onSubmit={this.onSubmit}/>;
    }

    return (
      <div className='org-container'>
        <OrgHeader onClick={() => { Router.push('/organizations/create') }}/>
        <OrgDisplay orgs={this.state.orgs} />
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
