import Router from 'next/router';
import Config from '../../config.js';
import Button from '../misc/Button.js';
import { Header } from '../general/display';
import moment from 'moment';
import { getData } from '../../util/util.js';
import '../../styles.scss';

const DATE_FORMAT = 'MMM Do YYYY';

const Stats = (props) => (
  <div className='team-display-stats'>
    <div className='team-display-members'>Members: {props.members}</div>
    <div className='team-display-dob'>Created On: {moment(props.createdOn).format(DATE_FORMAT)}</div>
  </div>
);

class TeamDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onClick(e) {
    e.preventDefault();

    console.log('Clicked team display');
  }

  componentDidMount() {
    const url = Config.serverURL + '/organizations/' + this.props.orgName + '/teams/' + this.props.teamName;
    const updateState = (json) => {
      const data = JSON.parse(json);
      this.setState({
        ...data
      });
    };

    getData(url, updateState);
  }

  render() {
    return (
      <div className='team-display'>
        <Header info={<Stats createdOn={this.state.createdOn} members={this.state.members}/>}
          title={this.props.teamName} noButton/>
      </div>
    );
  }
}

export default TeamDisplay;
