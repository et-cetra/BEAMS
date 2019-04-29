import React from 'react'
import './SuburbPage.css'
import { Route, Redirect } from "react-router-dom";
import HomePage from './HomePage'

import { Grid, Fade, Slide, Grow, createMuiTheme, MuiThemeProvider } from '@material-ui/core'
import WrapperHeader from '../components/wrappers/WrapperHeader'
import WrapperDG from '../components/wrappers/WrapperDG'
import WrapperStats from '../components/wrappers/WrapperStats'
import WrapperMaps from '../components/wrappers/WrapperMaps'
import WrapperNews from '../components/wrappers/WrapperNews'
import WrapperSchools from '../components/wrappers/WrapperSchools'
import InfoButton from '../components/InfoButton';

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: '#3F51B5',
    },
    secondary: {
      main: '#FF5722',
    },
  },
});

class SuburbPage extends React.Component {
  /* Color scheme, used for graphs */
  COLORS = () => {return([theme.palette.primary.main, theme.palette.secondary.main, '#E62927', '#333F48', '#04091E', '#662daf', '#a02faa'])}

  getSingleSuburb = (suburbs, onSuburbCompare) => {
    const COLORS = this.COLORS();

    return (
      <div className="SingleWholeContainer">
      <WrapperHeader isCompare={false} suburbs={suburbs} onSuburbCompare={onSuburbCompare} 
      COLORS={COLORS} onSuburbSelect={this.props.onSuburbSelect}/>
      <Fade in timeout={750}>
      <Grid container spacing={16} direction="column" justify="flex-start" alignItems="baseline">
      <Grid container spacing={16}
      direction="row"
      justify="flex-start"
      alignItems="flex-start">

        <Slide direction="up" in timeout={800}>
        <Grid item xs={7}>

        {/*LHS grid container*/}
        <Grid className="LeftContainer">
          <WrapperStats suburbs={suburbs} COLORS={COLORS}/>
          <WrapperDG suburbs={suburbs} COLORS={COLORS}/>
        </Grid>
        </Grid>
        </Slide>

        <Slide direction="up" in timeout={1000}>
        <Grid item xs={5}>

        {/*RHS grid container*/}
        <Grid className="RightContainer">
          <Grid item className="MapsContainer">
            <WrapperMaps suburb={suburbs[0].suburb}/>
            <WrapperNews suburb={suburbs[0].suburb} suburb_state={suburbs[0].suburb_state}/> 
          </Grid>
        </Grid>

      
        </Grid>
        
        </Slide> 
        <Grid item xs={12} className="SchoolsContainer">
          <WrapperSchools suburbs={suburbs} isCompare={false}/>
         </Grid>
      </Grid>
      </Grid>
      </Fade>
      </div>
    )
  }

  getMultiSuburb = (suburbs) => {
    const COLORS = this.COLORS();

    return(
      <div className="MultiWholeContainer" >
      <WrapperHeader isCompare={true} suburbs={suburbs} 
      COLORS={COLORS} onSuburbSelect={this.props.onSuburbSelect}/>
      <Grow in timeout={750}>
        <Grid container spacing={16} direction="column" justify="flex-start" alignItems="stretch">
          <Grid item>
            <WrapperStats isCompare={true} suburbs={suburbs} COLORS={COLORS}/>
          </Grid>
          <Grid item>
            <WrapperDG isCompare={true} suburbs={suburbs} COLORS={COLORS}/>
          </Grid>
          <Grid item>
            <WrapperSchools suburbs={suburbs} isCompare={true}/>
          </Grid>
        </Grid>
      </Grow>
      </div>
    )
  }

  render() {
    const isCompare = this.props.isCompare;
    const suburbs = this.props.suburbs;

    if (suburbs[0].suburb != null) {
      const onSuburbCompare = this.props.onSuburbCompare;
      return (
        <MuiThemeProvider theme={theme}>
        <div className="ParentContainer">
          {/*Single vs Multi Suburb Display*/}
          {isCompare ? this.getMultiSuburb(suburbs) : this.getSingleSuburb(suburbs, onSuburbCompare)}
          <InfoButton message={'Data sourced from GNews, Domain, Google Maps, Mapquest and ABS'}/>
        </div>
        </MuiThemeProvider>
      );
  } else {
    return (
      <Route exact path="/suburb" render={() => ("/suburb"  !== "/" ? <Redirect to={"/"} /> :
        <HomePage/>)} />
    )
  }
}
}

export default SuburbPage;
