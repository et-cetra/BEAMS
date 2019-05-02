import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import MedianRent from '../stats/MedianRent';
import HouseSoldPrice from '../stats/HouseSoldPrice';
import { Grid, Typography, Tabs, Tab, Paper } from '@material-ui/core';

import { HomeCity, HomeGroup } from 'mdi-material-ui'
import mChart from '../../assets/ic_chart.png'
import {getPostcode} from '../../utils.js'

class WrapperStats extends React.Component {
    state = {
      value: 0,
      postcode: 0
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    async resolvePostcode() {
        const postcode = await getPostcode(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);
        return postcode;
    }

    async componentDidMount() {
        const result = await this.resolvePostcode(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);
        this.setState({
            postcode: result
        });
    }

    render() {
      const { value } = this.state;
      const rentbuy = "sale";
      if (value === 0) {
          const rentbuy = "rent";
      }
      const suburbs = this.props.suburbs;
      const COLORS = this.props.COLORS;
      const isCompare = this.props.isCompare;
      const suburb = suburbs[0].suburb;
      const linkstate = suburbs[0].suburb_state.toLowerCase();
      const linksuburb = (suburb.toLowerCase()).replace(/ /g,"-");
      const postcode = this.state.postcode

      //const bedrooms =
      //e.g. https://www.domain.com.au/sale/parramatta-nsw-2150/?ptype=apartment&bedrooms=2
     // var link = "https://www.domain.com.au/" + value + "/"+ linksuburb + "-" + linkstate + "-" + postcode + "/" + "bedrooms=" + bedrooms
      var link = "https://www.domain.com.au/" + rentbuy + "/"+ linksuburb + "-" + linkstate + "-" + postcode + "/"

      return (
        <Grid item className="StatsContainer">
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

        <a href={link}>View property listings on domain.com</a>

        </Grid>
      );
    }
}

export default WrapperStats;
