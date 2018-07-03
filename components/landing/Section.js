import PropTypes from 'prop-types';
import './section.scss';

const Description = (props) => (
  <div className='section-description-container'>
    <div className='section-header'>
      {props.headerText}
    </div>
    <div className='section-header-content'>
      {props.content}
    </div>
  </div>
);

Description.propTypes = {
  headerText: PropTypes.string,
  content: PropTypes.string,
}

const Section = (props) => (
  <section>
    <div className='landing-container'>
      <span className='section-text'>
        <Description headerText={props.title}/>
      </span>
      <img className='section-img' src={props.img} alt='team' />
    </div>
  </section>
);

Section.propTypes = {
  img: PropTypes.string,
  title: PropTypes.string,
}

export default Section;
