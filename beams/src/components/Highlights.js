import React from 'react';
import FamilyFriendly from './highlights/FamilyFriendly';
import RetirementFriendly from './highlights/RetirementFriendly';
import HospitalFriendly from './highlights/HospitalFriendly';
import CulturallyDiverse from './highlights/CulturallyDiverse';
import CommuteFriendly from './highlights/CommuteFriendly';
import PrimaryFriendly from './highlights/PrimaryFriendly';
import SecondaryFriendly from './highlights/SecondaryFriendly';
import SchoolFriendly from './highlights/SchoolFriendly';
import Crime from './highlights/Crime';
import './Highlights.css'
import { Grid } from '@material-ui/core';
import { getDemographics } from '../utils.js'
import { CircularProgress } from '@material-ui/core'

class Highlights extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        demoStats: null,
        isLoaded: false
    };
  }

  async componentDidMount() {
    const demoStats = await getDemographics(this.props.suburb, this.props.suburb_state);

    this.setState({
      demoStats: demoStats,
      isLoaded: true
    });
  }
  // If above 0-4 is above 5% give tag 'Family Friendly'
  // If more than 40% of transport is not walking or car give tag 'Convenient Transport'
  // If there are less than 40% of Australians give tag 'Culturally Diverse'
  // If 2 or more government primary schools in the area, give tag 'Primary Education Friendly'
  // If 2 or more government high schools in the area, give tag 'High School Education Friendly'

  // Main component to hold small highlight components together

  render() {
    const suburb = this.props.suburb;
    const suburb_state = this.props.suburb_state;
    const compareColor = this.props.compareColor;
    const demoStats = this.state.demoStats;
    const isLoaded = this.state.isLoaded;
    var align = "flex-start";
    //Align to right for compare side 2
    if(compareColor === "secondary") align = "flex-end";
    if (isLoaded) {
    return (
      <Grid container direction="column" alignItems={align}>
        <Grid item>
          <FamilyFriendly stats={demoStats} compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Family'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <RetirementFriendly stats={demoStats} compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Retire'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <HospitalFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Hospital'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <CulturallyDiverse stats={demoStats} compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Culture'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <PrimaryFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Primary'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <SecondaryFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Secondary'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <SchoolFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'School'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <Crime compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Crime'+suburb+suburb_state}/>
        </Grid>
        <Grid item>
          <CommuteFriendly stats={demoStats} compareColor={compareColor} suburb={suburb} suburb_state={suburb_state} key={'Commute'+suburb+suburb_state}/>
        </Grid>
      </Grid>
    )} else {
      return (
        <CircularProgress size={60} color="primary"/>
      )
    }
  }
}

export default Highlights;
