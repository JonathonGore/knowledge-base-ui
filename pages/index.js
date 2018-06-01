import Content from '../components/content/Content.js';
import Config from '../config.js';
import PageLayout from '../components/content/PageLayout.js';
import $ from 'jquery';
import "../styles.scss";

class Index extends React.Component {
	constructor (props){
		super(props);
    this.requestPosts = this.requestPosts.bind(this);

    this.state = {
      posts: []
    };
	}

  requestPosts() {
    var self = this;

    $.ajax({
      type: "GET",
      url: Config.serverURL + "/questions",
      xhrFields: {
        withCredentials: true
      },
      success: function(json) {
          var vals = JSON.parse(json);
          self.setState({posts: vals});
      },
      error: function (xhr) {
        // TODO: Error handle
        console.log("Unable to retrieve posts");
      }
    });
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
