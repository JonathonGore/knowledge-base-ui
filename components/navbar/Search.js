import React from 'react';
import FontAwesome from 'react-fontawesome';
import Link from 'next/link';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      text: props.text || ''
    };
  }

  render() {
    return (
      <span className='search-container'>
        <input className='search-input' type={'text'} placeholder={this.state.text}/>
      </span>
    );
  }
}

export default Search;
