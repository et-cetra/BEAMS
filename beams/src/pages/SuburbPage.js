import React from 'react';
import './SuburbPage.css'
import AgeGroupOfPop from '../components/demographics/AgeGroupOfPop'
import CountryOfBirth from '../components/demographics/CountryOfBirth';
import Schools from '../components/demographics/Schools';
import NatureOfOccupancy from '../components/demographics/NatureOfOccupancy';
import TransportToWork from '../components/demographics/TransportToWork';
import MedianRent from '../components/stats/MedianRent';
import HouseSoldPrice from '../components/stats/HouseSoldPrice';
import { Grid, Typography, Divider, Tabs, Tab, Paper, Fade, Slide } from '@material-ui/core';
import SuburbNews from '../components/SuburbNews';

import FaceIcon from '@material-ui/icons/Face'
import HomeIcon from '@material-ui/icons/Home'
import CommuteIcon from '@material-ui/icons/Commute'
import { HumanMaleBoy, HomeCity, HomeGroup } from 'mdi-material-ui'
import mMap from '../assets/ic_map.png'
import mTerrain from '../assets/ic_terrain.png'
import mNews from '../assets/ic_news.png'
import mChart from '../assets/ic_chart.png'
import Demographics from '../components/Demographics';


class SuburbPage extends React.Component {
  state = {
    value2: 0
  };

  handleChange2 = (event, value2) => {
    this.setState({ value2 });
  };

  getRightContainer = (mMap, mNews, url, suburb) => {
    return (
      <Grid className="RightContainer">
        <Grid item className="MapsContainer">
          <img src={mMap} className="IconDef" alt="map" />
          <Typography align="inherit" inline className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
            Maps
      </Typography>
          <iframe className="GMapsMain" frameBorder="0" src={url} allowFullScreen title="GMaps" />
          <img src={mNews} className="IconDef" alt="news" />
          <Typography align="inherit" inline className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
            Local News
      </Typography>
          <div className="NewsMain">
            <SuburbNews suburb={suburb} />
          </div>
        </Grid>
      </Grid>
    )
  }

  render() {
    console.log("Suburb page", this.props);
    var { value } = this.state;
    var { value2 } = this.state;

    const COLORS = ['#E62927', '#EE6A15', '#213084', '#333F48', '#04091E'];

    const isWideMode = this.props.wideMode;

    if (this.props.suburb.suburb != null) {
      const suburb = this.props.suburb.suburb;
      const suburb_state = this.props.suburb.suburb_state;
      const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&q=${suburb}`;
    return (
      <div className="ParentContainer">
      {/*Top items (suburb text, icon)*/}
      <div>
      <img src={mTerrain} className="IconMain" alt="terrain"/>
      <Typography align="inherit" inline className="MainText" style={{ fontSize: 40 }} variant="h1" color="inherit">
        {suburb}
      </Typography>
      <br></br>
      <Divider variant="fullWidth"></Divider>
      <br></br>
      </div>

      <Fade in timeout={750}>
      <Grid className="SuburbContainer"
      container spacing={16}
      direction="row"
      justify="center"
      alignItems="flex-start" >

        {/*LHS grid item*/}
        <Slide direction="up" in={this.props.reset} timeout={800}>
        <Grid item xs={7}>
        {/*LHS grid container*/}
          <Grid className="LeftContainer">

            <Grid item className="StatsContainer" >
            <div className="SubheadingContainer">
              <img src={mChart} className="IconDef" alt="stats"/>
              <Typography align="inherit" inline className="SideText"
              style={{ fontSize: 26 }} variant="h1" color="inherit">
                  Property Trends
              </Typography>
            </div>

            <Paper>
              {value2 === 0 && <MedianRent COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state}/>}
              {value2 === 1 && <HouseSoldPrice COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state}/>}
              <Tabs value={value2} onChange={this.handleChange2} centered
              indicatorColor="primary" textColor="primary" variant="fullWidth">
                <Tab icon={<HomeCity/>} label="Weekly Rent Prices" />
                <Tab icon={<HomeGroup/>} label="Sold Property Prices" />
              </Tabs>
            </Paper>

            </Grid>

            <Demographics suburb_state={suburb_state} suburb={suburb}/>

            <Grid item className="SchoolsContainer">
              <Schools suburb_state={suburb_state} suburb={suburb} key={suburb+suburb_state+'Schools'}/>
            </Grid>

          </Grid>
        </Grid>
        </Slide>

        {/*RHS grid item*/}
        <Slide direction="up" in timeout={1000}>
        <Grid item xs={5}>
        {/*RHS grid container*/}
        {isWideMode && this.getRightContainer(mMap, mNews, url, suburb)}
        </Grid>
        </Slide>
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
