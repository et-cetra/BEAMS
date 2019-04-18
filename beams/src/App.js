import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import './App.css';
import './pages/SuburbPage.css'
import 'typeface-roboto';
import { Grid } from '@material-ui/core';

import Framework from './components/Framework';
import HomePage from "./pages/HomePage"
import CompareController from './components/CompareController';

// export const BeamsContext = React.createContext({ suburb: null, suburb_state: null });

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      suburbs: [{ suburb: null, suburb_state: null }],
      route: null,
      reset: false,
    };

    this.onSuburbSelect = this.onSuburbSelect.bind(this);

  }

  onSuburbSelect = (city) => {
    console.log("the city is", city);
    var { suburb, suburb_state } = this.parseCity(city);

    // Make copy of this.state.suburbs
    let suburbs = [...this.state.suburbs];
    // Change it
    suburbs[0].suburb = suburb;
    suburbs[0].suburb_state = suburb_state;
    // Upload it
    const route = "/suburb/" + suburb + "/" + suburb_state;
    this.setState(() => ({ suburbs: suburbs, route: route}));
  };

  onSuburbCompare = (city) => {
    var { suburb, suburb_state } = this.parseCity(city);
    let suburbs = [this.state.suburbs[0], { suburb, suburb_state }];
    const route = "/compare/" + this.state.suburbs[0].suburb + "/" + this.state.suburbs[0].suburb_state + "/" + suburb + "/" + suburb_state;
    this.setState(() => ({ suburbs: suburbs, route: route}));
  }

  onStartOver = () => {
    this.setState(() => ({ suburbs: [{ suburb: null, suburb_state: null }], route: '/', reset: false }));
  };

  parseCity(city) {
    let re = /[A-Z]{3}|[A-Z]{2}/;
    var suburb_state = city.match(re)[0];
    var suburb = city.split(re)[0];
    suburb = suburb.slice(0, -1);
    return { suburb, suburb_state };
  }

  onLinkBack = (suburb, suburb_state) => {
    const route = "/suburb/" + this.state.suburbs[0].suburb + "/" + this.state.suburbs[0].suburb_state;
    this.setState(() => ({ suburbs: [{ suburb: suburb, suburb_state: suburb_state }], route: route}));
  };

  render() {
    const redirect = this.state.route;
    console.log("app state", this.state);

    return (
     <div>
      <Framework onSuburbSelect={this.onSuburbSelect} onStartOver={this.onStartOver}/>
      <Grid container className="ContentHolderMain" direction="column" justify="center" alignItems="center">
        <Grid item>
          <BrowserRouter>
            <Switch>
            <Route exact path="/" render={() => (redirect && redirect !== "/" ? <Redirect to={redirect} /> :
              <HomePage onSelect={this.onSuburbSelect}/>)} />
            <Route matches path="/suburb" render={() => (redirect && redirect !== "/suburb/" + this.state.suburbs[0].suburb + "/" + this.state.suburbs[0].suburb_state ? <Redirect to={redirect} /> :
              <CompareController suburbs={this.state.suburbs} onStartOver={this.onStartOver} onSuburbCompare={this.onSuburbCompare} onSuburbSelect={this.onSuburbSelect}/>)} />
            </Switch>
          </BrowserRouter>
        </Grid>
      </Grid>
    </div>
    );
  }
}

export default App;
