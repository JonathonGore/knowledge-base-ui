import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.buildStyle = this.buildStyle.bind(this);
    this.buildClassName = this.buildClassName.bind(this);


    this.state = {
      className: props.className || '',
      hoverColor: props.hoverColor || 'white',
      color:  props.color || 'white',
      size: props.size || 16,
      inline: props.inline || false
    };
  }

  onClick = () => {
    // Again used because of miss understanding of next will try to figure it out
    window.location.replace('/');
  }

  buildClassName() {
    var cname = 'logo-container ' + this.state.className;

    if (this.props.inline) {
      cname = cname + ' inline';
    }

    return cname;
  }

  buildStyle(hoverColor, color, size) {
    var style =  {
      'color': color,
      'fontSize': (size === 'inherit') ? size : size + 'px'
    };

    return style;
  }

  render() {
    return (
      <div className={this.buildClassName()} style={this.buildStyle(this.state.hoverColor, this.state.color, this.state.size)}>
        <a onClick={this.onClick} className='logo-link'>
          <FontAwesome name='database' />
          <span className='logo-text'> Knowledge-Base</span>
        </a>
      </div>
    );
  }
}

export default Logo;
