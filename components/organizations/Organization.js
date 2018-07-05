import Config from '../../config.js';
import React from 'react';
import Router from 'next/router';
import { Header, TwoPaneSplit } from '../general/display.js';
import { getData, getUsername, half } from '../../util/util.js';
import '../../styles.scss';

const ORGS_DESCRIPTION = 'Organizations allow you to organize questions in public or private for your company.';
const POPULAR_ORGS = 'Your Organizations:';

const OrgsInfo = () => (
  <div className='org-info'>
    {ORGS_DESCRIPTION}
  </div>
);

class OrganizationPage extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);

    this.state = {
      orgs: [],
    };
  }

  fetchData(username) {
    if (!username) {
      return;
    }

    const url = Config.serverURL + '/organizations?username=' + username;
    const success = (json) => {
      this.setState({
        orgs: JSON.parse(json)
      });
    };

    getData(url, success);
  }

  componentDidMount() {
    const username = getUsername();

    this.fetchData(username);
  }

  render() {
    return (
      <div id='org-container' className='org-container'>
        <Header onClick={() => { Router.push('/organizations/create'); }}
          info={<OrgsInfo />} title='Organizations' buttonText='Create Organization'/>
        <TwoPaneSplit header={POPULAR_ORGS} type='organizations'
          left={half(this.state.orgs)} right={half(this.state.orgs, false)} />
      </div>
    );
  }
}

export default OrganizationPage;
