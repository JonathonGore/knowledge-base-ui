import PropTypes from 'prop-types';
import React from 'react';
import Config from '../../config.json';
import Link from 'next/link';

class PostPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      title: props.title,
      username: props.username,
      submittedOn: props.submittedOn,
      upvotes: props.upvotes,
      views: props.views,
      answers: props.answers
    }
  }

  render() {
    return (
        <div className='post-preview'>
          <span className='stat-group'>
            <span className='stat-container'>
              {this.state.upvotes}
              <div className='preview-subtext'>votes</div>
            </span>
            <span className='stat-container'>
              {this.state.answers}
              <div className='preview-subtext'>answers</div>
            </span>
            <span className='stat-container'>
              {this.state.views}
              <div className='preview-subtext'>views</div>
            </span>
          </span>
          <span className='pp-stat-container'>
            <div className='post-preview-title'>
              <Link href={'/questions/' + this.state.id}>
                <a className='post-preview-link'>{this.state.title}</a>
              </Link>
            </div>
            <div className='post-preview-stats'>
              <span className='post-preview-author'>{this.state.username}</span>
              <span className='post-preview-time'>{this.state.submittedOn}</span>
            </div>
          </span>
        </div>
    );
	}
}

PostPreview.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
  username: PropTypes.string,
  submittedOn: PropTypes.string,
  upvotes: PropTypes.number,
  views: PropTypes.number,
  answers: PropTypes.number
};

PostPreview.defaultProps = {
  id: 0,
  title: '',
  username: '',
  submittedOn: '',
  upvotes: 0,
  views: 0,
  answers: 0
};

export default PostPreview;
