import React from 'react';

import { Grid, Icon, Typography, Slide, Grow } from '@material-ui/core';
import HomeSearch from '../components/HomeSearch';

class HomePage extends React.Component {
    render() {
      return (
        <div className='HomeContainer'>
        <Grow in={this.props.onSelect} timeout={750}>
        <Grid container direction="column" justify="space-evenly" alignItems="center">
          <Grid item>
          <Typography style={{ fontSize: 30 }} variant='overline' align='center'>
            [some text here]
          </Typography>
          </Grid>
          <Grid item><HomeSearch onSelect={this.props.onSelect}/></Grid>
        </Grid>
        </Grow>
        </div>
      );
    }
  }

export default HomePage;

