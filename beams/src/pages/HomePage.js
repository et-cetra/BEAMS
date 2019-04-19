import React from 'react';
import './HomePage.css'
import { Grid, Typography, Grow } from '@material-ui/core';
import HomeSearch from '../components/HomeSearch';

class HomePage extends React.Component {
    render() {
      return (
        <div className='HomeContainer'>
        <Grow in timeout={750}>
        <Grid container direction="column" justify="space-evenly" alignItems="center">
          <Grid item>
          <Typography style={{ fontSize: 30 }} variant='overline' align='center'>
            All your suburb data in one place. Made simple.
          </Typography>
          <br></br>
          </Grid>
          <Grid item><HomeSearch onSelect={(city) => this.props.onSelect(city, this.props.history)}/></Grid>
        </Grid>
        </Grow>
        </div>
      );
    }
  }

export default HomePage;

