import React from 'react';
import 'typeface-roboto';

import '../../pages/SuburbPage.css'
import QuickSearch from '../QuickSearch.js'
import NearbySuburbs from '../NearbySuburbs.js'
import Info from '../RadarInfo.js'
import { Grid, Typography, Divider, Link, Fade, Paper, Button, Popper } from '@material-ui/core'
import mTerrain from '../../assets/ic_terrain.png'
import mTerrain1 from '../../assets/ic_terrain_1.png'
import mTerrain2 from '../../assets/ic_terrain_2.png'
import Highlights from '../Highlights.js'
import RadarSection from '../highlights/RadarSection';
import { getPostcode } from '../../utils.js';
import { CheckboxMarkedCircle, CloseCircle, MinusCircle, Tooltip, Help } from 'mdi-material-ui';

class WrapperHeader extends React.Component {
  state = {
    'Socioeconomic Status': false,
    'Affordability': false,
    'Education Quality': false,
    'Safety': false,
    isLoaded: false,
    anchorEl: null,
    open: false,
    placement: null,
  }

  handleClick = placement => event => {
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: state.placement !== placement || !state.open, placement,
    }));
  };

  getPriorityRender = (priorityStatus) => {
    if(priorityStatus === -2) return;
    if(this.props.isCompare) return;
    var pIcon, pColor, pMessage, pIsSuggest;
    var priorities = this.props.priorities;
    console.log("priorities", priorities);

    var prioritiesString = "";
    var x = 0;
    var listLength = 0;

    for(var m in priorities) {
      if (priorities[m] === true) {
        listLength++;
      }
    }

    for (var i in priorities) {
      if (priorities[i] === true) {
        if (prioritiesString === "") {
          prioritiesString = prioritiesString + i;
        } else {
          if(listLength - 1 === x)
            prioritiesString = prioritiesString + " and " + i;
          else
            prioritiesString = prioritiesString + ", " + i;
        }

        x++;
      }
    }
    console.log("string", prioritiesString);

    switch (priorityStatus) {
      case 1:
      pIcon = <CheckboxMarkedCircle className="PriorityIcon"/>;
      pColor = "#009688";
      pMessage = `This suburb meets your priorities. Click here to see properties in this area.`
      pIsSuggest = false;
      break;

      case -1:
      pIcon = <CloseCircle className="PriorityIcon"/>;
      pColor = "#D32F2F";
      pMessage = `This suburb does not meet your priorities. For other areas nearby, try out: `
      pIsSuggest = true;
      break;

      default:
      pIcon =  <MinusCircle className="PriorityIcon"/>;
      pColor = "#FFA000";
      pMessage = `This suburb meets some of your priorities. For other areas nearby, try out: `
      pIsSuggest = true;
      break;
    }

    const postcode = getPostcode(this.props.suburbs[0].suburb, this.props.suburbs[0].suburb_state);
    const linkstate = this.props.suburbs[0].suburb_state.toLowerCase();
    const linksuburb = (this.props.suburbs[0].suburb.toLowerCase()).replace(/ /g,"-");
    const link = `https://www.domain.com.au/sale/${linksuburb}-${linkstate}-${postcode}/`;

    const { anchorEl, open, placement } = this.state;
    const id = open ? 'simple-popper' : null;

    return (
      <Paper style={{backgroundColor: pColor, boxShadow: 'none'}} className="PriorityPopup">
        {pIcon}
        
        {/* <Typography style={{color: "white", fontSize: "16px", float: "left"}}>{`You have selected the following priorities: ${prioritiesString}`}</Typography> */}
        {pIsSuggest 
          ? <div>
            {/* {`You have prioritised ${prioritiesString}.`} */}
              <Typography className="PriorityText" style={{color: "white", fontSize: "16px"}}>{pMessage}</Typography>
              <NearbySuburbs suburbs={this.props.suburbs} onSuburbSelect={this.props.onSuburbSelect} priorities={this.props.priorities}/>
            </div>
          : <a href={link} target="_blank" rel="noopener noreferrer"> 
              <Typography className="PriorityText" style={{color: "white", fontSize: "16px"}}>{pMessage}</Typography>
            </a>
        }
      <div className="PriorityPopper">
      <Button aria-describedby={id} variant="text" onClick={this.handleClick('right-start')}
      size="small" color="primary" aria-label="Guide">
        My Priorities
        <Popper id={id} open={open} anchorEl={anchorEl} placement={placement} transition className="PopperContainer">
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper className="PopperInfo">
              <Typography style={{fontSize: "14px"}}>You have prioritised {prioritiesString}.</Typography>
              </Paper>
            </Fade>
          )}
        </Popper>
      </Button>
      </div>
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
          to={subOneRoute} onClick={() => this.props.onSuburbSelect(city(0), this.props.priorities)}>
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
            to={subTwoRoute} onClick={() => this.props.onSuburbSelect(city(1), this.props.priorities)}>
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

      <Info/>
      <br></br>
      <Divider variant="fullWidth"/>
      <br></br>
    </div></Fade>
    );
  }
}

export default WrapperHeader;
