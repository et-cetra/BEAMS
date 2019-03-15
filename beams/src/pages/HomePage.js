import React from 'react';

import SearchIcon from "@material-ui/icons/Search";
import Search from "../components/search"

class HomePage extends React.Component {
    render() {
      return (
        <div className="App">
          <body className = "App">
          <SearchIcon /><Search />
          <button>Search</button>
          </body>
        </div>
      );
    }
  }

export default HomePage;

