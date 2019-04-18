import React from 'react';
import FamilyFriendly from './highlights/FamilyFriendy';
import HospitalFriendly from './highlights/HospitalFriendly';
import CulturallyDiverse from './highlights/CulturallyDiverse';
import ConvenientTransport from './highlights/ConvenientTransport';
import PrimaryFriendly from './highlights/PrimaryFriendly';
import SecondaryFriendly from './highlights/SecondaryFriendly';
import './Highlights.css'
import { Grid } from '@material-ui/core';

class Highlights extends React.Component {

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
    var align = "flex-start";
    //Align to right for compare side 2
    if(compareColor === "secondary") align = "flex-end";

    return (
      <Grid container direction="column" alignItems={align}>
        <Grid item>
          <FamilyFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state}/>
        </Grid>
        <Grid item>
          <HospitalFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state}/>
        </Grid>
        <Grid item>
          <CulturallyDiverse compareColor={compareColor} suburb={suburb} suburb_state={suburb_state}/>
        </Grid>
        <Grid item>
          <ConvenientTransport compareColor={compareColor} suburb={suburb} suburb_state={suburb_state}/>
        </Grid>
        <Grid item>
          <PrimaryFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state}/>
        </Grid>
        <Grid item>
          <SecondaryFriendly compareColor={compareColor} suburb={suburb} suburb_state={suburb_state}/>
        </Grid>
      </Grid>
    );
  }
}

export default Highlights;
