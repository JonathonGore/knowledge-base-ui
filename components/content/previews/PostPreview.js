import PropTypes from 'prop-types';
import React from 'react';
import Link from 'next/link';

// Individual stat about the post
const PreviewStat = (props) => (
  <span className='stat-container'>
    {props.value}
    <div className='preview-subtext'>{props.title}</div>
  </span>
);

// Container for holding stats about the question
const PreviewStatGroup = (props) => (
  <span className='stat-group'>
    <PreviewStat value={props.upvotes} title='votes' />
    <PreviewStat value={props.answers} title='answers' />
    <PreviewStat value={props.views} title='views' />
  </span>
);

// Component for display user name and date on post preview
const PreviewStats = (props) => (
  <div className='post-preview-stats'>
    <span className='post-preview-author'>{props.username}</span>
    <span className='post-preview-time'>{props.submittedOn}</span>
  </div>
);

const PostPreview = (props) =>  (
    <div className='post-preview'>
      <PreviewStatGroup upvotes={props.upvotes} answers={props.answers} views={props.views} />
      <span className='pp-stat-container'>
        <div className='post-preview-title'>
          <Link href={'/questions/' + props.id}>
            <a className='post-preview-link'>{props.title}</a>
          </Link>
        </div>
        <PreviewStats username={props.username} submittedOn={props.submittedOn} />
      </span>
    </div>
);

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
