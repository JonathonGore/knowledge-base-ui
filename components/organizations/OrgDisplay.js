import Router from 'next/router';
import Config from '../../config.js';
import Button from '../misc/button.js';
import moment from 'moment';
import { Header } from '../general/display';
import { getData, getUsername } from '../../util/util.js';
import '../../styles.scss';

const DATE_FORMAT = 'MMM Do YYYY';

const Stats = (props) => (
  <div className='org-display-stats'>
    <span className='org-display-dob'>Organization Since: {moment(props.createdOn).format(DATE_FORMAT)}</span>
    <span className='org-display-members'>Members: {props.members}</span>
  </div>
);

class OrgDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      settings: '',
      admins: [],
    };
  }

  buildSettings() {
    // Only display the settings button if the logged in user is an admin
    const username = getUsername();

    if (username === '' || this.state.admins.length === 0 ||
      !this.state.admins.includes(username)) {
      return;
    }

    this.setState({
      settings: <Button text='Settings' icon='cog'/>
    });
  }

  onClick(e) {
    e.preventDefault();
  }

  componentDidMount() {
    const url = Config.serverURL + '/organizations/' + this.props.name;
    const updateState = (json) => {
      const data = JSON.parse(json);
      this.setState({
        ...data
      });
    };

    getData(url, updateState);

    // Determine if the user is an admin
    const adminsURL = url + '/members?admin=true';
    const adminsSuccess = (json) => {
      const data = JSON.parse(json);
      this.setState({
          admins: data
      });

      this.buildSettings();
    };

    getData(adminsURL, adminsSuccess);
  }

  render() {
    return (
      <div className='org-display'>
        <Header onClick={() => { Router.push('/organizations/' + this.props.name + '/create'); }}
          info={<Stats createdOn={this.props.createdOn} members={this.props.members}/>}
          title={this.props.name} buttonText={'Create Team'} settings={this.state.settings}/>
      </div>
    );
  }
}

export default OrgDisplay;
