import React from 'react';
import './HomePage.css'
import { Grid, Typography, Grow, Fab, Slide } from '@material-ui/core';
import {Link} from "react-router-dom"
import HomeSearch from '../components/HomeSearch';
import PeopleIcon from '@material-ui/icons/People';

class HomePage extends React.Component {
    render() {
      return (
        <div>
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
        <Slide in timeout={1000} direction="up">
        <div className="footer">
          <Fab variant="extended"
          size="medium"
          style={{ backgroundImage: "linear-gradient(to right,#EE6A15 0%,#E62927 100%)"}} >
            <PeopleIcon style={{paddingRight: "10px", color: "whitesmoke"}}/>
            <Link to="/developers"><Typography style={{fontSize: "16px", color: "whitesmoke"}}>Beams &copy; 2019</Typography></Link>
          </Fab>
        </div>
        </Slide>
        </div>
      );
    }
  }

export default HomePage;
