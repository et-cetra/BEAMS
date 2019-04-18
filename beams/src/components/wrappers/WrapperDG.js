import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import AgeGroupOfPop from '../demographics/AgeGroupOfPop'
import CountryOfBirth from '../demographics/CountryOfBirth';
import NatureOfOccupancy from '../demographics/NatureOfOccupancy';
import TransportToWork from '../demographics/TransportToWork';
import { Grid, Typography, Tabs, Tab, Paper } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face'
import HomeIcon from '@material-ui/icons/Home'
import CommuteIcon from '@material-ui/icons/Commute'
import { HumanMaleBoy } from 'mdi-material-ui'
import mDG from '../../assets/ic_demographics.png'


class WrapperDG extends React.Component {
    state = {
      value: 0
    };

    handleChange = (event, value) => {
      this.setState({ value });
    };

    render() {
      const { value } = this.state;
      const suburbs = this.props.suburbs;
      const COLORS = this.props.COLORS;
      const isCompare = this.props.isCompare;
      const suburb = suburbs[0].suburb;

      return (
        <Grid item className="DGContainer" >
          <div className="SubheadingContainer">
            <img src={mDG} className="IconDef" alt="demographics" />
            <Typography align="inherit" inline className="SideText"
              style={{ fontSize: 26 }} variant="h1" color="inherit">
              Demographics
            </Typography>
          </div>
          <Paper square>
            <Tabs value={value} onChange={this.handleChange} centered
              indicatorColor="primary" textColor="primary" variant="fullWidth">
              <Tab icon={<HumanMaleBoy />} label="Age Distribution" />
              <Tab icon={<FaceIcon />} label="Cultural Diversity" />
              <Tab icon={<HomeIcon />} label="Property Occupancy" />
              <Tab icon={<CommuteIcon />} label="Commute Methods" />
            </Tabs>
          </Paper>
          {value === 0 && <AgeGroupOfPop COLORS={COLORS} suburbs={suburbs} isCompare={isCompare} key={'AgeGroupOfPop'+suburb}/>}
          {value === 1 && <CountryOfBirth COLORS={COLORS} suburbs={suburbs} isCompare={isCompare} key={'CountryOfBirth'+suburb}/>}
          {value === 2 && <NatureOfOccupancy COLORS={COLORS} suburbs={suburbs} isCompare={isCompare} key={'NatureOfOccupancy'+suburb}/>}
          {value === 3 && <TransportToWork COLORS={COLORS} suburbs={suburbs} isCompare={isCompare} key={'TransportToWork'+suburb}/>}
        </Grid>
      );
    }
}

export default WrapperDG;
