import React from 'react';
import { Form } from 'react-bootstrap';
import PostPreview from './PostPreview.js';
import Config from '../../config.json';
import FontAwesome from 'react-fontawesome';

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.getClassName = this.getClassName.bind(this);

    this.state = {
      posts: [],
      className: props.className ? props.className : ""
    };
  }

  componentWillReceiveProps(props) {
    this.setState({...props});
  }

  getClassName() {
    return this.state.className + " post-container";
  }

  render() {
    var listItems;

    if (this.state.posts.length === 0) {
        return (<div className='spinner-wrapper'><FontAwesome name='spinner' spin /></div>);
    }

    listItems = this.state.posts.map(
        post => {
          return <PostPreview key={post.id} {...post} />;
        }
    );

    return (
        <span className={this.getClassName()}>
          {listItems}
        </span>
    );
	}
}

export default Content;
