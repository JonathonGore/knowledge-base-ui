import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Config from '../config.json';
import FontAwesome from 'react-fontawesome';
import Logo from './misc/Logo.js';

class MenuPanel extends React.Component {
  constructor(props) {
    super(props);

    this.size = 24;
  }

  render() {
    return (
        <span className="menu-panel">
          <div className="menu-header">
            <FontAwesome name='bars' className="menu-header-icon"/>
          </div>
          <div className="menu-panel-content">
            <Logo size={this.size}/>
            <div className="menu-items">
                <div className="menu-item"><FontAwesome name='home' /> Home</div>
                <div className="menu-item"><FontAwesome name='user' /> Profile</div>
                <div className="menu-item"><FontAwesome name='info-circle' /> About</div>
            </div>
          </div>
        </span>
    );
	}
}

export default MenuPanel;
