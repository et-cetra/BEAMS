import React from 'react';
import { Grid, Grow } from '@material-ui/core';
import SuburbPage from './SuburbPage'

class ComparePage extends React.Component {
    render() {
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
export default ComparePage;