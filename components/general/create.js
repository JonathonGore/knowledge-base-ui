import Config from '../../config.js';
import { FormControl, Button } from 'react-bootstrap';
import { postData } from '../../util/util.js';
import '../../styles.scss';

class CreateObj extends React.Component {
  constructor(props) {
    super(props);
    this.content = {};
  }

  onSubmit(e) {
    e.preventDefault();

    const url = Config.serverURL + '/' + this.props.type;
    const data = { name: this.content.value };
    const onSuccess = () => { this.props.onSubmit(); };

    postData(url, data, onSuccess);
  }

  render() {
    return (
      <div className='create-type'>
        <div className='create-type-form'>
          <form onSubmit={(e) => {this.onSubmit(e) }}>
            <div className='submit-text-container'>Name</div>
            <FormControl type='text' placeholder={this.props.placeholder}
              inputRef={ref => { this.content = ref; }} />
            <Button className='btn-submit-text' bsStyle='primary' type='submit'>{this.props.buttonText}</Button>
          </form>
        </div>
      </div>
    );
	}
}

export default CreateObj;
