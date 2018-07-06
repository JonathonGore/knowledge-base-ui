import PageLayout from '../components/content/PageLayout.js';
import CreateObj from '../components/general/create.js';
import OrgPage from '../components/organizations/Organizations.js';
import React from 'react';
import Router from 'next/router';
import { withRouter } from 'next/router';
import '../styles.scss';

const ORG_SUBTEXT = 'Organizations allow you to manage your knowledge in one convenient location.';

class Organizations extends React.Component {
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
      <OrgPage />
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
