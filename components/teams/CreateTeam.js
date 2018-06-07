import Config from '../../config.js';
import { FormControl, Button } from 'react-bootstrap';
import { postData } from '../../util/util.js';
import '../../styles.scss';

class CreateTeam extends React.Component {
  constructor(props) {
    super(props);
    this.content = {};
  }

  onSubmit(e) {
    e.preventDefault();

    const url = Config.serverURL + '/teams';
    const data = { name: this.content.value };
    const onSuccess = () => { this.props.onSubmit(); };

    postData(url, data, onSuccess);
  }

  render() {
    return (
      <div className='create-team'>
        <div className='create-team-form'>
          <form onSubmit={(e) => {this.onSubmit(e) }}>
            <div className='submit-text-container'>Name</div>
            <FormControl type='text' placeholder='Team name...'
              inputRef={ref => { this.content = ref; }} />
            <Button className='btn-submit-text' bsStyle='primary' type='submit'>Create Team</Button>
          </form>
        </div>
      </div>
    );
	}
}

export default CreateTeam;
