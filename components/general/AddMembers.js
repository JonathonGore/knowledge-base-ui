import Button from '../misc/button';
import PropTypes from 'prop-types';

const ADD_MEMBER_TEXT = 'Add member:';

class AddMembers extends React.Component {
  constructor(props) {
    super(props);
    this.onClick = this.onClick.bind(this);

    this.state = {
      member: '',
    };
  }

  onClick() {
    this.props.onSubmit(this.state.member);
  }

  render() {
    return (
      <div className='add-members-container'>
        <div className='add-members-header'>{ADD_MEMBER_TEXT}</div>
        <input type='text' onChange={(e) => this.setState({member: e.target.value})} placeholder='Member Name' />
        <Button onClick={this.onClick} />
      </div>
    );
  }
}

AddMembers.propTypes = {
  onSubmit: PropTypes.func,
};

AddMembers.defaultProps = {
  onSubmit: (val) => { console.log(val); },
};

export default AddMembers;
