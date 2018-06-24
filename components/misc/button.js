import FontAwesome from 'react-fontawesome';
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
        <span className='kb-btn-text'>
          {
            this.props.icon ? (
              <span className='btn-icon-container'>
                <FontAwesome name={this.props.icon} className="menu-header-icon"/>
              </span>
            ) : ''
          }
          {this.props.text}
        </span>
      </button>
    );
  }
}

Button.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  style: PropTypes.string,
  onClick: PropTypes.func
};

Button.defaultProps = {
  icon: '',
  text: 'Click me',
  style: 'default',
  onClick: () => { console.log('Clicked'); }
};

export default Button;
