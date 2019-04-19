import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import { Grid, Typography, Divider, Link } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'
import mTerrain1 from '../../assets/ic_terrain_1.png'
import mTerrain2 from '../../assets/ic_terrain_2.png'
import Highlights from '../Highlights.js'
import RadarSection from '../highlights/RadarSection';

class WrapperHeader extends React.Component {

    render() {
      const suburbs = this.props.suburbs;
      const onSuburbCompare = this.props.onSuburbCompare;
      const isCompare = this.props.isCompare;
      var compareColorSet = "default";
      if (isCompare) compareColorSet = "primary";
      
      //Routing
      const subOneRoute = "/suburb/" + suburbs[0].suburb + "/" + suburbs[0].suburb_state;
      const city = (idx) => suburbs[idx].suburb + " " + suburbs[idx].suburb_state + " Australia";
      var subTwoRoute = null;
      if (suburbs.length !== 1) {
        subTwoRoute = "/suburb/" + suburbs[1].suburb + "/" + suburbs[1].suburb_state;
      }

      return (
      <div>
          {!isCompare ?
            <img src={mTerrain} className="IconMain" alt="terrain"/>
            :
            <img src={mTerrain1} className="IconMain" alt="terrain"/>
          }

          {!isCompare ?
            <Typography align="left" inline className="MainText"
              style={{ fontSize: 34 }} variant="overline" color="inherit">
              {`${suburbs[0].suburb}, ${suburbs[0].suburb_state}`}
            </Typography>
            :
            <Link style={{cursor: "pointer"}} color="textPrimary" underline="none" 
              to={subOneRoute} onClick={() => this.props.onSuburbSelect(city(0))}>
              <Typography align="left" inline className="MainText" 
                style={{ fontSize: 34 }} variant="overline" color="inherit">
                {`${suburbs[0].suburb}, ${suburbs[0].suburb_state}`}
              </Typography>
            </Link>
          }

          {!isCompare ?
            <div className="CompareSearchContainer">
              <QuickSearch suburb={suburbs[0].suburb} isSuburbPage={true} onSuburbSelect={onSuburbCompare}/>
            </div>
            :
            <div className="HeadingR">
              <Link style={{cursor: "pointer"}} color="textPrimary" underline="none" 
                to={subTwoRoute} onClick={() => this.props.onSuburbSelect(city(1))}>
                <Typography align="right" inline className="MainTextR" 
                  style={{ fontSize: 34 }} variant="overline" color="inherit">
                  {`${suburbs[1].suburb}, ${suburbs[1].suburb_state}`}
                </Typography>
              </Link>
              <img src={mTerrain2} className="IconMainR" alt="terrain"/>
            </div>
            }
          
          <Grid container spacing={8} direction="row" justify="center" alignItems="center">
            <Grid item>
              <Highlights suburb={suburbs[0].suburb} suburb_state={suburbs[0].suburb_state} 
                key={suburbs[0].suburb+suburbs[0].suburb_state+'Highlights'} compareColor={compareColorSet}/>
            </Grid>
            
            <Grid item>
              <RadarSection suburbs={suburbs} COLORS={this.props.COLORS} key={suburbs[0].suburb+'Radar'}/>
            </Grid>

            {isCompare && 
              <Grid item>
                <Highlights suburb={suburbs[1].suburb} suburb_state={suburbs[1].suburb_state} 
                key={suburbs[1].suburb+suburbs[1].suburb_state+'Highlights'} compareColor="secondary"/>
              </Grid>
            }

          </Grid>

          <br></br>
          <Divider variant="fullWidth"/>
          <br></br>
      </div>
      );
    }
}

export default WrapperHeader;
