import Config from '../../config.js';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import PostPreview from './previews/PostPreview.js';
import React from 'react';
import Router from 'next/router';
import Button from '../misc/button.js';
import { getData } from '../../util/util.js';
import { KB_ORG_SELECTION, KB_DEFAULT_ORG } from '../../constants/constants.js';
import '../../styles.scss';

class Content extends React.Component {
  constructor (props){
    super(props);
    this.requestPosts = this.requestPosts.bind(this);
    this.buildURL = this.buildURL.bind(this);

    this.state = {
      loading: true,
      posts: [],
    };
  }

  // Builds the correct url for requesting questions depending on the given props
  buildURL() {
    if (this.props.user) {
      return `${Config.serverURL}/questions?user=${this.props.user}`;
    } else if (this.props.org) {
      return `${Config.serverURL}/organizations/${this.props.org}/questions`;
    } else if (localStorage && localStorage.getItem(KB_ORG_SELECTION) &&
      localStorage.getItem(KB_ORG_SELECTION) !== KB_DEFAULT_ORG) {
      return `${Config.serverURL}/organizations/${localStorage.getItem(KB_ORG_SELECTION)}/questions`;
    }

    return `${Config.serverURL}/questions`;
  }

  requestPosts() {
    const onSuccess = (json) => {
      this.setState({
        posts: JSON.parse(json),
        loading: false,
      });
    };

    getData(this.buildURL(), onSuccess);
  }

  componentDidMount() {
    this.requestPosts();
  }

  render() {
    return (
      <ContentDisplay loading={this.state.loading} posts={this.state.posts}/>
    );
  }
}

Content.propTypes = {
  org: PropTypes.string,
};

const ContentDisplay = (props) => {
  if (props.loading) {
    return (<div className='spinner-wrapper'><FontAwesome name='spinner' spin /></div>);
  } else if (!props.loading && props.posts.length === 0) {
    return (
      <div className='no-questions-container'>
        <div className='no-questions-text'>
          No questions have been asked yet.
        </div>
        <Button onClick={() => (Router.push('/ask'))}text={'Ask the first question'}/>
      </div>
    );
  }

  const listItems = props.posts.map(post => (<PostPreview key={post.id} {...post} />));
  return (
    <div className='post-container'>
      {listItems}
    </div>
  );
}

ContentDisplay.propTypes = {
  loading: PropTypes.bool,
  posts: PropTypes.array,
};

ContentDisplay.defaultProps = {
  loading: false,
  posts: [],
};

export default Content;
