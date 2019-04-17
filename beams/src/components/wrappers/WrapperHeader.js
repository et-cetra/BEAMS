import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import { Grid, Typography, Divider } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'

class WrapperHeader extends React.Component {
    render() {
      const suburbs = this.props.suburbs;
      const onSuburbCompare = this.props.onSuburbCompare;
      const isCompare = this.props.isCompare;
      return (
      <div>
          <img src={mTerrain} className="IconMain" alt="terrain"/>
          <Typography align="left" inline className="MainText" 
          style={{ fontSize: 36 }} variant="overline" color="inherit">
            {`${suburbs[0].suburb}, ${suburbs[0].suburb_state}`}
          </Typography>
          {!isCompare ? 
            <div className="CompareSearchContainer">
              <QuickSearch suburb={suburbs[0].suburb} isSuburbPage={true} onSelect={onSuburbCompare}/>
            </div>
            : 
            <div className="HeadingR">
              <Typography align="right" className="MainTextR" 
              style={{ fontSize: 36 }} variant="overline" color="inherit">
                {`${suburbs[1].suburb}, ${suburbs[1].suburb_state}`}
              </Typography>
              <img src={mTerrain} className="IconMain" alt="terrain"/>
            </div>
            }
          

          <br></br>
          <Divider variant="fullWidth"/>
          <br></br>
        
      </div>
      );
    }
}

export default WrapperHeader;
