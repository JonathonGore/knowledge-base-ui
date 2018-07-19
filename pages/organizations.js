import Config from '../config.js';
import CreateObj from '../components/general/create.js';
import OrgPage from '../components/organizations/Organizations.js';
import PageLayout from '../components/content/PageLayout.js';
import React from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import { getAsync } from '../util/util.js';
import '../styles.scss';

const ORG_SUBTEXT = 'Organizations allow you to manage your knowledge in one convenient location.';

class Organizations extends React.Component {
  static async getInitialProps({ req }) {
    const username = req.cookies[Config.PUBLIC_COOKIE_NAME];
    const url = Config.serverURL + '/organizations?username=' + username;

    try {
      const options =  {
        headers: {
          Cookie: `${Config.COOKIE_NAME}=${req.cookies[Config.COOKIE_NAME]}`,
        },
      }
      const orgsResponse = await getAsync(url, options);

      return {
        orgs: orgsResponse.data,
      };
    } catch (error) {
      console.error(`Received ${error} when requesting question`);
    }

    return {orgs: []};
  }

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = {
      create: props.router.query['create'] || false,
    };
  }

  onSubmit(name) {
    // Once new org is created redirect user to the orgs page.
    Router.push(`/organizations/${name}`);
  }

  buildContent() {
    if (this.state.create) {
      return <CreateObj title='Create Organization' type='organizations' buttonText='Create Organization'
        onSubmit={this.onSubmit} subtext={ORG_SUBTEXT}/>;
    }

    return (
      <OrgPage orgs={this.props.orgs}/>
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

export default withRouter(Organizations);
