import React from 'react';
import './SuburbPage.css'
import AgeGroupOfPop from '../components/AgeGroupOfPop'
import MaritalStatus from '../components/MaritalStatus'
import CountryOfBirth from '../components/CountryOfBirth';
import Schools from '../components/Schools';
import NatureOfOccupancy from '../components/NatureOfOccupancy';
import { Grow, Grid, Typography, Divider } from '@material-ui/core';
import SuburbNews from '../components/SuburbNews';
import mMap from '../assets/ic_map.png'
import mTerrain from '../assets/ic_terrain.png'
import mNews from '../assets/ic_news.png'


class SuburbPage extends React.Component {
    render() {
      if (this.props.suburb != null) {
        const suburb = this.props.suburb;
        const suburb_state = this.props.suburb_state;
        const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&q=${suburb}`;
      return (
        <div className="ParentContainer">
        {/*Top items (suburb text, icon)*/}
        <img src={mTerrain} className="IconMain"/>
        <Typography align="inherit" inline="true" className="MainText" style={{ fontSize: 40 }} variant="h1" color="inherit">
          {suburb}
        </Typography>
        <br></br>
        <Divider variant="fullWidth" className="DividerMain"></Divider>
        <br></br>
        <Grid className="SuburbContainer"
        container spacing={12} 
        direction="row" 
        justify="flex-start"
        alignItems="left" >
         
          {/*LHS grid item*/}
          <Grid item xs={7}>
          {/*LHS grid container*/}
            <Grid className="LeftContainer" alignItems="left">
              <Grid item className="DemographicsContainer">
              <p><AgeGroupOfPop suburb_state={suburb_state} suburb={suburb}/></p>
              <p><MaritalStatus suburb_state={suburb_state} suburb={suburb}/></p>
              <p><CountryOfBirth suburb_state={suburb_state} suburb={suburb}/></p>
              <p><NatureOfOccupancy suburb_state={suburb_state} suburb={suburb}/></p>
              <p><Schools suburb_state={suburb_state} suburb={suburb}/></p>
              </Grid>
              <button className="button" onClick={this.props.onStartOver}>Home</button>
            </Grid>
          </Grid>

          {/*RHS grid item*/}
          <Grid item xs={5}>
          {/*RHS grid container*/}
            <Grid className="RightContainer">
                <Grid item className="MapsContainer">
                <img src={mMap} className="IconDef"/>
                <Typography align="inherit" inline="true" className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
                  Maps
                </Typography>
                <iframe className="GMapsMain" frameborder="0" src={url} allowFullScreen></iframe>
                <img src={mNews} className="IconDef"/>
                <Typography align="inherit" inline="true" className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
                  Local News
                </Typography>
                <div className="NewsMain">
                  <SuburbNews suburb={suburb}/>
                </div>
                </Grid>
            </Grid>
          </Grid>
        </Grid>
        </div>
      );
    } else {
      return (
        <div>
          <p>
          Error: No valid suburb selected.
          Please go home and select a valid suburb.
          </p>
          <button className="button" onClick={this.props.onStartOver}>Home</button>
        </div>
      )
    }
  }
  }

export default SuburbPage;
