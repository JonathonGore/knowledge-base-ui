import PropTypes from 'prop-types';
import react from 'react';
import './section.scss';

const Section = (props) => (
  <section id={props.id}>
    <div className='landing-container'>
    {
      props.children
    }
    </div>
  </section>
);

Section.propTypes = {
  id: PropTypes.string,
}

export default Section;
