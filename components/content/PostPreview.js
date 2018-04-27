import React from 'react';
import Config from '../../config.json';

class PostPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      title: this.getString(props.title),
      username: this.getString(props.username),
      submittedOn: this.getString(props.submittedOn),
      upvotes: this.getInt(props.upvotes),
      views: this.getInt(props.views),
      answers: this.getInt(props.answers)
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
        <div className="post-preview">
          <span className="stat-group">
            <span className="stat-container">
              {this.state.upvotes}
              <div className="preview-subtext">votes</div>
            </span>
            <span className="stat-container">
              {this.state.answers}
              <div className="preview-subtext">answers</div>
            </span>
            <span className="stat-container">
              {this.state.views}
              <div className="preview-subtext">views</div>
            </span>
          </span>
          <span className="pp-stat-container">
            <div className="post-preview-title">{this.state.title}</div>
            <div className="post-preview-stats">
              <span className="post-preview-author">{this.state.username}</span>
              <span className="post-preview-time">{this.state.submittedOn}</span>
            </div>
          </span>
        </div>
    );
	}
}

export default PostPreview;
