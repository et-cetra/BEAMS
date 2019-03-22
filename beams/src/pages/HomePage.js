import React from 'react';

import SearchIcon from "@material-ui/icons/Search";
import Search from "../components/search"
import { Grid, Icon } from '@material-ui/core';
import QuickSearch from '../components/QuickSearch';


class HomePage extends React.Component {
    render() {
      return (
        <div className="QuickSearchContainer">
        <Grid container spacing={12} direction="row" justify="flex-start" alignItems="stretch">
          <Grid item xs={2}><Icon className="SearchIcon"><SearchIcon/></Icon></Grid>
          <Grid item xs={10}><QuickSearch className="Searchbar" onSelect={this.props.onSelect}/></Grid>
        </Grid>
        </div>
      );
    }
  }

export default HomePage;

