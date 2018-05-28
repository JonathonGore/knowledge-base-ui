import Router from 'next/router';
import Config from '../../config.json';
import { withRouter } from 'next/router';
import { getData } from '../../util/util.js';
import '../../styles.scss';

const noAnswerText = 'This question has no answer yet.';

class QuestionDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.failed = this.failed.bind(this);

    this.state = {
      id: props.router.query['id'],
      title: '',
      username: '',
      upvotes: 0,
      views: 0,
      answers: 0,
      content: '',
      'submitted-on': ''
    }
  }

  componentDidMount() {
    const url = Config.serverURL + '/questions/' + this.state.id;
    getData(url, this.updateState, this.failed);
  }

  updateState(json) {
    const data = JSON.parse(json);
    this.setState({ ...data });
  }

  buildAnswerSection() {
    if (this.state.answers === 0) {
      return (
        <div className='question-no-answer'>{noAnswerText}</div>
      );
    }

    return <div></div>
  }

  failed() {
    console.log(`Failed to get data for id ${this.state.id}`);
  }

  render() {
    return (
      <div className='question-container'>
        <div className='question-content'>
          <div className='question-title'>{this.state.title}</div>
          <div className='question-body'>{this.state.content}</div>
          <div className='question-info'>
            <span className='question-info-margin question-views'>
              Views: {this.state.views}
            </span>
            <span className='question-info-margin question-author'>
              Authored by: {this.state.username}
            </span>
          </div>
          <div className='answers-section'>
            <div className='question-answers-header'>
              Answers
            </div>
            <div className='question-answers'>
              {this.buildAnswerSection()}
            </div>
          </div>
        </div>
      </div>
    );
	}
}

export default withRouter(QuestionDisplay);
