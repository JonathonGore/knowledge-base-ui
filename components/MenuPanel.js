import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Config from '../config.json';
import FontAwesome from 'react-fontawesome';
import Logo from './misc/Logo.js';

class MenuPanel extends React.Component {
  constructor(props) {
    super(props);
    this.toggleMenu = this.toggleMenu.bind(this);

    this.state = {
      size: 24,
      collapsed: false,
      onToggle: props.onToggle
    }
  }

  toggleMenu(e) {
      this.setState({ collapsed: !this.state.collapsed })
      if (this.state.onToggle) {
        this.state.onToggle();
      }
  }

  buildCollapsedMenu() {
    return (
      <span className="collapsed-menu-panel menu-panel">
        <div onClick={this.toggleMenu} className="menu-collapse-btn">
          <FontAwesome name='bars' className="menu-header-icon"/>
        </div>
      </span>
    );
  }

  render() {
    if (this.state.collapsed) {
      return this.buildCollapsedMenu();
    }

    return (
        <span className="menu-panel-displayed menu-panel" >
          <div className="menu-header">
              <div onClick={this.toggleMenu} className="menu-collapse-btn">
                <FontAwesome name='bars' className="menu-header-icon"/>
              </div>
          </div>
          <div className="menu-panel-content">
            <Logo size={this.state.size}/>
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
