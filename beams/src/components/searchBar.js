import React, { Component } from 'react';
import './searchBar.css';

class searchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ' '
    };
    this.onChange = value => {
      this.setState({ value });
    };
  }


  render() {
    return (
      <div className="search-bar">
        <searchBar placeholder="Search by suburb" />
      </div>
    );
  }
}

export default searchBar;
