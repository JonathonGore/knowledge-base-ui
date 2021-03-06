import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import React from 'react';
import './button.scss';

const classTypes = {
  'alt-primary': 'kb-alt-primary',
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
      <button className={`kb-btn ${this.state.style} ${this.props.className}`} onClick={this.props.onClick} type='button'>
        <span className='kb-btn-text'>
          {
            this.props.icon ? (
              <span className='btn-icon-container'>
                <FontAwesome name={this.props.icon} className='menu-header-icon'/>
              </span>
            ) : ''
          }
          {this.props.text || this.props.children}
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
  style: 'default',
  text: 'click me',
  onClick: () => { console.log('Clicked'); }
};

export default Button;
