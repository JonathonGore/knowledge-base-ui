import Router from 'next/router';
import Config from '../../../config.json';
import SubmitText from '../../misc/SubmitText.js';
import { Answers } from './Answer.js'
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { withRouter } from 'next/router';
import { getData, postData } from '../../../util/util.js';
import '../../../styles.scss';

const noAnswerText = 'This question has no answer yet.';
const TEXT_AREA_ROWS = 10;

class QuestionDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.updateState = this.updateState.bind(this);
    this.failed = this.failed.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.updateAnswers = this.updateAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.answerOnSuccess = this.answerOnSuccess.bind(this);

    this.state = {
      id: props.router.query['id'],
      title: '',
      username: '',
      upvotes: 0,
      views: 0,
      answerCount: 0,
      answers: [],
      content: '',
      'submitted-on': '',
      answerContent: {}
    }
  }

  componentDidMount() {
    const url = Config.serverURL + '/questions/' + this.state.id;
    getData(url, this.updateState, this.failed);

    const answersURL = url + '/answers';
    getData(answersURL, this.updateAnswers, this.failed);
  }

  updateAnswers(json) {
    const data = JSON.parse(json);
    const len = data.length;

    this.setState({
      answerCount: len,
      answers: data
    });
  }

  updateState(json) {
    const data = JSON.parse(json);
    this.setState({ ...data });
  }

  answerOnSuccess() {
    const url = '/questions/' + this.state.id;
    Router.push(url);
  }

  answerOnFail() {
    console.log('Unable to submit answer');
  }

  submitAnswer(content) {
    const url = Config.serverURL + '/questions/' + this.state.id + '/answers';
    postData(url, {content: content}, this.answerOnSuccess, this.answerOnFail)
    console.log('submitting');
  }

  buildAnswerSection() {
    if (this.state.answerCount === 0) {
      return (
        <div className='question-no-answer'>{noAnswerText}</div>
      );
    }

    return (<Answers answers={this.state.answers} />);
  }

  updateKey(ref, key) {
    this[key] = ref;
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
          <div className='user-answer-section'>
            <SubmitText onSubmit={this.submitAnswer}/>
          </div>
        </div>
      </div>
    );
	}
}

export default withRouter(QuestionDisplay);
