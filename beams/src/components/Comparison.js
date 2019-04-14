import React from 'react';
import '../pages/HomePage.css'
import { Grid, Grow } from '@material-ui/core';
import SuburbPage from "../pages/SuburbPage";
import QuickSearch from "./QuickSearch"
import ComparePage from "../pages/ComparePage"

class Comparison extends React.Component {
    render() {
      if (this.props.suburbs.length === 1) {
        return (
          <div>
            <QuickSearch onSelect={this.props.onSuburbCompare}/>
            <SuburbPage suburb={this.props.suburbs[0]} reset={this.props.reset} onStartOver={this.props.onStartOver} wideMode={true}/>
          </div>
        )
      } else {
        return (
          <ComparePage suburbs={this.props.suburbs} reset={this.props.reset} onStartOver={this.props.onStartOver}/>
        )
      }
    }
  }

export default Comparison;