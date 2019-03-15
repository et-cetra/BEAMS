import React, { Component } from 'react';
import './App.css';
import SearchIcon from "@material-ui/icons/Search";

import Search from "./components/search"

class App extends Component {
  render() {
    return (
      <div className="App">
        <body className = "App">
        <SearchIcon /><Search />
        </body>
      </div>
    );
  }
}

export default App;
