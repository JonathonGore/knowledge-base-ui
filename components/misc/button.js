import PropTypes from 'prop-types';
import React from 'react';

const classTypes = {
  'primary': 'kb-primary',
  'default': 'kb-default',
};

class Button extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      style: classTypes[props.style]
    };
  }

  render() {
    return (
      <button className={`kb-btn ${this.state.style}`} onClick={this.props.onClick} type='button'>
        {this.props.text}
      </button>
    );
  }
}

Button.propTypes = {
  text: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  text: 'Click me',
  style: 'default',
  onClick: () => { console.log('Clicked'); }
};

export default Button;
