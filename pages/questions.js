import PageLayout from '../components/content/PageLayout.js';
import Router from 'next/router';
import Index from './index.js';
import $ from 'jquery';
import Config from '../config.json';
import "../styles.scss";

class Questions extends React.Component {
  constructor(props) {
    super(props);
    this.requestQuestion = this.requestQuestion.bind(this);

    this.state = {
      id: props.url.query["id"] ? props.url.query["id"] : "",
      question: {}
    }
  }

  requestQuestion(id) {
    var self = this;

    $.ajax({
      type: "GET",
      url: Config.serverURL + "/question/" + id,
      xhrFields: {
        withCredentials: true
      },
      success: function(json) {
          var vals = JSON.parse(json);
          self.setState({question: vals});
      },
      error: function (xhr) {
        // TODO: Error handle
        console.log("Unable to retrieve question");
      }
    });
  }

  componentDidMount() {
    this.requestQuestion(this.state.id);
  }

  buildContent() {
    return (
      //<QuestionDisplay posts={this.state.posts}/>
      <div>
        Test 
      </div>
    );
  }

  render() {
    if (this.state.id === "") {
      return (<Index />);
    }

    return (
      <PageLayout content={this.buildContent()} />
    );
	}
}

export default Questions;
