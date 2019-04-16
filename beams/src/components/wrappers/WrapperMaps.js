import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import { Typography } from '@material-ui/core';

import mMap from '../../assets/ic_map.png'

class WrapperMaps extends React.Component {
    render() {
      const suburb = this.props.suburb;
      const url = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDIMGCB2qSD9qIB0mrZu0uGEmZlc9e8m-Y&q=${suburb}`;
      return(
      <div>
       <img src={mMap} className="IconDef" alt="map" />
          <Typography align="inherit" inline className="SideText" style={{ fontSize: 26 }} variant="h1" color="inherit">
            Maps
          </Typography>
        <iframe className="GMapsMain" frameBorder="0" src={url} allowFullScreen title="GMaps" />
      </div>
      );
    }
}

export default WrapperMaps;
