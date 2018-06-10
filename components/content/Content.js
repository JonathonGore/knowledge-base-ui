import React from 'react';
import PropTypes from 'prop-types';
import PostPreview from './previews/PostPreview.js';
import FontAwesome from 'react-fontawesome';
import Config from '../../config.js';
import { KB_ORG_SELECTION, KB_DEFAULT_ORG } from '../../constants/constants.js';
import { getData } from '../../util/util.js';
import '../../styles.scss';

class Content extends React.Component {
  constructor (props){
    super(props);
    this.requestPosts = this.requestPosts.bind(this);
    this.buildURL = this.buildURL.bind(this);

    this.state = {
      posts: [],
    };
  }

  buildURL() {
    if (localStorage && localStorage.getItem(KB_ORG_SELECTION) !== KB_DEFAULT_ORG) {
      return Config.serverURL + '/organizations/' + localStorage.getItem(KB_ORG_SELECTION) + '/questions';
    }

    if (this.props.user) {
      return Config.serverURL + '/questions?user=' + this.props.user;
    }

    return Config.serverURL + '/questions';
  }

  requestPosts() {
    const onSuccess = (json) => {
      const vals = JSON.parse(json);
      this.setState({posts: vals});
    };

    getData(this.buildURL(), onSuccess);
  }

  componentDidMount() {
    this.requestPosts();
  }

  render() {
    return (
      <ContentDisplay posts={this.state.posts}/>
    );
  }
}

const ContentDisplay = (props) => {
  if (props.posts.length === 0) {
    return (<div className='spinner-wrapper'><FontAwesome name='spinner' spin /></div>);
  }

  const listItems = props.posts.map(post => (<PostPreview key={post.id} {...post} />));
  return (
    <div className='post-container'>
      {listItems}
    </div>
  );
}

ContentDisplay.propTypes = {
  posts: PropTypes.array,
};

ContentDisplay.defaultProps = {
  posts: [],
};

export default Content;
