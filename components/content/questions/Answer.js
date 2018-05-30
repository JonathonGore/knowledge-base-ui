import PropTypes from 'prop-types';

// Wrapper for answer objects
export const Answers = ({answers}) => ( // TODO: Dont want to have {} around answers
  <div className='answers-container'>
    { answers.map(answer => (<Answer key={answer.id} {...answer} />)) }
  </div>
);

// Answer object used for displaying answers on the quesiton page
export const Answer = (answer) => (
  <div className='answer-container'>
    <div className='answer-content'>
      {answer.content}
    </div>
    <div className='answer-info'>
      <span className='answer-author'>
        Authored by: {answer.username}
      </span>
    </div>
  </div>
);

Answer.propTypes = {
  id: PropTypes.number,
  content: PropTypes.string,
  username: PropTypes.string
};

Answer.defaultProps = {
  content: '',
  username: '',
};
