import Router from 'next/router';
import Config from '../../config.js';
import Button from '../misc/button.js';
import { Header } from '../general/display';
import moment from 'moment';
import { getData } from '../../util/util.js';
import '../../styles.scss';

const DATE_FORMAT = 'MMM Do YYYY';


class OrgDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: props.name,
      members: 0,
      'created-on': '',
    }
  }

  onClick(e) {
    e.preventDefault();

    console.log('Clicked org display');
  }

  componentDidMount() {
    const url = Config.serverURL + '/organizations/' + this.state.name;
    const updateState = (json) => {
      const data = JSON.parse(json);
      this.setState({
        ...data
      });
    }

    getData(url, updateState);
  }

  render() {
    return (
      <div className='org-display'>
        <Header onClick={() => { Router.push('/organizations/' + this.state.name + '/create') }}
          title={this.state.name} buttonText={'Create Team'}/>
        <div className='org-display-stats'>
          <span className='org-display-members'>Members: {this.state.members}</span>
          <span className='org-display-dob'>Created On: {moment(this.state['created-on']).format(DATE_FORMAT)}</span>
        </div>
      </div>
    );
	}
}

export default OrgDisplay;
