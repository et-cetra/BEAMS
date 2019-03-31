import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SuburbPage from "./pages/SuburbPage";
import './App.css';
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

    // Parsing city string into suburb and suburb_state
    var suburb = null;
    var suburb_state = null;
    var subTokens = city.split(" ");
    if (subTokens.length > 3) {
      suburb = subTokens[0] + " " + subTokens[1];
      suburb_state = subTokens[2].slice(0, -1);
    } else {
      suburb = subTokens[0];
      suburb_state = subTokens[1].slice(0, -1);
    }

    // console.log("Suburb", suburb);
    // console.log("State", suburb_state);
    this.setState(() => ({ suburb: suburb, suburb_state: suburb_state, route: '/suburb' }));
  };

  onStartOver = () => {
    this.setState(() => ({ suburb: null, route: '/' }));
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
                  <Route exact path="/suburb" render={() => (redirect && redirect !== "/suburb" ? <Redirect to={redirect} /> : <SuburbPage suburb={this.state.suburb} suburb_state={this.state.suburb_state} onStartOver={this.onStartOver} />)} />
                </Switch>
              </BrowserRouter>
          </Grid>
      </Grid>
    </div>
    );
  }
}

export default App;
