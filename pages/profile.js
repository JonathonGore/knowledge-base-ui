import PageLayout from '../components/content/PageLayout.js';
import Content from '../components/content/Content.js';
import Config from '../config.js';
import { getData } from '../util/util.js';
import '../styles.scss';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.fetchData = this.fetchData.bind(this);

    this.state = {};
  }

  fetchData() {
    const url = Config.serverURL + '/profile';
    const success = (json) => {
      const data = JSON.parse(json);
      this.setState({
        ...data
      });
    };

    getData(url, success);
  }

  componentDidMount() {
    this.fetchData();
  }

  buildContent = () => (
    <div className='profile-container'>
      <div className='profile-header'>
        <div className='profile-username'>
          {this.state.username}
        </div>
      </div>
      {
        this.state.id ? (
          <div className='profile-questions'>
            <div className='profile-questions-header'>
              Top Questions
            </div>
            <Content user={this.state.id} />
          </div>
        ) : ''
      }
    </div>
  );

  render() {
    return (
      <PageLayout content={this.buildContent()} />
    );
	}
}

export default Profile;
