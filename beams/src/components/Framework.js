import React from 'react';
import { Grid, Paper, AppBar, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider, Divider, InputBase, Fade } from '@material-ui/core';
import 'typeface-roboto';
import SuburbPage from '../pages/SuburbPage';
import mBannerSm from '../assets/ic_banner_small.png'
import QuickSearch from "./QuickSearch"
import HomePage from '../pages/HomePage';


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
  
  constructor(props) {
    super(props);

    this.state = {
      suburb: null,
      route: null
    };
  }

  onSuburbSelect = (city) => {
    this.setState(() => ({ suburb: city, route: '/suburb' }));
  };

  onStartOver = () => {
    console.log('Start over!');
    this.setState(() => {
      return ({ suburb: null, route: '/' });
    });
  };

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

            <Grid container spacing={12} direction="row" justify="flex-end"
            alignItems="center" className="LogoContainer">
              <QuickSearch onSelect={this.props.onSelect}></QuickSearch>
              <Grid item>
                <img src={mBannerSm} width="168" height="97"/>
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
