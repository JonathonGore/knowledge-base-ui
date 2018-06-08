import PageLayout from '../components/content/PageLayout.js';
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

  buildContent() {
    return (
      <div className='profile-container'>
        Profile
      </div>
    );
  }

  render() {
    return (
      <PageLayout content={this.buildContent()} />
    );
	}
}

export default Profile;
