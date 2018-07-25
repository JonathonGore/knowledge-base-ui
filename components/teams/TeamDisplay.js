import Button from '../misc/Button.js';
import Config from '../../config.js';
import Content from '../content/Content.js';
import Router from 'next/router';
import Settings from './Settings';
import Stats from './Stats';
import { Header, TwoPaneSplit } from '../general/display.js';
import '../../styles.scss';

class TeamDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  buildStats = (createdOn, members) => (
    <Stats createdOn={createdOn} members={members}/>
  )

  render() {
    return (
      <div className='team-display'>
        <Header info={this.buildStats(this.props.team.createdOn, this.props.team['member-count'])}
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
