import Config from '../../config.js';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import PostPreview from './previews/PostPreview.js';
import React from 'react';
import Router from 'next/router';
import Button from '../misc/Button.js';
import { getData } from '../../util/util.js';
import { KB_ORG_SELECTION, KB_DEFAULT_ORG } from '../../constants/constants.js';
import '../../styles.scss';

class Content extends React.Component {
  constructor (props){
    super(props);
    this.onAskQuestion = this.onAskQuestion.bind(this);
    this.requestPosts = this.requestPosts.bind(this);
    this.buildURL = this.buildURL.bind(this);

    this.state = {
      loading: this.props.posts ? false : true,
      noSelection: false,
      posts: [],
    };
  }

  onAskQuestion() {
    if (this.props.org) {
      localStorage.setItem(KB_ORG_SELECTION, this.props.org);
    }

    Router.push('/ask');
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

    const onFailure = (json) => {
      // If we get a 404 and ALLOW_PUBLIC is off we need to display a warning
      // that no org is selected.
      if (json.status === 404 && !Config.ALLOW_PUBLIC) {
        this.setState({
          noSelection: true,
        });
      }
    };

    getData(this.buildURL(), onSuccess, onFailure);
  }

  componentDidMount() {
    if (!this.props.posts) {
      this.requestPosts();
    }
  }

  render() {
    return (
      <div className={this.props.className}>
        <ContentDisplay noQuestionsText={this.props.noQuestionsText} noSelection={this.state.noSelection} onClick={this.onAskQuestion}
          loading={this.state.loading} posts={this.props.posts || this.state.posts}/>
      </div>
    );
  }
}

Content.propTypes = {
  org: PropTypes.string,
  noQuestionsText: PropTypes.string,
  posts: PropTypes.array,
};

const ContentDisplay = (props) => {
  if (props.noSelection) {
    return (
      <div className='no-questions-container'>
        <div className='no-questions-text'>
          No organization selected. Select an organization from the dropdown.
        </div>
      </div>
    );
  } else if (props.loading) {
    return (<div className='spinner-wrapper'><FontAwesome name='spinner' spin /></div>);
  } else if (!props.loading && props.posts.length === 0) {
    return (
      <div className='no-questions-container'>
        <div className='no-questions-text'>
          {props.noQuestionsText}
        </div>
        <Button onClick={props.onClick}text={'Ask the first question'}/>
      </div>
    );
  }

  const listItems = props.posts.map(post => (<PostPreview key={post.id} {...post} />));
  return (
    <div className='post-container'>
      {listItems}
    </div>
  );
};

ContentDisplay.propTypes = {
  loading: PropTypes.bool,
  onClick: PropTypes.func,
  noQuestionsText: PropTypes.string,
  posts: PropTypes.array,
};

ContentDisplay.defaultProps = {
  loading: false,
  noQuestionsText: 'No questions have been asked yet.',
  posts: [],
};

export default Content;
