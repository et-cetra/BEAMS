import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import { Grid, Typography, Divider, Link } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'
import mTerrain1 from '../../assets/ic_terrain_1.png'
import mTerrain2 from '../../assets/ic_terrain_2.png'

class WrapperHeader extends React.Component {
    render() {
      const suburbs = this.props.suburbs;
      const onSuburbCompare = this.props.onSuburbCompare;
      const isCompare = this.props.isCompare;
      const subOneRoute = "/suburb/" + suburbs[0].suburb + "/" + suburbs[0].suburb_state;
      return (
      <div>
          {!isCompare ?
            <img src={mTerrain} className="IconMain" alt="terrain"/>
            :
            <img src={mTerrain1} className="IconMain" alt="terrain"/>
          }
          <Link to={subOneRoute} onClick={this.props.onStartOver}><Typography align="left" inline className="MainText"
          style={{ fontSize: 34 }} variant="overline" color="inherit">
            {`${suburbs[0].suburb}, ${suburbs[0].suburb_state}`}
          </Typography></Link>
          {!isCompare ?
            <div className="CompareSearchContainer">
              <QuickSearch suburb={suburbs[0].suburb} isSuburbPage={true} onSelect={onSuburbCompare}/>
            </div>
            :
            <div className="HeadingR">
              <Typography align="right" inline className="MainTextR"
              style={{ fontSize: 34 }} variant="overline" color="inherit">
                {`${suburbs[1].suburb}, ${suburbs[1].suburb_state}`}
              </Typography>
              <img src={mTerrain2} className="IconMainR" alt="terrain"/>
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
