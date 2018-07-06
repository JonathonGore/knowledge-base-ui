import Config from '../../../config.js';
import PropTypes from 'prop-types';
import React from 'react';
import Router from 'next/router';
import SubmitText from '../../misc/SubmitText.js';
import { QuestionInfo } from './QuestionInfo.js';
import { Answers } from './Answer.js';
import { postData } from '../../../util/util.js';
import '../../../styles.scss';

const noAnswerText = 'This question has no answer yet.';

class QuestionDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.submitAnswer = this.submitAnswer.bind(this);
    this.answerOnSuccess = this.answerOnSuccess.bind(this);
  }

  componentDidMount() {
    postData(`${Config.serverURL}/questions/${this.props.question.id}/view`, {}); // View the question
  }

  answerOnSuccess() {
    const url = '/questions/' + this.props.question.id;
    Router.push(url);
  }

  submitAnswer(content) {
    const url = Config.serverURL + '/questions/' + this.props.question.id + '/answers';
    const onFail = () => { console.error('Unable to submit answer');};

    postData(url, {content: content}, this.answerOnSuccess, onFail);
  }

  buildAnswerSection() {
    if (this.props.answers.length === 0) {
      return (
        <div className='question-no-answer'>{noAnswerText}</div>
      );
    }

    return (<Answers answers={this.props.answers} />);
  }

  render() {
    return (
      <div className='question-container'>
        <div className='question-content'>
          <div className='question-title'>{this.props.question.title}</div>
          <div className='question-body'>{this.props.question.content}</div>
          <QuestionInfo views={this.props.question.views} username={this.props.question.username} />
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

QuestionDisplay.propTypes = {
  answers: PropTypes.array,
  question: PropTypes.object,
};

QuestionDisplay.defaultProps = {
  answers: [],
  question: {},
};

export default QuestionDisplay;
