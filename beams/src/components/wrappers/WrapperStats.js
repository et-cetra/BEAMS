import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import MedianRent from '../stats/MedianRent';
import HouseSoldPrice from '../stats/HouseSoldPrice';
import { Grid, Typography, Tabs, Tab, Paper} from '@material-ui/core';

import { HomeCity, HomeGroup } from 'mdi-material-ui'
import mChart from '../../assets/ic_chart.png'


class WrapperStats extends React.Component {
    state = {
      value: 0,
      bedrooms: 0
    };

    handleChange = (event, value) => {
        this.setState({ value, bedrooms: 0 });
    };

    render() {
      const { value, bedrooms } = this.state;
      const suburbs = this.props.suburbs;
      const COLORS = this.props.COLORS;
      const isCompare = this.props.isCompare;
      const suburb = suburbs[0].suburb;

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
          {value === 0 && <MedianRent COLORS={COLORS} isCompare={isCompare} suburbs={suburbs} bedrooms={bedrooms} key={'MedianRent'+suburb}/>}
          {value === 1 && <HouseSoldPrice COLORS={COLORS} isCompare={isCompare} suburbs={suburbs} bedrooms={bedrooms} key={'HouseSoldPrice'+suburb}/>}

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
