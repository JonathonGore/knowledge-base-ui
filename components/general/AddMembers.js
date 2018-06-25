import Button from '../misc/button';
import PropTypes from 'prop-types';
import React from 'react';

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
        <input className='kb-text-input' type='text'
          onChange={(e) => this.setState({member: e.target.value})} placeholder='Member Name' />
        <Button className={'add-members-button'} text={'Add'} style={'primary'} onClick={this.onClick} />
      </div>
    );
  }
}

AddMembers.propTypes = {
  onSubmit: PropTypes.func,
};

AddMembers.defaultProps = {
  onSubmit: () => {},
};

export default AddMembers;
