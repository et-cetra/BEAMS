import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import { Grid, Typography, Divider } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'

class WrapperHeader extends React.Component {
    render() {
      const suburb = this.props.suburb;
      const onSuburbCompare = this.props.onSuburbCompare;
      return (
      <div>

          <img src={mTerrain} className="IconMain" alt="terrain"/>
          <Typography align="inherit" inline className="MainText" style={{ fontSize: 40 }} variant="h1" color="inherit">
            {suburb}
          </Typography>
          <div className="CompareSearchContainer">
            <QuickSearch suburb={suburb} isSuburbPage={true} onSelect={onSuburbCompare}/>
          </div>

          <br></br>
          <Divider variant="fullWidth"/>
          <br></br>
        
      </div>
      );
    }
}

export default WrapperHeader;
