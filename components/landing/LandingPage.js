import Meta from '../Meta';
import Navbar from './Navbar';
import Section from './Section';
import Split from './ImageSplit';

const TEAM_TEXT =  'Increase your teams efficiency';
const TEAM_DESC = 'Knowledge-base can greatly reduce the amount of time taken to find information within your organization';

const ORG_TEXT = 'Organize your projects';
const ORG_CONTENT = 'Knowledge-base lets you organize information about your project in one convenient location';

const LandingPage = (props) => (
  <div>
    <Meta />
    <Navbar />
    <Section>
      <Split title={TEAM_TEXT} content={TEAM_DESC} img='static/img/team.png' />
    </Section>
    <Section>
      <Split title={ORG_TEXT} content={ORG_CONTENT} img='static/img/organize.png' />
    </Section>
  </div>
);

export default LandingPage;
