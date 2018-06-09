import React from 'react';
import { connect } from 'react-redux';
import Content from '../components/content/Content.js';
import PageLayout from '../components/content/PageLayout.js';
import '../styles.scss';

const buildContent = (inner) => (
  <div className='index-wrapper'>
    {inner}
  </div>
);

class Index extends React.Component {
  render() {
    console.log('Index props');
    console.log(this.props);

    return (
      <PageLayout content={buildContent(<Content />)} />
    );
  }
}

export default connect(({org}) => ({org}))(Index);
