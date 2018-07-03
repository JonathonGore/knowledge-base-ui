import Meta from '../Meta';
import Navbar from './Navbar';
import Section from './Section';

const TEAM_TEXT =  `Increase your teams efficiency.`;

const LandingPage = (props) => (
  <div>
    <Meta />
    <Navbar />
    <Section title={TEAM_TEXT} img='static/img/team.png' />
    <Section title={TEAM_TEXT} img='static/img/team.png' />
  </div>
);

export default LandingPage;
