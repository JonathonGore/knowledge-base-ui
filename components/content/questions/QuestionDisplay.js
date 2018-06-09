import Router from 'next/router';
import Config from '../../../config.js';
import SubmitText from '../../misc/SubmitText.js';
import { QuestionInfo } from './QuestionInfo.js';
import { Answers } from './Answer.js';
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
    this.updateAnswers = this.updateAnswers.bind(this);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.answerOnSuccess = this.answerOnSuccess.bind(this);

    this.state = {
      id: props.router.query['id'],
      title: '',
      username: '',
      upvotes: 0,
      views: 0,
      answers: 0,
      ans: [],
      content: '',
      'submitted-on': '',
      answerContent: {}
    };
  }

  componentDidMount() {
    const url = Config.serverURL + '/questions/' + this.state.id;
    getData(url, this.updateState, this.failed);

    const answersURL = url + '/answers';
    getData(answersURL, this.updateAnswers, this.failed);

    postData(url + '/view', {}); // View the question
  }

  updateAnswers(json) {
    const data = JSON.parse(json);

    this.setState({
      ans: data
    });
  }

  updateState(json) {
    const data = JSON.parse(json);
    this.setState({
      ...data
    });
  }

  answerOnSuccess() {
    const url = '/questions/' + this.state.id;
    Router.push(url);
  }

  submitAnswer(content) {
    const url = Config.serverURL + '/questions/' + this.state.id + '/answers';
    const onFail = () => { console.error('Unable to submit answer');};

    postData(url, {content: content}, this.answerOnSuccess, onFail);
  }

  buildAnswerSection() {
    if (this.state.ans.length === 0) {
      return (
        <div className='question-no-answer'>{noAnswerText}</div>
      );
    }

    return (<Answers answers={this.state.ans} />);
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
          <QuestionInfo views={this.state.views} username={this.state.username} />
          <div className='answers-section'>
            <div className='question-answers-header'>Answers</div>
            <div className='question-answers'>{this.buildAnswerSection()}</div>
          </div>
          <div className='user-answer-section'>
            <SubmitText buttonText='Submit Answer' placeholder='Enter answer...'
              label='Enter answer' onSubmit={this.submitAnswer}/>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(QuestionDisplay);
