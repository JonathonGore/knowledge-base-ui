import React from 'react';
import FontAwesome from 'react-fontawesome';

class Logo extends React.Component {
  constructor(props) {
    super(props);
    this.buildStyle = this.buildStyle.bind(this);

    this.state = {
      color: "white",
      size: 16
    }
  }

  buildStyle(color, size) {
    var style =  {
      color: color,
      size: size + "px"
    };

    return style;
  }

  render() {
    return (
      <div className="logo-container" style={this.buildStyle(this.state.color, this.state.size)}>
        <FontAwesome name='database' />
        <span className="logo-text"> Knowledge-Base</span>
      </div>
    );
	}
}

export default Logo;
