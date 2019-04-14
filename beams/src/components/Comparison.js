import React from 'react';
import '../pages/HomePage.css'
import { Grid, Grow } from '@material-ui/core';
import SuburbPage from "../pages/SuburbPage";
import QuickSearch from "./QuickSearch"

class Comparison extends React.Component {
    render() {
      console.log("comparison sub", this.props.suburbs);
      if (this.props.suburbs.length === 1) {
        return (
          <div>
            <QuickSearch onSelect={this.props.onSuburbCompare}/>
            <SuburbPage suburb={this.props.suburbs[0]} reset={this.props.reset} onStartOver={this.props.onStartOver} wideMode={true}/>
          </div>
        )
      } else {
        return (
          <Grow in timeout={750}>
          <Grid container direction="row" justify="space-evenly" alignItems="center">
            <Grid item xs={6} sm={6} lg={6}>
              <SuburbPage suburb={this.props.suburbs[0]} reset={this.props.reset} onStartOver={this.props.onStartOver}/>
            </Grid>
            <Grid item xs={6} sm={6} lg={6}>
              <SuburbPage suburb={this.props.suburbs[1]} reset={this.props.reset} onStartOver={this.props.onStartOver}/>
            </Grid>
          </Grid>
          </Grow>
        );
      }
    }
  }

export default Comparison;