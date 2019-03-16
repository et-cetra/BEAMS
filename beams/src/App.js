import React, { Component } from 'react';
import {BrowserRouter, Route, Switch, Redirect} from "react-router-dom";
import HomePage from "./pages/HomePage"
import SuburbPage from "./pages/SuburbPage";
import './App.css';

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

  render() {
    const redirect = this.state.route;
    return (
      <div className="App">
        <h1>BEAMS</h1>
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (redirect ? <Redirect to="/suburb" /> : <HomePage onSelect={this.onSuburbSelect} />)} />
            <Route exact path="/suburb" component={() => <SuburbPage suburb={this.state.suburb} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
