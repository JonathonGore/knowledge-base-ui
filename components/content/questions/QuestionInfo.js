import PropTypes from 'prop-types';

// Component for display question stats on the question page
export const QuestionInfo = (props) => (
  <div className='question-info'>
    <span className='question-info-margin question-views'>
      Views: {props.views}
    </span>
    <span className='question-info-margin question-author'>
      Authored by: {props.username}
    </span>
  </div>
);

QuestionInfo.propTypes = {
  views: PropTypes.number,
  username: PropTypes.string
}

QuestionInfo.defaultProps = {
  views: 0,
  username: ''
}
