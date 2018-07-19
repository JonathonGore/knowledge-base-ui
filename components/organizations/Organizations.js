import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import { Header, TwoPaneSplit } from '../general/display.js';
import { half } from '../../util/util.js';
import '../../styles.scss';

const ORGS_DESCRIPTION = 'Organizations allow you to organize questions in public or private for your company.';
const POPULAR_ORGS = 'Your Organizations:';

const OrgsInfo = () => (
  <div className='org-info'>
    {ORGS_DESCRIPTION}
  </div>
);

class Organizations extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div id='org-container' className='org-container'>
        <Header onClick={() => { Router.push('/organizations/create'); }}
          info={<OrgsInfo />} title='Organizations' buttonText='Create Organization'/>
        <TwoPaneSplit header={POPULAR_ORGS} type='organizations'
          left={half(this.props.orgs)} right={half(this.props.orgs, false)} />
      </div>
    );
  }
}

Organizations.propTypes = {
  orgs: PropTypes.array,
};

Organizations.defaultProps = {
  orgs: [],
};

export default Organizations;
