import Content from '../components/content/Content.js';
import LandingPage from '../components/landing/LandingPage.js';
import PageLayout from '../components/content/PageLayout.js';
import PropTypes from 'prop-types';
import { withRouter } from 'next/router';
import '../styles.scss';

const Index = (props) => {
  console.log(props.router.query);

  return(props.router.query.loggedIn ? (
    <PageLayout>
      <Content className='index-wrapper' />
    </PageLayout>
  ) : (
    <LandingPage />
  ));
};

export default withRouter(Index);
