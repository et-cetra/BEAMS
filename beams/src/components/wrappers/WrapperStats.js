import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import MedianRent from '../stats/MedianRent';
import HouseSoldPrice from '../stats/HouseSoldPrice';
import { Grid, Typography, Tabs, Tab, Paper, FormControl, InputLabel, Select, MenuItem, OutlinedInput, FormHelperText } from '@material-ui/core';

import { HomeCity, HomeGroup, Hotel } from 'mdi-material-ui'
import mChart from '../../assets/ic_chart.png'


class WrapperStats extends React.Component {
    state = {
      value: 0,
      bedrooms: 0
    };

    handleChange = (event, value) => {
      this.setState({ value: value,
       bedrooms: 0});
    };

    handleChangeBedrooms = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    render() {
      const { value, bedrooms } = this.state;
      const suburbs = this.props.suburbs;
      const COLORS = this.props.COLORS;
      const isCompare = this.props.isCompare;
      const suburb = suburbs[0].suburb;
      console.log("ROOMS: ", bedrooms);

      return (
        <Grid item className="StatsContainer" >
        <div className="SubheadingContainer">
          <img src={mChart} className="IconDef" alt="stats"/>
          <Typography align="inherit" inline className="SideText"
          style={{ fontSize: 26 }} variant="h1" color="inherit">
              Property Trends
          </Typography>
        </div>

        <Paper>
          <div className={!isCompare ? "BedroomSelect" : "BedroomSelectCompare"}>
          <Hotel className="BedroomIcon"/>
          <FormControl variant="filled" className="BedroomForm">
            <Select value={this.state.bedrooms} onChange={this.handleChangeBedrooms}
              inputProps={{name: 'bedrooms', id: 'bedrooms-simple'}}>
  
              <MenuItem value={0}>All bedrooms</MenuItem>
              {value === 0 && <MenuItem value={1}>1 bedroom</MenuItem>}
              <MenuItem value={2}>2 bedrooms</MenuItem>
              <MenuItem value={3}>3 bedrooms</MenuItem>
              {value === 1 && <MenuItem value={4}>4 bedrooms</MenuItem>}
            </Select>
          </FormControl>
          </div>

          {value === 0 && <MedianRent COLORS={COLORS} isCompare={isCompare} suburbs={suburbs} bedrooms={bedrooms} key={'MedianRent'+suburb+bedrooms}/>}
          {value === 1 && <HouseSoldPrice COLORS={COLORS} isCompare={isCompare} suburbs={suburbs} bedrooms={bedrooms} key={'HouseSoldPrice'+suburb+bedrooms}/>}

          <Tabs value={value} onChange={this.handleChange} centered
          indicatorColor="primary" textColor="primary" variant="fullWidth">
            <Tab icon={<HomeCity/>} label="Weekly Rent Prices" />
            <Tab icon={<HomeGroup/>} label="Sold Property Prices" />
          </Tabs>
        </Paper>

        </Grid>
      );
    }
}

export default WrapperStats;
