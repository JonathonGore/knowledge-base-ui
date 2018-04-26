import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Config from '../config.json';
import FontAwesome from 'react-fontawesome';
import Logo from './misc/Logo.js';

class MenuPanel extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
        <span className="menu-panel">
          <div className="menu-header">
            <FontAwesome name='bars' className="menu-header-icon"/>
          </div>
          <div className="menu-panel-content">
            <Logo />
          </div>
        </span>
    );
	}
}

export default MenuPanel;
