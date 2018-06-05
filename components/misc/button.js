import PropTypes from 'prop-types';

const Button = (props) => (
  <button className='kb-btn' onClick={props.onClick} type='button'>
    {props.text}
  </button>
);

Button.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: 'Click me',
  onClick: () => { console.log('Clicked'); }
};

export default Button;
