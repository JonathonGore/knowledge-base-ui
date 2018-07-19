import PropTypes from 'prop-types';
import react from 'react';
import './split.scss';

const Description = (props) => (
  <div className='image-split-description-container'>
    <div className='image-split-header'>
      {props.headerText}
    </div>
    <div className='image-split-content'>
      {props.content}
    </div>
  </div>
);

Description.propTypes = {
  headerText: PropTypes.string,
  content: PropTypes.string,
};

const ImageSplit = (props) => (
  <div className='image-split-container'>
    <span className='image-split-text'>
      <Description content={props.content} headerText={props.title}/>
    </span>
    <img className='image-split-img' src={props.img} alt='team' />
  </div>
);

ImageSplit.propTypes = {
  content: PropTypes.string,
  img: PropTypes.string,
  title: PropTypes.string,
};

export default ImageSplit;
