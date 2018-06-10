import PageLayout from '../components/content/PageLayout.js';
import Router from 'next/router';
import DismissableAlert from '../components/alerts/DismissableAlert.js';
import { FormGroup, ControlLabel, FormControl, HelpBlock, Button } from 'react-bootstrap';
import { postData } from '../util/util.js';
import '../styles.scss';
import Config from '../config.js';

const TEXT_AREA_ROWS = 10;

function FieldGroup({ id, label, help, kbOnChange, formKey, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} inputRef={ref => { kbOnChange(ref, formKey); }} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

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
    };
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

    const url = Config.serverURL + '/questions';
    const data = {
      title: this.title.value,
      content: this.body.value
    };

    const onSuccess = (str) => { Router.push('/questions/' + JSON.parse(str)['id']); };
    const onFailure = (data) => { this.buildError(JSON.parse(data).message);};

    postData(url, data, onSuccess, onFailure);
  }

  buildContent() {
    return (
      <div className='ask-container'>
        <div className='login-error-container'>
          {this.state.error}
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
      <PageLayout content={this.buildContent()}/>
    );
  }
}

export default Ask;
