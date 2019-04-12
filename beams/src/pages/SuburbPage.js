import React from 'react';
import './SuburbPage.css'
import AgeGroupOfPop from '../components/demographics/AgeGroupOfPop'
import SwipeableViews from 'react-swipeable-views';
import CountryOfBirth from '../components/demographics/CountryOfBirth';
import Schools from '../components/Schools';
import NatureOfOccupancy from '../components/demographics/NatureOfOccupancy';
import { Grid, Typography, Divider, Tabs, Tab, Paper, Fade } from '@material-ui/core';
import SuburbNews from '../components/SuburbNews';
import mMap from '../assets/ic_map.png'
import mTerrain from '../assets/ic_terrain.png'
import mNews from '../assets/ic_news.png'
import mDG from '../assets/ic_demographics.png'
import FaceIcon from '@material-ui/icons/Face'
import HomeIcon from '@material-ui/icons/Home'
import { HumanMaleBoy } from 'mdi-material-ui'

class SuburbPage extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
      this.setState({ value });
    };

  render() {
    console.log("Suburb page", this.props);
    var { value } = this.state;
    const COLORS = ['#E62927', '#EE6A15', '#333F48', '#04091E', '#000000', '#000000'];

    if (this.props.suburb != null) {
      const suburb = this.props.suburb;
      const suburb_state = this.props.suburb_state;
      const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&q=${suburb}`;
    return (
      <div className="ParentContainer">
      {/*Top items (suburb text, icon)*/}
      <img src={mTerrain} className="IconMain" alt="terrain"/>
      <Typography align="inherit" inline className="MainText" style={{ fontSize: 40 }} variant="h1" color="inherit">
        {suburb}
      </Typography>
      <br></br>
      <Divider variant="fullWidth"></Divider>
      <br></br>

      <Fade in timeout={750}>
      <Grid className="SuburbContainer"
      container spacing={16}
      direction="row"
      justify="center"
      alignItems="flex-start" >

        {/*LHS grid item*/}
        <Grid item xs={7}>
        {/*LHS grid container*/}
          <Grid className="LeftContainer">
            <img src={mDG} className="IconDef" alt="demographics"/>
            <Typography align="inherit" inline className="SideText"
            style={{ fontSize: 26 }} variant="h1" color="inherit">
                Demographics
            </Typography>

            <div className="DGContainer" >
            <Paper square>
            <Tabs value={value} onChange={this.handleChange} centered
            indicatorColor="primary" textColor="primary" variant="fullWidth">
              <Tab icon={<HumanMaleBoy/>} label="Age Distribution" />
              <Tab icon={<FaceIcon/>}label="Cultural Diversity" />
              <Tab icon={<HomeIcon/>} label="Property Occupancy" />
            </Tabs>
            </Paper>
            </div>

            {value === 0 && <AgeGroupOfPop COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state+'AgeGroupOfPop'}/>}
            {value === 1 && <CountryOfBirth COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state+'CountryOfBirth'}/>}
            {value === 2 && <NatureOfOccupancy COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state+'NatureOfOccupancy'}/>}
            <div className="SchoolsContainer">
              <Schools suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state+'Schools'}/>
            </div> 
          </Grid>
        </Grid>

        {/*RHS grid item*/}
        <Grid item xs={5}>
        {/*RHS grid container*/}
          <Grid className="RightContainer">
              <Grid item className="MapsContainer">
              <img src={mMap} className="IconDef" alt="map"/>
              <Typography align="inherit" inline className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
                Maps
              </Typography>
              <iframe className="GMapsMain" frameBorder="0" src={url} allowFullScreen title="GMaps"/>
              <img src={mNews} className="IconDef" alt="news"/>
              <Typography align="inherit" inline className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
                Local News
              </Typography>
              <div className="NewsMain">
                <SuburbNews suburb={suburb}/>
              </div>
              </Grid>
          </Grid>
        </Grid>
      </Grid>
      </Fade>
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
