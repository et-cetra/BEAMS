import React, { Component } from 'react';
import { Grid, Paper, AppBar, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider, Divider, InputBase, Fade } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import createTypography from '@material-ui/core/styles/createTypography';
import 'typeface-roboto';
import mLogo from '../assets/ic_logo_white.png'
import mBannerSm from '../assets/ic_banner_small.png'
import Search from "./search"


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
    // error: will use the default color
  },
});


class Framework extends React.Component {
  
  render() {
    return (

    /*
    //
    //Materials Framework
    //
    */

     <MuiThemeProvider theme={theme}>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500"/>
      <AppBar position="static" className="AppBar" color="primary">
        <Toolbar className="Toolbar">
        <Grid className="HeadingContainer">
          <Grid className="HeadingBox">
          <Typography style={{ fontSize: 30 }} className="HeadingMain" variant="h1" color="inherit" noWrap>
            BEAMS
          </Typography>
          </Grid>

          <Grid container
          spacing={24}
          direction="row"
          justify="flex-end"
          alignItems="center"
          className="LogoContainer">

            <Grid item className="QuickSearchBox">
            <Grid container
                spacing={24}
                direction="row"
                justify="flex-end"
                alignItems="center">
                  <SearchIcon fontSize="large"/>
                  <div flexGrow="1" />
                  <InputBase placeholder="Search…"/>
              </Grid>
            </Grid>
 
            <Grid item>
              <img src={mBannerSm} width="140" height="97"/>
            </Grid>
          </Grid>

          <Grid className="SubHeadingBox">
          <Typography variant="overline" color="inherit">
            Property and suburb analysis
          </Typography>
          </Grid>
          
        </Grid>
        </Toolbar>
      </AppBar>


      </MuiThemeProvider>

    );
  }
}

export default Framework;
