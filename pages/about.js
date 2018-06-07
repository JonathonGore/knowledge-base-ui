import PageLayout from '../components/content/PageLayout.js';
import '../styles.scss';



const About = (props) => (
  <div className='about-page-container'>
    Knowledge-Base
  </div>
);


const AboutPage = (props) => (
  <PageLayout content={<About />} />
);


export default AboutPage;
