import React from 'react';
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
    const onSucces = (json) => {
      const vals = JSON.parse(json);
      this.setState({posts: vals});
    };

    getData(this.buildURL(), onSucces);
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

// TODO: This really doesnt need any state as of right now
class ContentDisplay extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      posts: []
    };
  }

  componentWillReceiveProps(props) {
    this.setState({...props});
  }

  render() {
    if (this.state.posts.length === 0) {
      return (<div className='spinner-wrapper'><FontAwesome name='spinner' spin /></div>);
    }

    const listItems = this.state.posts.map(post => (<PostPreview key={post.id} {...post} />));
    return (
      <div className='post-container'>
        {listItems}
      </div>
    );
  }
}

export default Content;
