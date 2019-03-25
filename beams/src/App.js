import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import HomePage from "./pages/HomePage"
import SuburbPage from "./pages/SuburbPage";
import './App.css';

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
    var suburb = city.split(" ")[0];
    var suburb_state = city.split(" ")[1];
    suburb_state = suburb_state.slice(0, -1);
    console.log("suburb", suburb);
    console.log("State", suburb_state);
    this.setState(() => ({ suburb: suburb, suburb_state: suburb_state, route: '/suburb' }));
  };

  onStartOver = () => {
    this.setState(() => ({ suburb: null, route: '/' }));
  };

  render() {
    const redirect = this.state.route;
    return (
      <div className="App">
        <h1>BEAMS</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (redirect && redirect !== "/" ? <Redirect to={redirect} /> : <HomePage onSelect={this.onSuburbSelect} />)} />
            <Route exact path="/suburb" render={() => (redirect && redirect !== "/suburb" ? <Redirect to={redirect} /> : <SuburbPage suburb={this.state.suburb} suburb_state={this.state.suburb_state} onStartOver={this.onStartOver} />)} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
