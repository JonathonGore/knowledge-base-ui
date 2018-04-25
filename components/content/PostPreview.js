import React from 'react';
import { Row, Col } from 'react-bootstrap';
import Config from '../../config.json';

class PostPreview extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: this.getValue(props.key),
      title: this.getValue(props.title),
      author: this.getValue(props.author),
      submittedOn: this.getValue(props.submittedOn),
      upvotes: this.getValue(props.upvotes),
      view: this.getValue(props.views),
      answers: this.getValue(props.answers)
    }
  }

  getValue(obj) {
    if (obj === undefined) {
      return "";
    }
    return obj;
  }

  render() {
    return (
        <div className="post-preview">
          <Row>
            <Col sm={1} md={1} lg={1}>
              <div className="upvotes">{this.state.upvotes}</div>
            </Col>
            <Col sm={1} md={1} lg={1}>
              <div className="answers">{this.state.answers}</div>
            </Col>
            <Col sm={1} md={1} lg={1}>
              <div className="views">{this.state.views}</div>
            </Col>
            <Col sm={9} md={9} lg={9}>
              <div className="post-preview-info-container">
                  <div className="post-preview-title">{this.state.title}</div>
                  <div className="post-preview-stats">
                    <span className="post-preview-author">{this.state.author}</span>
                    <span className="post-preview-time">{this.state.submittedOn}</span>
                  </div>
              </div>
            </Col>
          </Row>
        </div>
    );
	}
}

export default PostPreview;
