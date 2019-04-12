import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SuburbPage from "./pages/SuburbPage";
import './App.css';
import './pages/SuburbPage.css'
import { Grid } from '@material-ui/core';
import 'typeface-roboto';
import Framework from './components/Framework';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suburb: null,
      suburb_state: null,
      route: null,
    };
  }

  onSuburbSelect = (city) => {
    let re = /[A-Z]{3}|[A-Z]{2}/;
    var suburb_state = city.match(re)[0];
    var suburb = city.split(re)[0];
    suburb = suburb.slice(0, -1);

    this.setState(() => ({ suburb: suburb, suburb_state: suburb_state, route: "/suburb"}));
  };

  onStartOver = () => {
    this.setState(() => ({ suburb: null, route: '/' }));
  };

  render() {
    const redirect = this.state.route;

    return (
      <div>
      <Framework onSelect={this.onSuburbSelect} onStartOver={this.onStartOver}/>
      <Grid container className="ContentHolderMain" direction="column" justify="center" alignItems="center">
          <Grid item>
              <BrowserRouter>
                <Switch>
                  <Route exact path="/" render={() => (redirect && redirect !== "/" ? <Redirect to={redirect} /> : 
                      <HomePage onSelect={this.onSuburbSelect}/>)} />
                  <Route exact path="/suburb" render={() => (redirect && redirect !== "/suburb" ? <Redirect to={redirect} /> : 
                      <SuburbPage suburb={this.state.suburb} suburb_state={this.state.suburb_state} onStartOver={this.onStartOver}/>)} />
                </Switch>
              </BrowserRouter>
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default App;
