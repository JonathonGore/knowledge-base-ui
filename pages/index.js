import Content from '../components/content/Content.js';
import Config from '../config.js';
import PageLayout from '../components/content/PageLayout.js';
import { getData } from '../util/util.js';
import '../styles.scss';

class Index extends React.Component {
	constructor (props){
		super(props);
    this.requestPosts = this.requestPosts.bind(this);

    this.state = {
      posts: []
    };
	}

  requestPosts() {
		const url = Config.serverURL + '/questions';
		const onSucces = (json) => {
			var vals = JSON.parse(json);
			this.setState({posts: vals});
		}

		getData(url, onSucces);
  }

  componentDidMount() {
    this.requestPosts();
  }

  buildContent() {
    return (
      <Content posts={this.state.posts}/>
    );
  }

	render() {
		return (
      <PageLayout content={this.buildContent()} />
		);
	}
}


export default Index;
