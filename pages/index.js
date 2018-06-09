import Content from '../components/content/Content.js';
import PageLayout from '../components/content/PageLayout.js';
import '../styles.scss';

const buildContent = (inner) => (
  <div className='index-wrapper'>
    {inner}
  </div>
);

const Index = (props) => (
  <PageLayout content={buildContent(<Content />)} />
);

export default Index;
