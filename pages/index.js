import Layout from '../components/Layout.js';
import BasicLayout from '../components/BasicLayout.js';
import Link from 'next/link';
import Content from '../components/content/Content.js';
import Config from '../config.json';
import MenuPanel from '../components/MenuPanel.js';
import { Form } from 'react-bootstrap';
import $ from 'jquery';
import "../styles.scss";

class Index extends React.Component {
	constructor (props){
		super(props);
    this.requestPosts = this.requestPosts.bind(this);

    this.state = {posts: []}
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
          console.log(vals);
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

	render() {
		return (
			<BasicLayout>
        <div className="main-container">
          <MenuPanel />
          <Content posts={this.state.posts}/>
        </div>
			</BasicLayout>
		);
	}
}


export default Index;
