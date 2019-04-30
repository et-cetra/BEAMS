import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import MedianRent from '../stats/MedianRent';
import HouseSoldPrice from '../stats/HouseSoldPrice';
import { Grid, Typography, Tabs, Tab, Paper } from '@material-ui/core';

import { HomeCity, HomeGroup } from 'mdi-material-ui'
import mChart from '../../assets/ic_chart.png'
import DomainLink from '../DomainLink'

class WrapperStats extends React.Component {
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
        <DomainLink salerent={this.state.value} />

        <Grid item className="StatsContainer" >
        <div className="SubheadingContainer">
          <img src={mChart} className="IconDef" alt="stats"/>
          <Typography align="inherit" inline className="SideText"
          style={{ fontSize: 26 }} variant="h1" color="inherit">
              Property Trends
          </Typography>
        </div>

        <Paper>
          {value === 0 && <MedianRent COLORS={COLORS} isCompare={isCompare} suburbs={suburbs} key={'MedianRent'+suburb}/>}
          {value === 1 && <HouseSoldPrice COLORS={COLORS} isCompare={isCompare} suburbs={suburbs} key={'HouseSoldPrice'+suburb}/>}

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
