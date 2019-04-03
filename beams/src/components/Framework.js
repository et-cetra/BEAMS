//Uses 'App.css' for style
import React from 'react';
import { Grid, AppBar, Toolbar, Typography, createMuiTheme, MuiThemeProvider } from '@material-ui/core';
import 'typeface-roboto';
import mBannerSm from '../assets/ic_banner_small.png'
import QuickSearch from "./QuickSearch"
import PinIcon from '@material-ui/icons/LocationOn'

const theme = createMuiTheme({
  //shadows: ["none"],
  palette: {
    primary: {
      main: '#04091E',
    },
    secondary: {
      light: '#EE6A15',
      main: '#E62927',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffffff',
    },
    // error: will use default color
  },
});


class Framework extends React.Component {
  render() {
    return (

    /*
    //
    // Materials Framework
    //
    */

     <MuiThemeProvider theme={theme}>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
      <AppBar position="static" className="AppBar" color="primary">
        <Toolbar className="Toolbar">
        <Grid className="HeadingContainer">
        
        <PinIcon fontSize="large" className="PinIcon"></PinIcon>

          <Grid item className="HeadingBox">
            <Typography style={{ fontSize: 30 }} className="HeadingMain" variant="h1" color="inherit" noWrap>
              BEAMS
            </Typography>
          </Grid>
          
          <Grid item className="SubHeadingBox">
          <Typography variant="overline" color="inherit">
            Suburb analysis
          </Typography>
          </Grid>

          <Grid container spacing={12} direction="row" justify="flex-end"
          alignItems="center" className="LogoContainer">
            <QuickSearch onSelect={this.props.onSelect}></QuickSearch>
            <Grid item>
              <img src={mBannerSm} width="160" height="97"/>
            </Grid>
          </Grid>

          
        </Grid>
        </Toolbar>
      </AppBar>
      </MuiThemeProvider>

      

    );
  }
}

export default Framework;
