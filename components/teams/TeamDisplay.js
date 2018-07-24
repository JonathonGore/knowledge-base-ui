import Button from '../misc/Button.js';
import Config from '../../config.js';
import Content from '../content/Content.js';
import Router from 'next/router';
import Settings from './Settings';
import Stats from './Stats';
import { postData, half } from '../../util/util.js';
import { Header, TwoPaneSplit } from '../general/display.js';
import { getData } from '../../util/util.js';
import '../../styles.scss';

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
      console.log(data);
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
        {
          this.state.showSettings ? (
            <Settings onSubmit={this.addOrgMember}/>
          ) : (
            <div>
              <div className='org-top-questions'>
                <div className='org-questions-header'>Top Questions</div>
                <Content org={this.props.orgName} />
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default TeamDisplay;
