import PropTypes from 'prop-types';
import { FormControl, Button } from 'react-bootstrap';

class SubmitText extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);

    this.content = {};
  }

  onSubmit(e) {
    e.preventDefault();

    this.props.onSubmit(this.content.value);
  }

  render() {
    return(
      <form onSubmit={this.onSubmit}>
        <div className='submit-text-container'>{this.props.label}</div>
        <FormControl rows={this.props.rows} componentClass='textarea' placeholder={this.props.placeholder}
          inputRef={ref => { this.content = ref; }} />
        <Button className='btn-submit-text' bsStyle='primary' type='submit'>{this.props.buttonText}</Button>
      </form>
    );
  }
}

SubmitText.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  buttonText: PropTypes.string,
  rows: PropTypes.number,
  onSubmit: PropTypes.func
};

SubmitText.defaultProps = {
  label: 'Enter text',
  placeholder: 'Enter text...',
  buttonText: 'Submit',
  rows: 10,
  onSubmit: () => { console.log('Submitting') }
};

export default SubmitText;
