import React, { Component } from 'react';
import './App.css';

import searchBar from "./components/searchBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <p>
            Search for suburb
          </p>
          <searchBar />
        </header>
        <body>
          Search here:
        </body>
        <searchBar
          value={this.state.value}
          placeholder="yes"
          onChange={this.onChange}
        />
      </div>
    );
  }
}

export default App;
