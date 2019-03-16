import React from 'react';

import SearchIcon from "@material-ui/icons/Search";
import Search from "../components/search"


class HomePage extends React.Component {
    render() {
      return (
        <div className="App">
          <SearchIcon />
          <Search />
        </div>
      );
    }
  }

export default HomePage;

