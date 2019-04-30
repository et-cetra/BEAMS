import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import NearbySuburbs from '../NearbySuburbs.js'

import { Grid, Typography, Divider, Link, Fade, Paper } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'
import mTerrain1 from '../../assets/ic_terrain_1.png'
import mTerrain2 from '../../assets/ic_terrain_2.png'
import Highlights from '../Highlights.js'
import RadarSection from '../highlights/RadarSection';
import { CheckboxMarkedCircle, CloseCircle, MinusCircle } from 'mdi-material-ui';

class WrapperHeader extends React.Component {
  state = {
    'Socioeconomic Status': false,
    'Affordability': false,
    'Education Quality': false,
    'Safety': false,
    isLoaded: false,
  }

  getPriorityRender = (priorityStatus) => {
    if(priorityStatus === -2) return;
    var pIcon, pColor, pMessage, pIsSuggest;
    switch (priorityStatus) {
      case 1:
      pIcon = <CheckboxMarkedCircle className="PriorityIcon"/>;
      pColor = "#009688";
      pMessage = "This suburb meets your priorities. Click here to see properties in this area."
      break;
      
      case -1:
      pIcon = <CloseCircle className="PriorityIcon"/>;
      pColor = "#D32F2F";
      pMessage = "This suburb does not meet your priorities. For suitable areas nearby, consider: "
      break;  

      default: 
      pIcon =  <MinusCircle className="PriorityIcon"/>;
      pColor = "#FFA000";
      pMessage = "This suburb meets some of your priorities. For more suitable areas nearby, consider: "
      break;
    }

    return (
      <Paper style={{backgroundColor: pColor, boxShadow: 'none'}} className="PriorityPopup">
        {pIcon}
        <Typography style={{color: "white", fontSize: "16px"}}>{pMessage}</Typography>
        {/* <NearbySuburbs suburbs={this.props.suburbs}/> */}
      </Paper>
    )
  }

  onCalc = (radarData) => {
    this.setState({
      'Socioeconomic Status': radarData.seRating >= 5 ? true : false,
      'Affordability': radarData.priceRating >= 5 ? true : false,
      'Education Quality': radarData.educationRating >= 5 ? true : false,
      'Safety': radarData.wellbeingRating >= 5 ? true : false,
      isLoaded: radarData.isLoaded,
    })
  }

  //1 == good, 0 == some missing, -1 == all missing, -2 == none set, no popup
  satisfiesPriorities() {
    var priorityTotal = 0;
    var priorityHits = 0;
    for (const [key, value] of Object.entries(this.props.priorities)) {
      if(value === true) priorityTotal++;
    }

    if(priorityTotal === 0) return -2;

    for (const [key, value] of Object.entries(this.state)) {
      if(value === true && this.props.priorities[key] === true) priorityHits++;
    }
    
    if(priorityHits === priorityTotal) return 1;
    if(priorityHits === 0) return -1;
    return 0;
  }

  render() {
    const { suburbs, onSuburbCompare, isCompare } = this.props;
    var compareColorSet = "default";
    if (isCompare) compareColorSet = "primary";

    //Only set if available, otherwise set to -2 (i.e unavailable)
    var priorityStatus = this.satisfiesPriorities();
    
    //Routing
    const subOneRoute = "/suburb/" + suburbs[0].suburb + "/" + suburbs[0].suburb_state;
    const city = (idx) => suburbs[idx].suburb + " " + suburbs[idx].suburb_state + " Australia";
    var subTwoRoute = null;
    if (suburbs.length !== 1) subTwoRoute = "/suburb/" + suburbs[1].suburb + "/" + suburbs[1].suburb_state;

    return (
    <Fade in timeout={1000}><div>
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

      {/* PriorityBanner */}
      {this.state.isLoaded && this.getPriorityRender(priorityStatus)}
      
      <Grid container spacing={24} direction="row" justify="space-around" alignItems="center">
        <Grid item>
          <Highlights suburb={suburbs[0].suburb} suburb_state={suburbs[0].suburb_state} 
            key={suburbs[0].suburb+suburbs[0].suburb_state+'Highlights'} compareColor={compareColorSet}/>
        </Grid>
        
        <Grid item>
        {!isCompare ?
          <RadarSection onCalc={this.onCalc} suburbs={suburbs} COLORS={this.props.COLORS} key={suburbs[0].suburb+suburbs[0].suburb_state+'Radar'}/>
          :
          <RadarSection onCalc={this.onCalc} isCompare={true} suburbs={suburbs} COLORS={this.props.COLORS} key={suburbs[0].suburb+suburbs[1].suburb+'Radar'}/>
        }

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
    </div></Fade>
    );
  }
}

export default WrapperHeader;
