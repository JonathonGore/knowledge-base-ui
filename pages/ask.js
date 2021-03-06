import Config from '../config.js';
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import FieldGroup from '../components/general/FieldGroup.js';
import FontAwesome from 'react-fontawesome';
import PageLayout from '../components/content/PageLayout.js';
import React from 'react';
import Router from 'next/router';
import { Button } from 'react-bootstrap';
import { postData } from '../util/util.js';
import { KB_ORG_SELECTION, KB_DEFAULT_ORG } from '../constants/constants.js';
import '../styles.scss';

const TEXT_AREA_ROWS = 10;

class Ask extends React.Component {
  constructor (props){
    super(props);
    this.submitQuestion = this.submitQuestion.bind(this);
    this.updateKey = this.updateKey.bind(this);
    this.buildError = this.buildError.bind(this);

    this.title = {};
    this.body = {};

    this.state = {
      error: '',
      org: '',
    };
  }

  componentDidMount() {
    this.setState({org: localStorage.getItem(KB_ORG_SELECTION) || KB_DEFAULT_ORG});
  }

  updateKey(ref, key) {
    this[key] = ref;
  }

  buildError(message) {
    this.setState({
      error: (
        <DismissableAlert type='danger' title='Unable to create question' message={message} />
      )
    });
  }

  submitQuestion(e) {
    e.preventDefault();

    let url = '';
    if (this.state.org === KB_DEFAULT_ORG) {
      url = Config.serverURL + '/questions';
    } else {
      url = Config.serverURL + `/organizations/${this.state.org}/questions`;
    }

    const data = {
      title: this.title.value,
      content: this.body.value
    };

    const onSuccess = (str) => { Router.push('/questions/' + JSON.parse(str)['id']); };
    const onFailure = (data) => { this.buildError(JSON.parse(data).message);};

    postData(url, data, onSuccess, onFailure);
  }

  headerText() {
    if (typeof localStorage === undefined || this.state.org === '') return '';

    if (this.state.org === KB_DEFAULT_ORG) {
      return (
        <div onClick={() => { Router.push('/'); }} className='ask-visibility-container'>
          <FontAwesome name='globe'/>
          <span className='ask-visibility-text'>Public</span>
        </div>
      );
    }

    return (
      <div onClick={() => { Router.push(`/organizations/${this.state.org}`); }}
        className='ask-visibility-container'>
        <FontAwesome name='globe'/>
        <span className='ask-visibility-text'>{this.state.org}</span>
      </div>
    );
  }

  buildContent() {
    return (
      <div className='ask-container'>
        <div className='login-error-container'>
          {this.state.error}
        </div>
        <div className='ask-header'>
          {this.headerText()}
        </div>
        <form onSubmit={this.submitQuestion}>
          <FieldGroup kbOnChange={this.updateKey} formKey='title' id='askTitle'
            type='text' label='Title' placeholder='Enter title'/>
          <FieldGroup kbOnChange={this.updateKey} formKey='body' rows={TEXT_AREA_ROWS}
            id='askBody' componentClass='textarea' label='Question' placeholder='Enter question'/>
          <Button bsStyle='primary' type='submit'>Ask Question</Button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <PageLayout>
        {this.buildContent()}
      </PageLayout>
    );
  }
}

export default Ask;
