import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage"
import SuburbPage from "./pages/SuburbPage";
import './App.css';
import { Grid, Paper, AppBar, Toolbar, IconButton, Typography, createMuiTheme, MuiThemeProvider, Divider, InputBase, Slide } from '@material-ui/core';
import 'typeface-roboto';
import Framework from './components/Framework';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suburb: null,
      route: null,
    };
  }
  
  onSuburbSelect = (city) => {
    this.setState(() => ({ suburb: city, route: '/suburb'}));
  };

  onStartOver = () => {
    console.log('Start over!');
    this.setState(() => {
      return ({ suburb: null, route: '/'});
    });
  };

  render() {
    const redirect = this.state.route;
    return (
      <div>
      <Framework onSelect={this.onSuburbSelect}/>
      <Grid container className="ContentHolderMain" direction="column" justify="center" alignItems="center">
          <Grid item>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" render={() => (redirect && redirect !== "/" ? <Redirect to={redirect} /> : <HomePage onSelect={this.onSuburbSelect}/>)} />
                  <Route exact path="/suburb" render={() => (redirect && redirect !== "/suburb" ? <Redirect to={redirect} /> : <SuburbPage suburb={this.state.suburb} onStartOver={this.onStartOver} />)} />
                </Switch>
              </BrowserRouter>
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default App;
