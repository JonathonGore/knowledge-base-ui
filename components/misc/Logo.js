import React from 'react';
import FontAwesome from 'react-fontawesome';

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.buildStyle = this.buildStyle.bind(this);
    this.buildClassName = this.buildClassName.bind(this);


    this.state = {
      color: props.color ? props.color : "white",
      size: props.size ? props.size : 16,
      inline: props.inline ? props.inline : false
    }
  }

  buildClassName() {
    var cname = "logo-container";

    if (this.props.inline) {
      cname = cname + " inline";
    }

    return cname;
  }

  buildStyle(color, size) {
    var style =  {
      'color': color,
      'fontSize': size + "px"
    };

    return style;
  }

  render() {
    return (
      <div className={this.buildClassName()} style={this.buildStyle(this.state.color, this.state.size)}>
        <FontAwesome name='database' />
        <span className="logo-text"> Knowledge-Base</span>
      </div>
    );
	}
}

export default Logo;
