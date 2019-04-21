import React from 'react';
import './HomePage.css'
import { Grid, Typography, Grow } from '@material-ui/core';
import {Link} from "react-router-dom"
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
          <Grid item><HomeSearch onSelect={this.props.onSelect}/></Grid>
        </Grid>
        </Grow>
        <div className="footer">
          <Link to="/developers">Beams &copy; 2019</Link>
        </div>
        </div>
      );
    }
  }

export default HomePage;
