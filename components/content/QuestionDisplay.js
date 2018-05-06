import PageLayout from '../components/content/PageLayout.js';
import Router from 'next/router';
import Index from './index.js';
import "../styles.scss";

class QuestionDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.getString(props.id),
      title: this.getString(props.title),
      username: this.getString(props.username),
      submittedOn: this.getString(props.submittedOn),
      upvotes: this.getInt(props.upvotes),
      views: this.getInt(props.views),
      answers: this.getInt(props.answers),
      content: this.getString(props.content)
    }
  }

  getInt(obj) {
    return (obj === undefined) ? 0 : obj;
  }

  getString(obj) {
    return (obj === undefined) ? "" : obj;
  }

  render() {
    return (
      <div className="question-container">
        <div className="question-title">{this.state.title}</div>
      </div>
    );
	}
}

export default QuestionDisplay;
