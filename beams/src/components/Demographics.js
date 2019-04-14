import React from 'react';
import 'typeface-roboto';

import '../pages/SuburbPage.css'
import AgeGroupOfPop from '../components/demographics/AgeGroupOfPop'
import CountryOfBirth from '../components/demographics/CountryOfBirth';
import NatureOfOccupancy from '../components/demographics/NatureOfOccupancy';
import TransportToWork from '../components/demographics/TransportToWork';
import { Grid, Typography, Tabs, Tab, Paper } from '@material-ui/core';

import FaceIcon from '@material-ui/icons/Face'
import HomeIcon from '@material-ui/icons/Home'
import CommuteIcon from '@material-ui/icons/Commute'
import { HumanMaleBoy } from 'mdi-material-ui'

import mDG from '../assets/ic_demographics.png'


class Demographics extends React.Component {
    state = {
        value: 0
      };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        const suburb = this.props.suburb;
        const suburb_state = this.props.suburb_state;

        const COLORS = ['#E62927', '#EE6A15', '#213084', '#333F48', '#04091E'];

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
                {value === 0 && <AgeGroupOfPop COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb + suburb_state + 'AgeGroupOfPop'} />}
                {value === 1 && <CountryOfBirth COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb + suburb_state + 'CountryOfBirth'} />}
                {value === 2 && <NatureOfOccupancy COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb + suburb_state + 'NatureOfOccupancy'} />}
                {value === 3 && <TransportToWork COLORS={COLORS} suburb_state={suburb_state} suburb={suburb} key={suburb + suburb_state + 'TransportToWork'} />}
            </Grid>
        );
    }
}

export default Demographics;
