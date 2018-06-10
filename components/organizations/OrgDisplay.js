import Router from 'next/router';
import Config from '../../config.js';
import Button from '../misc/button.js';
import { Header } from '../general/display';
import moment from 'moment';
import { getData } from '../../util/util.js';
import '../../styles.scss';

const DATE_FORMAT = 'MMM Do YYYY';

const Stats = (props) => (
  <div className='org-display-stats'>
    <div className='org-display-members'>Members: {props.members}</div>
    <div className='org-display-dob'>Created On: {moment(props.createdOn).format(DATE_FORMAT)}</div>
  </div>
);

class OrgDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  onClick(e) {
    e.preventDefault();

    console.log('Clicked org display');
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
  }

  render() {
    return (
      <div className='org-display'>
        <Header onClick={() => { Router.push('/organizations/' + this.props.name + '/create'); }}
          info={<Stats createdOn={this.props.createdOn} members={this.props.members}/>}
          title={this.props.name} buttonText={'Create Team'}/>
      </div>
    );
  }
}

export default OrgDisplay;
