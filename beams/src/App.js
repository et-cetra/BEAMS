import React, { Component } from 'react';
import './App.css';

import Search from "./components/searchBar"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          BEAMS
        </header>
        <body>
        <p> Search for suburb </p>
          <Search />
        </body>
      </div>
    );
  }
}

export default App;
