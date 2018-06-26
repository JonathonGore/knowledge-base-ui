import Config from '../../config.js';
import DismissableAlert from '../alerts/DismissableAlert.js';
import PropTypes from 'prop-types';
import { FormControl, Button } from 'react-bootstrap';
import { singular, postData } from '../../util/util.js';
import './styles.scss';
import '../../styles.scss';

class CreateObj extends React.Component {
  constructor(props) {
    super(props);
    this.content = {};

    this.state = {
      error: '',
    }
  }

  buildError(message) {
    this.setState({
      error: (
        <DismissableAlert type='danger' title={'Unable to create ' + singular(this.props.type)} message={message} />
      )
    });
  }

  onSubmit(e) {
    e.preventDefault();

    const url = Config.serverURL + '/' + this.props.type;
    const data = { name: this.content.value };
    const onSuccess = () => {
      this.props.onSubmit(this.content.value);
    };

    const onFail = (data) => {
      this.buildError(JSON.parse(data).message)
    }

    postData(url, data, onSuccess, onFail);
  }

  render() {
    return (
      <div className='create-type'>
        <div className='create-type-form'>
          <div className='create-error-container'>
            {this.state.error}
          </div>
          <div className='create-text'>{this.props.title}</div>
          <div className='create-subtext'>{this.props.subtext}</div>
          <form className='create-input-form' onSubmit={(e) => {this.onSubmit(e)}}>
            <FormControl type='text' placeholder='Name'
              inputRef={ref => { this.content = ref; }} />
            <Button className='btn-submit-text' bsStyle='primary' type='submit'>{this.props.buttonText}</Button>
          </form>
        </div>
      </div>
    );
  }
}

CreateObj.propTypes = {
  type: PropTypes.string,
  buttonText: PropTypes.string,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
  subtext: PropTypes.string,
};

CreateObj.defaultProps = {
  title: 'Name',
  subtext: '',
}

export default CreateObj;
