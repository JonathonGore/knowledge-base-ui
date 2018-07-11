import FontAwesome from 'react-fontawesome';
import Link from 'next/link';
import PropTypes from 'prop-types';
import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);

    this.query = props.query;
  }

  onTextChange = (e) => {
    this.query = e.target.value;
  }

  onKeyUp = (e) => {
    if (e.keyCode == 13) {
      this.props.search(e.target.value);
    }
  }

  render() {
    return (
      <span className='search-container'>
        <input onChange={this.onTextChange} className='search-input' type={'text'}
          onKeyUp={this.onKeyUp} placeholder={this.props.placeholder}/>
      </span>
    );
  }
}

Search.propTypes = {
  placeholder: PropTypes.string,
  search: PropTypes.func,
  query: PropTypes.string,
}

Search.defaultProps = {
  placeholder: 'Search',
  search: (q) => { console.log(q); },
  query: '',
}

export default Search;
