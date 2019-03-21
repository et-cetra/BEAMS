import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage"
import SuburbPage from "./pages/SuburbPage";
import './App.css';
import { Grid, Paper, AppBar, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider, Divider, InputBase } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import createTypography from '@material-ui/core/styles/createTypography';
import 'typeface-roboto';
import mLogo from './assets/ic_logo_white.png'
import mBanner from './assets/ic_banner.png'
import mBannerSm from './assets/ic_banner_small.png'

import Search from "./components/search"
import Framework from './components/Framework';


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

class App extends Component {

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
    const redirect = this.state.route;
    return (
      <div>      
        <Framework/>
        <Grid container
        direction="column"
        justify="flex-start"
        alignItems="center">
          <Grid item className="ContentHolderMain">
          Content goes here

            <div className="QuickSearch">
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" render={() => (redirect && redirect !== "/" ? <Redirect to={redirect} /> : <HomePage onSelect={this.onSuburbSelect} />)} />
                  <Route exact path="/suburb" render={() => (redirect && redirect !== "/suburb" ? <Redirect to={redirect} /> : <SuburbPage suburb={this.state.suburb} onStartOver={this.onStartOver} />)} />
                </Switch>
              </BrowserRouter>
            </div>
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default App;
