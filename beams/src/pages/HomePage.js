import React from 'react';

import { Grid, Icon, Typography } from '@material-ui/core';
import HomeSearch from '../components/HomeSearch';


class HomePage extends React.Component {
    render() {
      return (
        <div className='HomeContainer'>
        <Grid container direction="column" justify="space-evenly" alignItems="center">
          <Grid item>
          <Typography style={{ fontSize: 30 }} variant='overline' align='center'>
            [some text here]
          </Typography>
          </Grid>
          <Grid item><HomeSearch onSelect={this.props.onSelect}/></Grid>
        </Grid>
        </div>
      );
    }
  }

export default HomePage;

