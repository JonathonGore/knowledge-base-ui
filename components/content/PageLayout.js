import BasicLayoutLegacy from '../BasicLayoutLegacy.js';
import Config from '../../config.js';
import KBNavbar from '../navbar/Navbar.js';
import React from 'react';
import { getUsername, getData } from '../../util/util.js';
import '../../styles.scss';

class PageLayout extends React.Component {
  constructor (props){
    super(props);
    this.logout = this.logout.bind(this);

    this.state = {
      username: '',
      isLoggedIn: false,
      orgs: [],
    };
  }

  logout() {
    this.setState({ isLoggedIn: false });
  }

  componentDidMount() {
    const uname = getUsername();

    this.setState({
      username: uname,
      isLoggedIn: uname !== '',
    });

    if (uname) {
      const url = Config.serverURL + '/profile';
      const onSuccess = (json) => {
        this.setState({
          orgs: JSON.parse(json).organizations.map(org => ({name: org}))
        });
      };

      getData(url, onSuccess);
    }
  }

  render() {
    return (
      <BasicLayoutLegacy>
        <div className={'main-container ' + this.props.className}>
          <div className={'full-width'} >
            <KBNavbar orgs={this.state.orgs} username={this.state.username}
              isLoggedIn={this.state.isLoggedIn} onLogout={this.logout}/>
            <div className='main-container-content'>
              {this.props.content || this.props.children}
            </div>
          </div>
        </div>
      </BasicLayoutLegacy>
    );
  }
}

export default PageLayout;
