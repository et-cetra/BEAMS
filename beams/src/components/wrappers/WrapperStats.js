import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import MedianRent from '../stats/MedianRent';
import HouseSoldPrice from '../stats/HouseSoldPrice';
import { Grid, Typography, Tabs, Tab, Paper, FormControl, Select, MenuItem, Button } from '@material-ui/core';

import { HomeCity, HomeGroup, Hotel } from 'mdi-material-ui'
import mChart from '../../assets/ic_chart.png'
import {getPostcode} from '../../utils.js'
import mDomainLink from '../../assets/ic_domain_link.png'

class WrapperStats extends React.Component {
    state = {
      value: 0,
      bedrooms: 0,
    };

    handleChange = (event, value) => {
      this.setState({ value: value,
       bedrooms: 0});
    };

    handleChangeBedrooms = event => {
      this.setState({ [event.target.name]: event.target.value });
    };

    getListingLink(suburb, suburb_state) {
      var rentbuy = "sale";
      if (this.state.value === 0) rentbuy = "rent";
      const linkstate = suburb_state.toLowerCase();
      const linksuburb = (suburb.toLowerCase()).replace(/ /g,"-");
      const postcode = getPostcode(suburb, suburb_state);

      //e.g. https://www.domain.com.au/sale/parramatta-nsw-2150/?bedrooms=2
      var link = "https://www.domain.com.au/" + rentbuy + "/"+ linksuburb + "-" + linkstate + "-" + postcode + "/";
      if(this.state.bedrooms !== 0) link += "?bedrooms=" + this.state.bedrooms;
      return link;
    }

    render() {
      const { value, bedrooms } = this.state;
      const { suburbs, COLORS, isCompare } = this.props;
      const COLORS2 = [COLORS[1], COLORS[0], COLORS[2], COLORS[3]];

      return (
        <Grid item className="StatsContainer">
        <div className="SubheadingContainer">
          <img src={mChart} className="IconDef" alt="stats"/>
          <Typography align="inherit" inline className="SideText"
          style={{ fontSize: 26 }} variant="h1" color="inherit">
              Property Trends
          </Typography>
          {!isCompare && <div className="DomainLink">
            <Button variant="contained" color="secondary" href={this.getListingLink(suburbs[0].suburb, suburbs[0].suburb_state)} 
            target="_blank" rel="noopener noreferrer">
              View Listings
            <img src={mDomainLink} className="DomainLinkImg" alt="domainLink"/>
            </Button>
          </div>}
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

          {value === 0 && <MedianRent COLORS={isCompare ? COLORS : COLORS2} isCompare={isCompare} suburbs={suburbs} bedrooms={bedrooms} key={'MedianRent'+suburbs[0].suburb+bedrooms}/>}
          {value === 1 && <HouseSoldPrice COLORS={isCompare ? COLORS : COLORS2} isCompare={isCompare} suburbs={suburbs} bedrooms={bedrooms} key={'HouseSoldPrice'+suburbs[0].suburb+bedrooms}/>}

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
