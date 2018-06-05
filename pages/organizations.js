import PageLayout from '../components/content/PageLayout.js';
import Config from '../config.js';
import Button from '../components/misc/button.js';
import Router from 'next/router';
import { getData } from '../util/util.js';
import '../styles.scss';

const OrgHeader = (props) => (
  <div className='org-header'>
    <span className='org-tab'>Organizations</span>
    <span className='org-btn-container'>
      <Button text='Create Organization' onClick={props.onClick}/>
    </span>
  </div>
);

const OrgPreview = (props) => (
  <div className='org-preview'>
    <div className='org-preview-name'>{props.name}</div>
    <div className='org-preview-stats'>
      <span className='org-preview-members'>Members: {props.members}</span>
      <span className='org-preview-dob'>Created On: {props['created-on']}</span>
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
    <OrgPanel orgs={props.orgs.splice(0, Math.ceil(props.orgs.length / 2))}/>
    <OrgPanel orgs={props.orgs.splice(Math.ceil(props.orgs.length / 2), props.orgs.length)}/>
  </div>
);

class Organizations extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      orgs: [],
    };
  }

  componentDidMount() {
    const url = Config.serverURL + '/organizations';
    const success = (json) => {
      const data = JSON.parse(json);
      this.setState({
        orgs: data
      });
    };

    getData(url, success);
  }

  buildContent() {
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

export default Organizations;
